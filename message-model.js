export const messageModel = [
  {
    header: {
      version: "5.0",
      timestamp: new Date().toISOString(), // อัปเดตเวลาแบบเรียลไทม์
      orgService: "",
      scope: "global",
      from: "",
      channel: "",
      broker: "",
      agent: "",
      useCase: "USECASE_Blob",
      useCaseStep: "",
      useCaseAge: 0,
      useCaseStartTime: "2026-09-04T03:20:00.000Z",
      useCaseExpiryTime: "2026-09-04T03:20:10.000Z",
      functionName: "",
      messageType: "event",
      session: "234709834750982345",
      transaction: `txn`,
      communication: "unicast",
      groupTags: [],
      identity: {
        device: [`dev_${Math.random().toString(36).substring(2, 12)}`],
      },
      statusCode: "",
      initUri: "",
      initMethod: "",
      queryParam: "",
      tmfSpec: "none",
      baseApiVersion: "none",
      schemaVersion: "none",
      instanceData: "",
    },
    body: {
      listOf: [
        {
          message: ``,
        },
        {
          message: "lorem ipsum dolor sit amet",
        },
      ],
    },
  },
  {
    header: {
      version: "5.0",
      timestamp: new Date().toISOString(), // อัปเดตเวลาแบบเรียลไทม์
      orgService: "",
      scope: "global",
      from: "",
      channel: "",
      broker: "",
      agent: "",
      useCase: "USECASE_Blob",
      useCaseStep: "",
      useCaseAge: 0,
      useCaseStartTime: "2026-09-04T03:20:00.000Z",
      useCaseExpiryTime: "2026-09-04T03:20:10.000Z",
      functionName: "",
      messageType: "event",
      session: "234709834750982345",
      transaction: `txn`,
      communication: "unicast",
      groupTags: [],
      identity: {
        device: [`dev_${Math.random().toString(36).substring(2, 12)}`],
      },
      statusCode: "",
      initUri: "",
      initMethod: "",
      queryParam: "",
      tmfSpec: "none",
      baseApiVersion: "none",
      schemaVersion: "none",
      instanceData: "",
    },
    body: {
      listOf: [
        {
          message: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..`,
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id nibh eleifend, ultrices nunc ut, suscipit nibh. Praesent rutrum sapien",
        },
      ],
    },
  },
  {
    header: {
      version: "5.0",
      timestamp: new Date().toISOString(), // อัปเดตเวลาแบบเรียลไทม์
      orgService: "",
      scope: "global",
      from: "",
      channel: "",
      broker: "",
      agent: "",
      useCase: "USECASE_Blob",
      useCaseStep: "",
      useCaseAge: 0,
      useCaseStartTime: "2026-09-04T03:20:00.000Z",
      useCaseExpiryTime: "2026-09-04T03:20:10.000Z",
      functionName: "",
      messageType: "event",
      session: "234709834750982345",
      transaction: `txn-`,
      communication: "unicast",
      groupTags: [],
      identity: {
        device: [`dev_${Math.random().toString(36).substring(2, 12)}`],
      },
      statusCode: "",
      initUri: "",
      initMethod: "",
      queryParam: "",
      tmfSpec: "none",
      baseApiVersion: "none",
      schemaVersion: "none",
      instanceData: "",
    },
    body: {
      listOf: [
        {
          message: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id nibh eleifend, ultrices nunc ut, suscipit nibh. Praesent rutrum sapien",
        },
      ],
    },
  },
];

const MESSAGE_MODEL = messageModel;

export default MESSAGE_MODEL;
