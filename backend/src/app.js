import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("port", process.env.PORT || 8000);
app.get("/home", (req, res) => {
  return res.json({ Hello: "World" });
});

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://shanedrasingh89:TeteGdEqjqmdzm3A@cluster0.eh8vg.mongodb.net/"
  );

  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

// const start = async () => {
//   app.listen(8000, () => {
//     console.log("LISTENIN ON PORT 8000");
//   });
// };

start();
