const fs = require('fs');
const path = require('path');
const STATUS_CODE = require('../constants/statusCode');

const filePath = path.join(__dirname, '..', 'product.txt');

const productRouting = (method, url, req, res) => {
  if (url === '/product/add' && method === 'GET') {
    // Ürün ekleme formu
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head><title>Shop – Add product</title></head>
        <body>
          <h1>Add product</h1>
          <form method="POST" action="/product/add">
            <input type="text" name="name" placeholder="Product Name" required />
            <br />
            <textarea name="description" placeholder="Description" required></textarea>
            <br />
            <button type="submit">Add</button>
          </form>
          <nav>
            <a href="/">Home</a> |
            <a href="/product/new">Newest product</a> |
            <a href="/logout">Logout</a>
          </nav>
        </body>
      </html>
    `);
    res.end();

  } else if (url === '/product/add' && method === 'POST') {
    // Formdan gelen verileri işle
    let body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const decoded = decodeURIComponent(parsedBody).replace(/\+/g, ' ');
      const [namePart, descPart] = decoded.split('&');
      const name = namePart.split('=')[1];
      const description = descPart.split('=')[1];

      const content = `Name: ${name}\nDescription: ${description}\n`;

      fs.writeFile(filePath, content, (err) => {
        if (err) throw err;

        res.writeHead(STATUS_CODE.FOUND, { Location: '/product/new' });
        res.end();
      });
    });

  } else if (url === '/product/new') {
    // En son ürünü göster
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <html>
          <head><title>Shop – Newest product</title></head>
          <body>
            <h1>Newest Product</h1>
            <pre>${data || 'No product available.'}</pre>
            <nav>
              <a href="/">Home</a> |
              <a href="/product/add">Add product</a> |
              <a href="/logout">Logout</a>
            </nav>
          </body>
        </html>
      `);
      res.end();
    });

  } else {
    const now = new Date().toISOString();
    console.log(`ERROR [${now}]: requested url ${url} doesn’t exist.`);
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
};

module.exports = productRouting;

