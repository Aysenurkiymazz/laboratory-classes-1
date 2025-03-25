const http = require('http');
const { PORT } = require('./config');
const requestRouting = require('./routing/routing');

const server = http.createServer((req, res) => {
  requestRouting(req, res);
});

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});