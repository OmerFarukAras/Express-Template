import requestIP from "request-ip";
import chalk from "chalk";

export function expressLogger(req, res, next) {
  let ip = requestIP.getClientIp(req);
  
  console.log(chalk.blueBright(req.method) + " " + chalk.greenBright(ip) + " " + req.url);
  next();
}
