const homeRouting = (method, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Shop – Home</title>
        </head>
        <body>
          <h1>Home</h1>
          <nav>
            <a href="/product/add">Add product</a> |
            <a href="/product/new">Newest product</a> |
            <a href="/logout">Logout</a>
          </nav>
        </body>
      </html>
    `);
    res.end();
  };
  
  module.exports = homeRouting;
  
