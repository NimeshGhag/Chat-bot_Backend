require("dotenv").config();

const app = require("./src/app");
const port = process.env.PORT;

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");
const { text } = require("stream/consumers");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const chatHistory =[]

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("disconnect", () => {
    console.log("A user Disconnected");
  });

  socket.on("ai-message", async (data) => {
    chatHistory.push({
        role:"user",
        parts:[{text:data.prompt}]
    })
    const responce = await generateResponse(chatHistory);
    chatHistory.push({
        role:"model",
        parts:[{text:responce}]
    })
    socket.emit("ai-message-responce", { responce });
  });
});

httpServer.listen(port, () => {
  console.log("Server is running on port");
});
