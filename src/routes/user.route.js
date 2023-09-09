import express from "express";
const router = express.Router();

import { RegisterController } from "../controllers/userRegister.controller.js";
import { LoginController } from "../controllers/userLogin.controller.js";

import {
  CreateUser,
  GetUserWithEmail,
  GetUserWithID,
  GetUserWithUsername,
  ValidateToken,
  CreateToken,
  getUserWithoutCreditentials,
  GetUserWithToken,
} from "../middlewares/user.middleware.js";
import { UserMiddleware } from "../middlewares/express.middleware.js";

export class UserRouter {
  path = "/api/user";

  run() {
    router.post("/",  async (req, res) => {
      let user = await GetUserWithToken(req.headers["x-access-token"]);
      if (!user) res.status(401).send("Unauthorized in auth");
      else res.send(user);
    });

    router.post("/register", async (req, res) => {
      const { error, value } = RegisterController.validate(req.body);
      if (error) return res.status(400).send(error.details);

      let user = await CreateUser(value.username, value.password, value.email);
      console.log(user);
      res.send(user);
    });

    router.post("/login", async (req, res) => {
      const { error, value } = LoginController.validate(req.body);
      if (error) return res.status(400).send(error.details);

      let user =
        (await GetUserWithUsername(value.username)) ||
        (await GetUserWithEmail(value.username));
      if (!user) return res.status(400).send("User not found");

      let validPassword = user.comparePassword(value.password);
      if (!validPassword) return res.status(400).send("Invalid password");

      var token = await CreateToken(user._id);

      res.status(200).send({ token });
    });
    return router;
  }
}
