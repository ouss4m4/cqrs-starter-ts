import express, { json } from "express";
import { apiV1Router } from "./api.v1";

const app = express();
app.use(json());

const port = process.env.PORT || 3001;

app.use("/api/v1", apiV1Router);

export const startExpressServer = async () => {
  app.listen(port, async () => {
    console.log(`Up and running on port ${port}`);
  });
};
