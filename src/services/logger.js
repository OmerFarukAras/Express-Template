import chalk from "chalk";

export default class Logger {
  log(message, ...args) {
    console.log(chalk.blueBright(message), ...args);
  }
  error(message, ...args) {
    console.log(chalk.redBright(message), ...args);
  }
  warn(message, ...args) {
    console.log(chalk.yellowBright(message), ...args);
  }
  info(message, ...args) {
    console.log(chalk.greenBright(message), ...args);
  }
  debug(message, ...args) {
    console.log(chalk.magentaBright(message), ...args);
  }

}


/**
 * 
 * TEST VERSION
 * 
import chalk from "chalk";

export default class Logger {
  log(message, args) {
    console.log(chalk.blueBright(message));
    if (args) this.data(args);
  }
  error(message, args) {
    console.log(chalk.redBright(message));
    if (args) this.data(args);

  }
  warn(message, args) {
    console.log(chalk.yellowBright(message));
    if (args) this.data(args);

  }
  info(message, args) {
    console.log(chalk.greenBright(message));
    if (args) this.data(args);

  }
  debug(message, args) {
    console.log(chalk.magentaBright(message));
    if (args) this.data(args);

  }

  data(data) {
    console.log(data);
  }
}

 */