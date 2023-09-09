import express from "express";
import { UserMiddleware } from "../middlewares/express.middleware.js";
const router = express.Router();

export class MainRouter {
  path = "/api";

  run() {
    router.get("/", (req, res) => {
      res.send("!");
    });

    router.get("/test", UserMiddleware, (req, res) => {
      console.log(req.user);
      res.send("SECURED ROUTE. LOGGED IN AS : " + req.user.username);
    });
    return router;
  }
}
