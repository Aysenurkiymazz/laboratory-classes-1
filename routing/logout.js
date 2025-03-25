const logoutRouting = (method, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Shop – Logout</title>
        </head>
        <body>
          <h1>Logout</h1>
          <nav>
            <a href="/">Home</a> |
            <a href="/kill">Logout from application</a>
          </nav>
        </body>
      </html>
    `);
    res.end();
  };
  
  module.exports = logoutRouting;
  
