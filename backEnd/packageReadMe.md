{
  "name": "backend",
  "main": "server.ts",
  "type": "module",
  "scripts": {
    "dev": "ts-node --loader ts-node/esm server.ts", // ts-node-dev 或 ts node 都執行不了。 她會叫我只能使用 import 但我已經這樣做了。 所以我只得直接 build + start
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "ts-node-dev": "^2.0.0"
  }
}
