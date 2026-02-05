# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-02-06

### Added

- **TypeScript Support**: Generate `.ts` files with proper type annotations
  - New language selection prompt (Step 2)
  - TypeScript templates for service, validation, controller, and routes
  - Express `Request`/`Response` types in controller templates
  - Zod type inference examples in validation templates
- **Non-Interactive CLI Mode**: Skip prompts with command-line flags
  - `--name` / `-n`: Set service name directly
  - `--structure` / `-s`: Set folder structure (`separate` or `modular`)
  - `--typescript` / `-ts`: Generate TypeScript files
  - `--help` / `-h`: Show usage information
- Quick Mode indicator when running with CLI flags

### Changed

- Updated step numbering to accommodate language selection (5 steps total)
- Improved configuration preview to show selected language

---

## [2.0.0] - 2026-02-05

### Added

- Complete rewrite with modern ES6+ modules
- Interactive CLI with inquirer for better user experience
- Colorful terminal output with chalk
- Two folder structure options: Separate and Modular
- Automatic generation of service, controller, validation, and route files
- Snake_case to camelCase naming conversion
- Configuration preview before file creation
- CLI tool installable via npm global or npx
- Support for both distributed and modular folder organizations

### Changed

- Upgraded to ES modules (type: "module")
- Improved user interface with colors and formatting
- Enhanced error handling and user feedback
- Better file organization and structure

### Technical

- Node.js >= 18.0.0 required
- Dependencies: chalk@^5.3.0, fs-extra@^11.2.0, inquirer@^12.3.0
- Published as CLI tool with bin entry point

## [1.0.0] - 2025

### Added

- Initial release
- Basic service scaffolding functionality
- Core CLI tool structure

---

## Release Notes

### Version 2.0.0

This is a major release with significant improvements and modernization. The tool now provides:

- Better developer experience with interactive prompts
- Two folder structure options (Separate vs Modular)
- Automatic file generation for services, controllers, validations, and routes
- Modern JavaScript features and best practices
- Consistent naming conventions with snake_case input

### Future Plans

- Add more template options
- Support for TypeScript
- Docker configuration generation
- CI/CD pipeline templates
- Testing setup inclusion

---

For more information, visit [GitHub Repository](https://github.com/abubakar-shaikh-dev/scaffold-service)
