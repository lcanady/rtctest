const app = require("express")();
const cors = require('cors')
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
app.use(cors());
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
let port = process.env.PORT ||3000;

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

nextApp.prepare().then(() => app.get("*", (req, res) => nextHandler(req, res)));

server.listen(port, (err) => {
  if (err) throw err;
  console.log("> Ready on Port 3000");
});
