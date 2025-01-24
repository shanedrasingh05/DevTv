import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import { connect } from "node:http2";

import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(express.json());

app.set("port", process.env.PORT || 8000);
app.use(cors());

app.use(express.urlencoded({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// app.get("/home", (req, res) => {
//   return res.json({ Hello: "World" });
// });

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

// console.log("hello")
start();
