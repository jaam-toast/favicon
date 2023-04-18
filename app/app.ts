import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { getFavicon } from "./getFavicon";

const app: express.Application = express();

console.log(process.env.NODE_ENV);

app.use(morgan("dev"));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_ORIGIN
        : process.env.CLIENT_ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.get("/favicon", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(401).json({
      result: "error",
      message: "Please enter it in the form -> /favicon?url=https://url",
    });

    return;
  }

  try {
    const faviconPath = await getFavicon({ url });

    res.json({ result: "ok", faviconPath });
  } catch (error) {
    res.json({ result: "error", message: "Unknown error occurred" });
  }
});

app.listen(process.env.PORT, function () {
  console.log(`favicon app listening on port ${process.env.PORT}!`);
});
