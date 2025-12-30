require("dotenv").config();

const app = require("./src/app");
const port = process.env.PORT;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("disconnect", () => {
    console.log("A user Disconnected");
  });
});

httpServer.listen(port, () => {
  console.log("Server is running on port");
});
