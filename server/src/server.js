import express from "express";
import connectMongoDB from "./config/dbconfig";
import router from "./routes";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1:27017/db_xbid";

connectMongoDB(dbUrl);

app.use("/", router);

export const viteNodeApp = app;
