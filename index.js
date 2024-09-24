import express from "express";
import { config } from "dotenv";
import cors from "cors"

config();

const app = express();
const port = 3000; // const port = process.env.API_PORT || 3000;

// #region middleware

app.use(cors());
app.use(express.json());

// app.use("/", someRouter);

// #endregion middleware

// test: curl http://localhost:3000/
app.use('/', (req, res) => {
    console.log("HEALTHY")
    res.status(200).send('HEALTHY')
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

