<div align="center">

# scaffold-service

**The modern, interactive CLI for generating production-ready service architectures.**

[![npm version](https://img.shields.io/npm/v/scaffold-service.svg?style=flat-square&color=00afff)](https://www.npmjs.com/package/scaffold-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/scaffold-service.svg?style=flat-square)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dt/scaffold-service.svg?style=flat-square)](https://www.npmjs.com/package/scaffold-service)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Structures](#-folder-structures) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**scaffold-service** is a powerful CLI tool designed to eliminate boilerplate fatigue. Whether you prefer a **distributed** (layer-based) architecture or a **modular** (component-based) one, this tool generates consistent, ES6+ ready code in seconds.

Top-tier engineering teams use consistent patterns. `scaffold-service` enforces these patterns automatically, ensuring your services, controllers, validations, and routes are always aligned.

## ✨ Features

- **🚀 Two Architecture Modes**: Seamless support for both **Layered** (Separate) and **Modular** (Domain-driven) structures.
- **📘 TypeScript Support**: Generate `.ts` files with proper type annotations and Express types.
- **⚡ Non-Interactive Mode**: Skip prompts with CLI flags for automation and scripting.
- **🎨 Modern CLI Experience**: Beautiful, color-coded interactive prompts using `inquirer`.
- **⚡ ES6+ & Zod Ready**: Generates modern JavaScript/TypeScript with `import/export` syntax and pre-configured `zod` validation stubs.
- **📦 Production Best Practices**: Includes standard patterns for Controllers, Services, and Routes out of the box.
- **🛡️ Type-Safe Validations**: Pre-wired validation middleware integration with Zod type inference.

## 📦 Installation

You can use the tool directly via `npx` (recommended) or install it globally.

### Recommended: Run with npx
No installation required. Always runs the latest version.
```bash
npx scaffold-service
```

### Global Installation
If you use it frequently, install it globally:
```bash
npm install -g scaffold-service
```

## 🚀 Usage

Navigate to your project root and run the command:

```bash
scaffold-service
```

### The Interactive Flow

The CLI will guide you through a 4-step process:

1.  **Select Structure**: Choose between `Separate` or `Modular` architecture.
2.  **Select Language**: Choose between `JavaScript` or `TypeScript`.
3.  **Name Service**: Enter a `snake_case` name (e.g., `user_profile`, `payment_gateway`).
4.  **Confirm**: Review the preview and confirm generation.

```text
Step 1 → Folder Structure
  ▸ Select folder structure type
    [1] Separate Folder Structure (Distributed across folders)
    [2] Modular Folder Structure (All-in-one folder)

Step 2 → Language
  ▸ Select programming language
    [1] JavaScript (.js files)
    [2] TypeScript (.ts files with type annotations)

Step 3 → Service Name
  ▸ Enter service name: payment_methods

Step 4 → Configuration Preview
  📊 Service Configuration
    Service Name: payment_methods
    Language:     TypeScript
    Structure:    Modular
  
  ✓ Proceed with creation? (Y/n)
```

### Non-Interactive Mode (CLI Flags)

For automation and scripting, skip prompts entirely with CLI flags:

```bash
# Generate JavaScript service with modular structure
scaffold-service --name=payment --structure=modular

# Generate TypeScript service with separate structure
scaffold-service -n user_profile -s separate -ts

# Show help
scaffold-service --help
```

**Available Flags:**
| Flag | Short | Description |
|------|-------|-------------|
| `--name <name>` | `-n` | Service name (snake_case) |
| `--structure <type>` | `-s` | `separate` or `modular` |
| `--typescript` | `-ts` | Generate TypeScript files |
| `--help` | `-h` | Show usage information |

## 📂 Folder Structures

We support the two most common Node.js architectural patterns.

### Option 1: Separate (Layered)
*Best for: Traditional MVC applications, large teams with strict separation of concerns.*

```text
src/
├── controllers/
│   └── payment_methods.controller.js
├── services/
│   └── payment_methods.service.js
├── validations/
│   └── payment_methods.validation.js
└── routes/
    └── v1/
        └── payment_methods.routes.js
```

### Option 2: Modular (Domain-Driven)
*Best for: Microservices, distinct features, and maintaining high cohesion.*

```text
src/
└── modules/
    └── payment_methods/
        ├── payment_methods.controller.js
        ├── payment_methods.service.js
        ├── payment_methods.validation.js
        └── payment_methods.routes.js
```

## 🛠️ Post-Scaffolding Steps

After generating your files, don't forget to register your new route!

1.  Open your main route entry file (e.g., `src/routes/index.js` or `app.js`).
2.  Import and use the new route:

```javascript
import paymentMethodsRoutes from './modules/payment_methods/payment_methods.routes.js'; // or from routes/v1/...

// ...
router.use('/payment-methods', paymentMethodsRoutes);
```

## 💻 Development

Want to contribute or customize the tool?

1.  Clone the repo:
    ```bash
    git clone https://github.com/abubakar-shaikh-dev/scaffold-service.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run locally:
    ```bash
    npm start
    ```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👤 Author

**ABUBAKAR SHAIKH**

- GitHub: [@abubakar-shaikh-dev](https://github.com/abubakar-shaikh-dev)
- Repository: [scaffold-service](https://github.com/abubakar-shaikh-dev/scaffold-service)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
