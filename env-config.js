// evn-config.js
const ENV_CONFIG = {
  local: {
    brokers: ["localhost:9092"],
    topic: "fecs-topic",
  },
  dev: {
    brokers: ["10.84.77.244:9092"],
    topic: "fecs-topic",
  },
  sit: {
    brokers: ["10.84.77.244:9092"],
    topic: "fecs-topic",
  },
  uat: {
    brokers: ["10.84.77.244:9092"],
    topic: "fecs-topic",
  },
};

export default ENV_CONFIG; //
