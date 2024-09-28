import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./db/connection.js";

const env = process.env.NODE_ENV || "development";
if (env === "production") {
    dotenv.config({ path: ".env.production" });
} else {
    dotenv.config({ path: ".env.development" });
}

const app = express();
const port = process.env.API_PORT || 3000;

// call db connection
dbConnection();

// #region middleware

app.use(cors());
app.use(express.json());

// app.use("/", someRouter);

// #endregion middleware

// test: curl http://localhost:3000/
app.use("/", (req, res) => {
    console.log("HEALTHY");
    res.status(200).send("HEALTHY");
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
