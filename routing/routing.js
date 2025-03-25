const homeRouting = require('./home');
const productRouting = require('./product');
const logoutRouting = require('./logout');
const STATUS_CODE = require('../constants/statusCode');

const requestRouting = (req, res) => {
  const url = req.url;
  const method = req.method;
  const now = new Date().toISOString();

  // Loglama
  console.log(`INFO [${now}]: ${method} - ${url}`);

  // Yönlendirmeler
  if (url === '/') {
    homeRouting(method, res);
  } else if (url.startsWith('/product')) {
    productRouting(method, url, req, res);
  } else if (url === '/logout') {
    logoutRouting(method, res);
  } else if (url === '/kill') {
    console.log(`PROCESS [${now}]: logout has been initiated and the application will be closed`);
    process.exit();
  } else {
    console.log(`ERROR [${now}]: requested url ${url} doesn’t exist.`);
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    res.end(`<h1>404 Not Found</h1><p>Requested URL ${url} does not exist.</p>`);
  }
};

module.exports = requestRouting;

