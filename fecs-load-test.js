//  .\k6-kafka.exe run --vus 2 --duration 20s --env STAGE=local .\fecs-load-test.js
import { Writer, SchemaRegistry, SCHEMA_TYPE_STRING } from "k6/x/kafka";
import { check, sleep } from "k6";
import ENV_CONFIG from "./evn-config.js";
import MESSAGE_MODEL from "./message-model.js";
import { Counter } from "k6/metrics";
const schemaRegistry = new SchemaRegistry();
const successCounter = new Counter("success_count");
const errorCounter = new Counter("error_count");
const stage = __ENV.STAGE;
let cfg;
if (!stage) {
  throw new Error(`Missing STAGE. Use --env STAGE=local`);
} else {
  cfg = ENV_CONFIG[stage];
  if (!cfg) {
    throw new Error(
      `Invalid STAGE value: ${stage}. Must be one of ${Object.keys(ENV_CONFIG).join(", ")}`,
    );
  }
}

const writer = new Writer({
  brokers: cfg.brokers,
  topic: cfg.topic,
  autoCreateTopic: true,
  acks: 1,
  async: false,
});

export default function () {
  const id = __ITER % MESSAGE_MODEL.length;
  // สร้าง Payload เป็น Object ธรรมดา
  const payload = MESSAGE_MODEL[id];
  payload.header.timestamp = new Date().toISOString();
  payload.header.transaction = `txn-${__ITER}`;
  try {
    writer.produce({
      messages: [payload].map((msg, index) => ({
        key: schemaRegistry.serialize({
          data: `fecs-key-${__VU}-${__ITER}-${index}`,
          schemaType: SCHEMA_TYPE_STRING,
        }),
        value: schemaRegistry.serialize({
          data: JSON.stringify(msg),
          schemaType: SCHEMA_TYPE_STRING,
        }),
      })),
    });

    successCounter.add(1);
  } catch (e) {
    errorCounter.add(1);
    console.error(`Kafka Produce Error: ${e.message}`);
  }

  sleep(0.1);
}

export function teardown() {
  writer.close();
}

export function handleSummary(data) {
  const metrics = data.metrics;
  const iterations = metrics["iterations"];

  const successCount = metrics["success_count"]?.values.count || 0;
  const errorCount = metrics["error_count"]?.values.count || 0;
  const totalRequests = iterations ? iterations.values.count : 0;

  const testDurationMs = data.state.testRunDurationMs;
  const endMs = Date.now();
  const startMs = endMs - testDurationMs;
  const fmt = (ms) =>
    new Date(ms).toISOString().replace("T", " ").substring(0, 19);

  return {
    stdout: `
===== 📊 KAFKA TEST SUMMARY =====
Start Time           : ${fmt(startMs)}
End Time             : ${fmt(endMs)}
Total Messages       : ${totalRequests}
Successful           : ${successCount}
Failed               : ${errorCount}
Duration             : ${(metrics["iteration_duration"].values.avg / 1000).toFixed(2)} sec avg
Messages Per Second  : ${iterations ? iterations.values.rate.toFixed(2) : 0} RPS

-- Iteration Duration --
Min                  : ${metrics["iteration_duration"].values.min.toFixed(2)} ms
Max                  : ${metrics["iteration_duration"].values.max.toFixed(2)} ms
Avg                  : ${metrics["iteration_duration"].values.avg.toFixed(2)} ms
Median               : ${metrics["iteration_duration"].values.med.toFixed(2)} ms
p(90)                : ${metrics["iteration_duration"].values["p(90)"].toFixed(2)} ms
p(95)                : ${metrics["iteration_duration"].values["p(95)"].toFixed(2)} ms

===== ❌ Error Summary =====
Total Errors         : ${errorCount}
Error Rate           : ${totalRequests ? ((errorCount / totalRequests) * 100).toFixed(2) : 0}%
Check Failures       : ${metrics["checks"]?.values.fails || 0}

==============================
`,
  };
}
