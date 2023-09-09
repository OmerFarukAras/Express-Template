import { MainRouter } from "../routes/main.route.js";
import { UserRouter } from "../routes/user.route.js";
export function loadRoutes(app, logger) {
  let routes = [new MainRouter(), new UserRouter()];

  logger.log("Loading routes");

  routes.forEach((route) => {
    logger.debug(`Loading route ${route.path}`);
    app.use(route.path, route.run());
  });
  logger.info("Loaded " + routes.length + " routes!");
  return routes;
}
