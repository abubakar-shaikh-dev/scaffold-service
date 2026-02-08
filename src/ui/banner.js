import chalk from "chalk";
import { c } from "../utils/colors.js";

const BANNER = `
███████╗██╗  ██╗███████╗██╗     ██████╗ 
██╔════╝██║ ██╔╝██╔════╝██║     ██╔══██╗
███████╗█████╔╝ █████╗  ██║     ██████╔╝
╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══██╗
███████║██║  ██╗███████╗███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`;

export function printBanner() {
  console.log(chalk.green(BANNER));
  console.log();
  console.log(
    c.dim("  Service scaffolding CLI") +
      c.dim(" • ") +
      c.dim("v2.1.0")
  );
  console.log();
}
