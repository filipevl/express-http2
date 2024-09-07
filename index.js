require('dotenv').config()
const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

const PORT = 8000;
const CERT_DIR = `${__dirname}/cert`;
const useSSL = true;

const app = express();

app.get('/', (_, res) => {
  res.send('hello world');
});

function createServer() {
  if (!useSSL) {
    return app;
  }
  return spdy.createServer(
    {
      key: fs.readFileSync(`${CERT_DIR}/server.key`),
      cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
    },
    app
  );
}

const server = createServer();

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
});