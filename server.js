import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

const startServer = async () => {
  try {
    await app.prepare();
    const httpServer = createServer(handler);

    httpServer.listen(3000, (err) => {
      if (err) throw err;
      console.log("Server Ready on http://localhost:3000");
    });

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("addPost", (post) => {
        socket.emit("newPostAdded", post);
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();