const tmi = require("tmi.js");
const config = require("./config");

const client = new tmi.client(config.tmi);

function onMessageHandler(target, context, msg, self) {
    if (self) return;
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();
