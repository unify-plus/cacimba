import express from "express";
import bodyParser from "body-parser";
import telemetriarouter from "./routes/telemetria";
import connectToDatabase from "./db/conn";

const app = express();
app.use(bodyParser.json());
connectToDatabase();
app.use("/", telemetriarouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});