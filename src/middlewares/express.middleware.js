import { GetUserWithToken } from "./user.middleware.js";

export function UserMiddleware(req, res, next) {
  if (req.headers["x-access-token"] == undefined)
    res.status(401).send("Unauthorized");
  else
    GetUserWithToken(req.headers["x-access-token"]).then((user) => {
      if (!user) return res.status(401).send("Unauthorized");
      req.user = user;
      next();
    });
}
