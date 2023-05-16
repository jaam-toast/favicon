import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { getFavicon } from "./getFavicon";

const app: express.Application = express();

app.use(morgan("dev"));
app.use(
  "/api",
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            process.env.CLIENT_URL,
            process.env.PRODUCTION_CLIENT_URL,
            process.env.ORIGIN_SERVER_URL,
          ]
        : process.env.CLIENT_LOCAL_URL,
  })
);

app.use(cors());

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

    res.json({ result: faviconPath, message: "ok" });
  } catch (error) {
    res.json({ result: "error", message: "Unknown error occurred" });
  }
});

app.listen(process.env.PORT, function () {
  console.log(`favicon app listening on port ${process.env.PORT}!`);
});
