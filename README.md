# Cryptoviz
A dashboard showing cryptocurrencies statistics, handling large data volume.
Used stack :
* **App** : Vue.js
* **Api** : Nest.js
* **Stream processing** : Redpanda (Kafka-based)
* **Data processing** : Python
* **Data lake** : MongoDB
* **Data warehouse** : ClickHouse

## App environments
The app has two environments, that can be changed in the .env file in the app folder :
* **DEMO** (default)
* **PRODUCTION**

The "DEMO" environment is for demonstration purposes only. The statistics displayed are therefore false to simulate real-time data recovery.

The "PRODUCTION" environment is using the real cryptocurrencies statistics, get by Binance API and News RSS.

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