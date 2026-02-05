#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// Service Scaffolder Tool v2.0.0
// ═══════════════════════════════════════════════════════════════════════════
// Author    : ABUBAKAR SHAIKH
// Github    : https://github.com/abubakar-shaikh-dev
// Repo      : github.com/abubakar-shaikh-dev/scaffold-service.git
// Tool      : scaffold-service
// Purpose   : Quickly scaffold new service boilerplate code
// Year      : 2025-2026
// Note      : Tampering with the author information does not break the script, but it does summon a mild sense of professional shame
// ═══════════════════════════════════════════════════════════════════════════

import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";

// Note: This tool runs from the current working directory (where user executes the command)
// When installed via npm/npx, files will be created in the user's project root

// ═══════════════════════════════════════════════════════════════════════════
// CLI ARGUMENT PARSING
// ═══════════════════════════════════════════════════════════════════════════
function parseCliArgs(argv) {
  const args = {
    name: null,
    structure: null,
    typescript: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    // Help flag
    if (arg === "-h" || arg === "--help") {
      args.help = true;
    }
    // TypeScript flag
    else if (arg === "-ts" || arg === "--typescript") {
      args.typescript = true;
    }
    // Name argument
    else if (arg === "-n" || arg === "--name") {
      args.name = argv[++i];
    } else if (arg.startsWith("--name=")) {
      args.name = arg.split("=")[1];
    }
    // Structure argument
    else if (arg === "-s" || arg === "--structure") {
      args.structure = argv[++i];
    } else if (arg.startsWith("--structure=")) {
      args.structure = arg.split("=")[1];
    }
  }

  return args;
}

function printHelp() {
  console.log("");
  console.log(chalk.bold.white("  scaffold-service") + chalk.dim(" - Service scaffolding CLI"));
  console.log("");
  console.log(chalk.bold.white("  USAGE"));
  console.log(chalk.dim("  ─────────────────────────────────────────────────────────"));
  console.log("    $ scaffold-service [options]");
  console.log("");
  console.log(chalk.bold.white("  OPTIONS"));
  console.log(chalk.dim("  ─────────────────────────────────────────────────────────"));
  console.log(
    "    " +
      chalk.cyan("-n, --name <name>") +
      "        " +
      chalk.dim("Service name (snake_case)")
  );
  console.log(
    "    " +
      chalk.cyan("-s, --structure <type>") +
      "   " +
      chalk.dim("Folder structure: separate | modular")
  );
  console.log(
    "    " +
      chalk.cyan("-ts, --typescript") +
      "        " +
      chalk.dim("Generate TypeScript files (.ts)")
  );
  console.log(
    "    " +
      chalk.cyan("-h, --help") +
      "               " +
      chalk.dim("Show this help message")
  );
  console.log("");
  console.log(chalk.bold.white("  EXAMPLES"));
  console.log(chalk.dim("  ─────────────────────────────────────────────────────────"));
  console.log(
    "    " +
      chalk.dim("$") +
      " scaffold-service " +
      chalk.cyan("--name=payment --structure=modular")
  );
  console.log(
    "    " +
      chalk.dim("$") +
      " scaffold-service " +
      chalk.cyan("-n user_profile -s separate -ts")
  );
  console.log("");
}

function validateCliArgs(args) {
  const errors = [];

  if (args.name) {
    const snakeCaseRegex = /^[a-z]+(_[a-z]+)*$/;
    if (!snakeCaseRegex.test(args.name)) {
      errors.push("Service name must be in snake_case or a single lowercase word");
    }
  }

  if (args.structure) {
    const validStructures = ["separate", "modular", "current"];
    if (!validStructures.includes(args.structure.toLowerCase())) {
      errors.push("Structure must be 'separate' or 'modular'");
    }
  }

  return errors;
}

// Parse CLI arguments
const cliArgs = parseCliArgs(process.argv.slice(2));

// ═══════════════════════════════════════════════════════════════════════════
// COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════
const colors = {
  red: chalk.red,
  green: chalk.green,
  yellow: chalk.yellow.bold,
  blue: chalk.blue,
  purple: chalk.magenta,
  cyan: chalk.cyan,
  white: chalk.white.bold,
  gray: chalk.gray,
  bold: chalk.bold,
  dim: chalk.dim,

  // Modern gradient colors
  gradient1: chalk.hex("#00afff"), // Electric Blue
  gradient2: chalk.hex("#00d7ff"), // Cyan Blue
  gradient3: chalk.hex("#5fffff"), // Sky Blue
  accent: chalk.hex("#ff87d7"), // Pink Accent
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Error handler with modern styling
function errorExit(message) {
  console.log("");
  console.log(
    colors.red.bold(
      "╭─────────────────────────────────────────────────────────╮",
    ),
  );
  console.log(
    colors.red.bold(
      "│  ⚠️  ERROR                                              │",
    ),
  );
  console.log(
    colors.red.bold(
      "╰─────────────────────────────────────────────────────────╯",
    ),
  );
  console.log(colors.red(`  ${message}`));
  console.log("");
  process.exit(1);
}

// Success message helper
function printSuccess(message) {
  console.log(`${colors.green("  ✓ ")}${colors.white(message)}`);
}

// Info message helper
function printInfo(message) {
  console.log(`${colors.cyan("  ▸ ")}${colors.dim(message)}`);
}

// Warning message helper
function printWarning(message) {
  console.log(`${colors.yellow("  ⚠ ")}${message}`);
}

// Clear console
console.clear();

// ═══════════════════════════════════════════════════════════════════════════
// MODERN BANNER - 2025 Design
// ═══════════════════════════════════════════════════════════════════════════
function printBanner() {
  console.log("");
  console.log(
    colors.gradient1(
      "╔═══════════════════════════════════════════════════════════════╗",
    ),
  );
  console.log(
    colors.gradient2(
      "║                                                               ║",
    ),
  );
  console.log(
    colors.gradient2("║         ") +
      colors.white.bold("🏗️   S E R V I C E   S C A F F O L D E R") +
      "   " +
      colors.gradient2("🏗️") +
      "           " +
      colors.gradient2("║"),
  );
  console.log(
    colors.gradient2(
      "║                                                               ║",
    ),
  );
  console.log(
    colors.gradient3(
      "╠═══════════════════════════════════════════════════════════════╣",
    ),
  );
  console.log(
    colors.gradient3("║      ") +
      colors.dim("Quickly scaffold new service boilerplate code") +
      "            " +
      colors.gradient3("║"),
  );
  console.log(
    colors.gradient3(
      "╠═══════════════════════════════════════════════════════════════╣",
    ),
  );
  console.log(
    colors.gradient3("║  ") +
      colors.gray("Author") +
      "  " +
      colors.white("ABUBAKAR SHAIKH") +
      "                                      " +
      colors.gradient3("║"),
  );
  console.log(
    colors.gradient3("║  ") +
      colors.gray("Github") +
      "  " +
      colors.cyan("github.com/abubakar-shaikh-dev") +
      "                       " +
      colors.gradient3("║"),
  );
  console.log(
    colors.gradient3("║  ") +
      colors.gray("Tool") +
      "    " +
      colors.accent("scaffold-service") +
      "                                     " +
      colors.gradient3("║"),
  );
  console.log(
    colors.gradient3("║  ") +
      colors.gray("Version") +
      " " +
      colors.white("2.0.0") +
      " " +
      colors.dim("") +
      "                                               " +
      colors.gradient3("║"),
  );
  console.log(
    colors.gradient1(
      "╚═══════════════════════════════════════════════════════════════╝",
    ),
  );
  console.log("");
  console.log("");
}

// ═══════════════════════════════════════════════════════════════════════════
// FOLDER STRUCTURE SELECTION
// ═══════════════════════════════════════════════════════════════════════════
async function selectFolderStructure() {
  console.log(
    colors.bold.white("Step 1") +
      " " +
      colors.gray("→") +
      " " +
      colors.white("Folder Structure"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  console.log(
    colors.cyan("  ▸ ") + colors.white("Select folder structure type"),
  );
  console.log("");
  console.log(
    "    " +
      colors.bold.white("[1]") +
      " " +
      colors.accent("Separate Folder Structure") +
      " " +
      colors.dim("(Distributed across folders)"),
  );
  console.log(
    "        " +
      colors.dim("├─ src/services/") +
      colors.gray("name") +
      colors.dim(".service.js"),
  );
  console.log(
    "        " +
      colors.dim("├─ src/validations/") +
      colors.gray("name") +
      colors.dim(".validation.js"),
  );
  console.log(
    "        " +
      colors.dim("├─ src/controllers/") +
      colors.gray("name") +
      colors.dim(".controller.js"),
  );
  console.log(
    "        " +
      colors.dim("└─ src/routes/v1/") +
      colors.gray("name") +
      colors.dim(".routes.js"),
  );
  console.log("");
  console.log(
    "    " +
      colors.bold.white("[2]") +
      " " +
      colors.accent("Modular Folder Structure") +
      " " +
      colors.dim("(All-in-one folder)"),
  );
  console.log(
    "        " +
      colors.dim("└─ src/modules/") +
      colors.gray("name") +
      colors.dim("/"),
  );
  console.log(
    "            " +
      colors.dim("├─ ") +
      colors.gray("name") +
      colors.dim(".service.js"),
  );
  console.log(
    "            " +
      colors.dim("├─ ") +
      colors.gray("name") +
      colors.dim(".validation.js"),
  );
  console.log(
    "            " +
      colors.dim("├─ ") +
      colors.gray("name") +
      colors.dim(".controller.js"),
  );
  console.log(
    "            " +
      colors.dim("└─ ") +
      colors.gray("name") +
      colors.dim(".routes.js"),
  );
  console.log("");

  const { choice } = await inquirer.prompt([
    {
      type: "input",
      name: "choice",
      message: colors.bold.white("→ Enter choice [1/2]:"),
      prefix: " ",
      validate: (input) => {
        if (input === "1" || input === "2") {
          return true;
        }
        return colors.red("✗ Invalid choice. Please enter 1 or 2");
      },
    },
  ]);

  const folderStructure = choice === "1" ? "current" : "modular";
  const structureName =
    choice === "1" ? "Separate Folder Structure" : "Modular Folder Structure";

  console.log(
    colors.green("    ✓ Selected: ") + colors.bold.white(structureName),
  );
  console.log("");

  return folderStructure;
}

// ═══════════════════════════════════════════════════════════════════════════
// LANGUAGE SELECTION
// ═══════════════════════════════════════════════════════════════════════════
async function selectLanguage() {
  console.log(
    colors.bold.white("Step 2") +
      " " +
      colors.gray("→") +
      " " +
      colors.white("Language"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  console.log(
    colors.cyan("  ▸ ") + colors.white("Select programming language"),
  );
  console.log("");
  console.log(
    "    " +
      colors.bold.white("[1]") +
      " " +
      colors.accent("JavaScript") +
      " " +
      colors.dim("(.js files)"),
  );
  console.log(
    "    " +
      colors.bold.white("[2]") +
      " " +
      colors.accent("TypeScript") +
      " " +
      colors.dim("(.ts files with type annotations)"),
  );
  console.log("");

  const { choice } = await inquirer.prompt([
    {
      type: "input",
      name: "choice",
      message: colors.bold.white("→ Enter choice [1/2]:"),
      prefix: " ",
      validate: (input) => {
        if (input === "1" || input === "2") {
          return true;
        }
        return colors.red("✗ Invalid choice. Please enter 1 or 2");
      },
    },
  ]);

  const language = choice === "1" ? "js" : "ts";
  const languageName = choice === "1" ? "JavaScript" : "TypeScript";

  console.log(
    colors.green("    ✓ Selected: ") + colors.bold.white(languageName),
  );
  console.log("");

  return language;
}

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE NAME INPUT
// ═══════════════════════════════════════════════════════════════════════════
async function getServiceName() {
  console.log(
    colors.bold.white("Step 3") +
      " " +
      colors.gray("→") +
      " " +
      colors.white("Service Name"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  console.log(
    colors.cyan("  ▸ ") +
      colors.white("Enter service name ") +
      colors.dim("(snake_case or single lowercase word)"),
  );
  console.log(
    colors.dim("    Examples: ") +
      colors.accent("payment") +
      colors.dim(", ") +
      colors.accent("user_profile") +
      colors.dim(", ") +
      colors.accent("order_item"),
  );
  console.log("");

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: colors.bold.white("→"),
      prefix: " ",
      validate: (input) => {
        if (!input || input.trim() === "") {
          return colors.red("✗ Service name cannot be empty");
        }

        // Validate the input name (snake_case or single lowercase word)
        const snakeCaseRegex = /^[a-z]+(_[a-z]+)*$/;
        if (!snakeCaseRegex.test(input)) {
          return colors.red(
            "✗ Service name must be in snake_case or a single lowercase word",
          );
        }

        return true;
      },
    },
  ]);

  console.log(colors.green("    ✓ Service name: ") + colors.bold.white(name));
  console.log("");

  return name;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONVERT SNAKE_CASE TO CAMELCASE
// ═══════════════════════════════════════════════════════════════════════════
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION PREVIEW
// ═══════════════════════════════════════════════════════════════════════════
async function showConfigurationPreview(name, camelName, folderStructure, language) {
  console.log(
    colors.bold.white("Step 4") +
      " " +
      colors.gray("→") +
      " " +
      colors.white("Configuration Preview"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");
  console.log(
    colors.gradient1(
      "  ╭───────────────────────────────────────────────────────────╮",
    ),
  );
  console.log(
    colors.gradient2("  │  ") +
      colors.bold.white("📊  Service Configuration") +
      "                                " +
      colors.gradient2("│"),
  );
  console.log(
    colors.gradient3(
      "  ╰───────────────────────────────────────────────────────────╯",
    ),
  );
  console.log("");
  console.log(
    "    " + colors.gray("Service Name") + "       " + colors.cyan(name),
  );
  console.log(
    "    " + colors.gray("Camel Case") + "         " + colors.accent(camelName),
  );
  console.log(
    "    " + colors.gray("Language") + "           " + colors.accent(language === "ts" ? "TypeScript" : "JavaScript"),
  );

  if (folderStructure === "current") {
    console.log(
      "    " +
        colors.gray("Structure") +
        "          " +
        colors.white("Separate (Distributed folders)"),
    );
    console.log("");
    console.log("    " + colors.gray("Files to create:"));
    console.log(
      "      " +
        colors.dim("├─") +
        " " +
        colors.cyan(`src/services/${name}.service.js`),
    );
    console.log(
      "      " +
        colors.dim("├─") +
        " " +
        colors.cyan(`src/validations/${name}.validation.js`),
    );
    console.log(
      "      " +
        colors.dim("├─") +
        " " +
        colors.cyan(`src/controllers/${name}.controller.js`),
    );
    console.log(
      "      " +
        colors.dim("└─") +
        " " +
        colors.cyan(`src/routes/v1/${name}.routes.js`),
    );
  } else {
    console.log(
      "    " +
        colors.gray("Structure") +
        "          " +
        colors.white("Modular (All-in-one folder)"),
    );
    console.log("");
    console.log("    " + colors.gray("Files to create:"));
    console.log(
      "      " + colors.dim("└─") + " " + colors.cyan(`src/modules/${name}/`),
    );
    console.log(
      "          " + colors.dim("├─") + " " + colors.cyan(`${name}.service.js`),
    );
    console.log(
      "          " +
        colors.dim("├─") +
        " " +
        colors.cyan(`${name}.validation.js`),
    );
    console.log(
      "          " +
        colors.dim("├─") +
        " " +
        colors.cyan(`${name}.controller.js`),
    );
    console.log(
      "          " + colors.dim("└─") + " " + colors.cyan(`${name}.routes.js`),
    );
  }

  console.log("");
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  const { proceed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "proceed",
      message: colors.bold.white("Proceed with scaffolding?"),
      prefix: " ",
      default: false,
    },
  ]);

  if (!proceed) {
    console.log(colors.yellow("\n  ⚠ Operation cancelled by user."));
    process.exit(0);
  }

  console.log("");
}

// ═══════════════════════════════════════════════════════════════════════════
// FILE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════
function getServiceTemplate(folderStructure) {
  const dbImportPath =
    folderStructure === "current" ? "../config/db.js" : "../../config/db.js";
  return `import createHttpError from "http-errors";

//Configs
import db from "${dbImportPath}";
`;
}

function getValidationTemplate() {
  return `import { z } from "zod";
`;
}

function getControllerTemplate(name, camelName, folderStructure) {
  const serviceImportPath =
    folderStructure === "current"
      ? `../services/${name}.service.js`
      : `./${name}.service.js`;
  const validationImportPath =
    folderStructure === "current"
      ? `../validations/${name}.validation.js`
      : `./${name}.validation.js`;

  return `//Services
import * as ${camelName}Service from "${serviceImportPath}";

//Validations 
import * as ${camelName}Validation from "${validationImportPath}";
`;
}

function getRouterTemplate(name, camelName, folderStructure) {
  const controllerImportPath =
    folderStructure === "current"
      ? `../../controllers/${name}.controller.js`
      : `./${name}.controller.js`;
  const middlewareImportPath =
    folderStructure === "current"
      ? "../../middlewares/token.middleware.js"
      : "../../middlewares/token.middleware.js";
  const constantsImportPath =
    folderStructure === "current"
      ? "../../constants/user.constant.js"
      : "../../constants/user.constant.js";

  return `import express from "express";

//Controllers
import * as ${camelName}Controller from "${controllerImportPath}";

//Middlewares
import * as tokenMiddleware from "${middlewareImportPath}";

//Constants
import { ROLES } from "${constantsImportPath}";

const router = express.Router();

export default router;
`;
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPESCRIPT FILE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════
function getServiceTemplateTS(folderStructure) {
  const dbImportPath =
    folderStructure === "current" ? "../config/db" : "../../config/db";
  return `import createHttpError from "http-errors";

//Configs
import db from "${dbImportPath}";

// Define your service types here
// export interface ServiceResponse<T> {
//   success: boolean;
//   data?: T;
//   message?: string;
// }
`;
}

function getValidationTemplateTS() {
  return `import { z } from "zod";

// Example validation schema
// export const createSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email format"),
// });

// Infer types from schemas
// export type CreateInput = z.infer<typeof createSchema>;
`;
}

function getControllerTemplateTS(name, camelName, folderStructure) {
  const serviceImportPath =
    folderStructure === "current"
      ? `../services/${name}.service`
      : `./${name}.service`;
  const validationImportPath =
    folderStructure === "current"
      ? `../validations/${name}.validation`
      : `./${name}.validation`;

  return `import { Request, Response } from "express";

//Services
import * as ${camelName}Service from "${serviceImportPath}";

//Validations 
import * as ${camelName}Validation from "${validationImportPath}";

// Example controller method
// export const getAll = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Your logic here
//     res.status(200).json({ success: true, data: [] });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export const getById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     // Your logic here
//     res.status(200).json({ success: true, data: null });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
`;
}

function getRouterTemplateTS(name, camelName, folderStructure) {
  const controllerImportPath =
    folderStructure === "current"
      ? `../../controllers/${name}.controller`
      : `./${name}.controller`;
  const middlewareImportPath =
    folderStructure === "current"
      ? "../../middlewares/token.middleware"
      : "../../middlewares/token.middleware";
  const constantsImportPath =
    folderStructure === "current"
      ? "../../constants/user.constant"
      : "../../constants/user.constant";

  return `import express, { Router } from "express";

//Controllers
import * as ${camelName}Controller from "${controllerImportPath}";

//Middlewares
import * as tokenMiddleware from "${middlewareImportPath}";

//Constants
import { ROLES } from "${constantsImportPath}";

const router: Router = express.Router();

// Define your routes here
// router.get("/", ${camelName}Controller.getAll);
// router.post("/", ${camelName}Controller.create);

export default router;
`;
}

// ═══════════════════════════════════════════════════════════════════════════
// FILE GENERATION
// ═══════════════════════════════════════════════════════════════════════════
async function generateFiles(name, camelName, folderStructure, language = "js") {
  const ext = language === "ts" ? ".ts" : ".js";
  console.log(
    colors.bold.white("Step 5") +
      " " +
      colors.gray("→") +
      " " +
      colors.white("Generating Files"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  const filesCreated = [];

  if (folderStructure === "current") {
    // ═══════════════════════════════════════════════════════════════════════════
    // CURRENT FOLDER STRUCTURE (Separate folders)
    // ═══════════════════════════════════════════════════════════════════════════

    const servicesFolder = "src/services";
    const validationsFolder = "src/validations";
    const controllersFolder = "src/controllers";
    const routesFolder = "src/routes/v1";

    // Create the necessary folders if they don't exist
    await fs.ensureDir(servicesFolder);
    await fs.ensureDir(validationsFolder);
    await fs.ensureDir(controllersFolder);
    await fs.ensureDir(routesFolder);

    // Create the service file
    const serviceFile = path.join(servicesFolder, `${name}.service${ext}`);
    const serviceContent = language === "ts" 
      ? getServiceTemplateTS(folderStructure) 
      : getServiceTemplate(folderStructure);
    await fs.writeFile(serviceFile, serviceContent);
    printSuccess(`Created: ${colors.cyan(serviceFile)}`);
    filesCreated.push(serviceFile);

    // Create the validation file
    const validationFile = path.join(
      validationsFolder,
      `${name}.validation${ext}`,
    );
    const validationContent = language === "ts" 
      ? getValidationTemplateTS() 
      : getValidationTemplate();
    await fs.writeFile(validationFile, validationContent);
    printSuccess(`Created: ${colors.cyan(validationFile)}`);
    filesCreated.push(validationFile);

    // Create the controller file
    const controllerFile = path.join(
      controllersFolder,
      `${name}.controller${ext}`,
    );
    const controllerContent = language === "ts" 
      ? getControllerTemplateTS(name, camelName, folderStructure) 
      : getControllerTemplate(name, camelName, folderStructure);
    await fs.writeFile(controllerFile, controllerContent);
    printSuccess(`Created: ${colors.cyan(controllerFile)}`);
    filesCreated.push(controllerFile);

    // Create the router file
    const routerFile = path.join(routesFolder, `${name}.routes${ext}`);
    const routerContent = language === "ts" 
      ? getRouterTemplateTS(name, camelName, folderStructure) 
      : getRouterTemplate(name, camelName, folderStructure);
    await fs.writeFile(routerFile, routerContent);
    printSuccess(`Created: ${colors.cyan(routerFile)}`);
    filesCreated.push(routerFile);
  } else {
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULAR FOLDER STRUCTURE (All-in-one folder)
    // ═══════════════════════════════════════════════════════════════════════════

    const moduleFolder = path.join("src/modules", name);

    // Create the module folder
    await fs.ensureDir(moduleFolder);

    printInfo(`Creating module folder: ${colors.cyan(moduleFolder)}`);
    console.log("");

    // Create the service file
    const serviceFile = path.join(moduleFolder, `${name}.service${ext}`);
    const serviceContent = language === "ts" 
      ? getServiceTemplateTS(folderStructure) 
      : getServiceTemplate(folderStructure);
    await fs.writeFile(serviceFile, serviceContent);
    printSuccess(`Created: ${colors.cyan(serviceFile)}`);
    filesCreated.push(serviceFile);

    // Create the validation file
    const validationFile = path.join(moduleFolder, `${name}.validation${ext}`);
    const validationContent = language === "ts" 
      ? getValidationTemplateTS() 
      : getValidationTemplate();
    await fs.writeFile(validationFile, validationContent);
    printSuccess(`Created: ${colors.cyan(validationFile)}`);
    filesCreated.push(validationFile);

    // Create the controller file
    const controllerFile = path.join(moduleFolder, `${name}.controller${ext}`);
    const controllerContent = language === "ts" 
      ? getControllerTemplateTS(name, camelName, folderStructure) 
      : getControllerTemplate(name, camelName, folderStructure);
    await fs.writeFile(controllerFile, controllerContent);
    printSuccess(`Created: ${colors.cyan(controllerFile)}`);
    filesCreated.push(controllerFile);

    // Create the router file
    const routerFile = path.join(moduleFolder, `${name}.routes${ext}`);
    const routerContent = language === "ts" 
      ? getRouterTemplateTS(name, camelName, folderStructure) 
      : getRouterTemplate(name, camelName, folderStructure);
    await fs.writeFile(routerFile, routerContent);
    printSuccess(`Created: ${colors.cyan(routerFile)}`);
    filesCreated.push(routerFile);
  }

  return filesCreated;
}

// ═══════════════════════════════════════════════════════════════════════════
// SUCCESS SUMMARY
// ═══════════════════════════════════════════════════════════════════════════
function printSuccessSummary(name, folderStructure, filesCreated) {
  const serviceFile = filesCreated[0];
  const validationFile = filesCreated[1];
  const controllerFile = filesCreated[3];

  console.log("");
  console.log("");
  console.log(
    colors.gradient1(
      "╔═══════════════════════════════════════════════════════════════╗",
    ),
  );
  console.log(
    colors.gradient2(
      "║                                                               ║",
    ),
  );
  console.log(
    colors.gradient2("║             ") +
      colors.bold.green("✓  O P E R A T I O N   S U C C E S S") +
      "              " +
      colors.gradient2("║"),
  );
  console.log(
    colors.gradient2(
      "║                                                               ║",
    ),
  );
  console.log(
    colors.gradient1(
      "╚═══════════════════════════════════════════════════════════════╝",
    ),
  );
  console.log("");
  console.log(
    "  " +
      colors.gradient3("▸") +
      " " +
      colors.gray("Service Name") +
      "         " +
      colors.bold(colors.accent(name)),
  );
  console.log(
    "  " +
      colors.gradient3("▸") +
      " " +
      colors.gray("Folder Structure") +
      "     " +
      colors.bold.cyan(
        folderStructure === "current"
          ? "Separate (Distributed)"
          : "Modular (All-in-one)",
      ),
  );
  console.log(
    "  " +
      colors.gradient3("▸") +
      " " +
      colors.gray("Files Created") +
      "        " +
      colors.bold.white(`${filesCreated.length} files`),
  );
  console.log("");
  console.log(
    colors.dim.gray(
    
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log(colors.bold.white("  Files Created"));
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");

  for (const file of filesCreated) {
    console.log("  " + colors.cyan("•") + " " + colors.dim(file));
  }

  console.log("");
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log(colors.bold.white("  Next Steps"));
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");
  console.log(
    "  " +
      colors.bold.white("1.") +
      " " +
      colors.gray("Import and register the route in"),
  );
  console.log("     " + colors.cyan("src/routes/index.js"));
  console.log("");
  console.log(
    "  " +
      colors.bold.white("2.") +
      " " +
      colors.gray("Implement your service logic in"),
  );
  console.log("     " + colors.cyan(serviceFile));
  console.log("");
  console.log(
    "  " +
      colors.bold.white("3.") +
      " " +
      colors.gray("Add validation schemas in"),
  );
  console.log("     " + colors.cyan(validationFile));
  console.log("");
  console.log(
    "  " +
      colors.bold.white("4.") +
      " " +
      colors.gray("Create controller methods in"),
  );
  console.log("     " + colors.cyan(controllerFile));
  console.log("");
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log(
    colors.dim("  Tool: ") +
      colors.accent("scaffold-service") +
      colors.dim(" v2.0.0 | ") +
      colors.gray("© 2026 Abubakar Shaikh"),
  );
  console.log(
    colors.dim("  Repo: ") +
      colors.cyan("github.com/abubakar-shaikh-dev/scaffold-service.git"),
  );
  console.log(
    colors.dim.gray(
      "───────────────────────────────────────────────────────────────",
    ),
  );
  console.log("");
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  try {
    // Handle --help flag
    if (cliArgs.help) {
      printHelp();
      process.exit(0);
    }

    // Validate CLI arguments if provided
    const validationErrors = validateCliArgs(cliArgs);
    if (validationErrors.length > 0) {
      for (const error of validationErrors) {
        console.log(colors.red(`  ✗ ${error}`));
      }
      console.log("");
      printHelp();
      process.exit(1);
    }

    // Non-interactive mode: skip banner if all args provided
    const isNonInteractive = cliArgs.name && cliArgs.structure;

    if (!isNonInteractive) {
      // Print banner only in interactive mode
      printBanner();
    } else {
      console.log("");
      console.log(
        colors.gradient1("  ⚡ ") +
          colors.bold.white("Quick Mode") +
          colors.dim(" - Generating service files...")
      );
      console.log("");
    }

    // Step 1: Select folder structure (skip if provided via CLI)
    let folderStructure;
    if (cliArgs.structure) {
      // Normalize structure value
      const structureMap = {
        separate: "current",
        modular: "modular",
        current: "current",
      };
      folderStructure = structureMap[cliArgs.structure.toLowerCase()] || "current";
      if (!isNonInteractive) {
        const structureName = folderStructure === "current" ? "Separate Folder Structure" : "Modular Folder Structure";
        console.log(colors.green("  ✓ Structure: ") + colors.bold.white(structureName) + colors.dim(" (from CLI)"));
      }
    } else {
      folderStructure = await selectFolderStructure();
    }

    // Step 2: Select language (skip if --typescript provided via CLI)
    let language;
    if (cliArgs.typescript) {
      language = "ts";
      if (!isNonInteractive) {
        console.log(colors.green("  ✓ Language: ") + colors.bold.white("TypeScript") + colors.dim(" (from CLI)"));
      }
    } else if (isNonInteractive) {
      // Default to JS in non-interactive mode if --typescript not specified
      language = "js";
    } else {
      language = await selectLanguage();
    }

    // Step 3: Get service name (skip if provided via CLI)
    let name;
    if (cliArgs.name) {
      name = cliArgs.name.toLowerCase();
      if (!isNonInteractive) {
        console.log(colors.green("  ✓ Service name: ") + colors.bold.white(name) + colors.dim(" (from CLI)"));
        console.log("");
      }
    } else {
      name = await getServiceName();
    }
    const lowerName = name.toLowerCase();
    const camelName = snakeToCamel(lowerName);

    // Step 4: Show configuration preview and confirm (skip in non-interactive mode)
    if (!isNonInteractive) {
      await showConfigurationPreview(lowerName, camelName, folderStructure, language);
    }

    // Step 5: Generate files
    const filesCreated = await generateFiles(
      lowerName,
      camelName,
      folderStructure,
      language,
    );

    // Print success summary
    printSuccessSummary(lowerName, folderStructure, filesCreated);
  } catch (error) {
    if (error.isTtyError) {
      errorExit("Prompt couldn't be rendered in the current environment");
    } else if (error.name === "ExitPromptError") {
      console.log(colors.yellow("\n  ⚠ Operation cancelled by user."));
      process.exit(0);
    } else {
      errorExit(error.message);
    }
  }
}

// Run the main function
main();
