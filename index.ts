import express, { Express, Request, Response } from "express";
import { connectToMongo } from "./db";
import dotenv from "dotenv";
dotenv.config();
import instrRouter from "./routes/instrRouter";
import courseRouter from "./routes/courseRouter";
import lectureRouter from "./routes/lectureRouter";
import cors from "cors";
const app: Express = express();
const port = 8080;

app.use(express.json());


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//user api
app.use("/api", instrRouter);

// //course Api
app.use("/api2", courseRouter);

// //Department Api
app.use("/api3", lectureRouter);

// to run any api
// http://localhost:8080/api/getMcq

async function bootstrap() {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap();