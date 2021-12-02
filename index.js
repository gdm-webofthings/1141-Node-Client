var osc = require("osc");
require("dotenv").config();

var udpPort = new osc.UDPPort({
  localAddress: process.env.LOCAL_ADDRESS,
  localPort: process.env.LOCAL_PORT,
  metadata: true,
});

// Send message to server function
const sendMessage = (state = 0) => {
  udpPort.send(
    {
      address: `/Client-${process.env.CLIENT_ID}`,
      args: {
        type: "i",
        value: state,
      },
    },
    process.env.SERVER_ADDRESS,
    process.env.SERVER_PORT
  );
};

// Calculate response
const calculateResponse = ({ value }) => {
  switch (value) {
    case 0:
      console.log("Going into inactive state");
      // inactive state function
      break;

    case 1:
      console.log("Going into active state");
      // active state function
      break;

    case 100:
      console.log("Puzzle force solved by server");
      // solved state function
      break;

    default:
      console.log("Got wrong state");
      break;
  }
};

// Listen for incoming messages from server.
udpPort.on("message", function ({ args } = oscMsg, info) {
  // console.log("An OSC message just arrived!", oscMsg);
  // console.log("Remote info is: ", info);
  calculateResponse(args[0]);
});

// after startup send ready
udpPort.on("ready", function () {
  sendMessage(0);
});

// Open the socket.
udpPort.open();
console.log("running");
