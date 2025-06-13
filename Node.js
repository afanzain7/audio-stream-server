const net = require("net");
const server = net.createServer(socket => {
  console.log("Client connected");
  socket.on("data", data => {
    console.log("Data:", data.length);
  });
});
server.listen(9000, () => {
  console.log("TCP server running on port 9000");
});
