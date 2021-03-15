import express, { Request, Response, Express } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";

export function newApp(): Express {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (_, res: Response) => {
    res.send("Hello from the backend!");
  });

  return app;
}
