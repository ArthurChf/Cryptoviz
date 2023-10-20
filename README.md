# Big Data

## Configuration and linter in VS Code
* Install the "ESLint" extension
* In the `settings.json`, add these properties :
```
"eslint.format.enable": true,
"eslint.workingDirectories": [
    "api",
    "app"
],
"javascript.preferences.quoteStyle": "single"
```

## Commands

### Install required dependencies
**API / APP :**
```
// if nvm not installed : https://github.com/nvm-sh/nvm
nvm use
npm i
```

### Run
**API :**
```
// Start in development mode (with hot reload)
npm run start:dev

// Build the project for production environment
npm run build

// List errors from ESLint
npm run lint
```

**APP :**
```
// Start in development mode (with hot reload)
npm run dev

// Build the project for production environment
npm run build

// List errors from ESLint
npm run lint
```