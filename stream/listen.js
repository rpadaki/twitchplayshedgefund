var udp = require("dgram");
var server = udp.createSocket("udp4");

server.on("message", (msg, info) => {
    process.stdout.write(msg);
    server.send(msg, 5000, "0.0.0.0");
});

server.bind(8090);
