const express = require("express");
const { renderToString } = require("react-dom/server");

const SSR = require("../build");

server(process.env.PORT || 8080);

function server(port) {
  const app = express();

  app.use(express.static("build"));
  app.get("/", (req, res) => {
    res.status(200).send(renderMarkup(renderToString(SSR)));
  });

  app.listen(port);
}

function renderMarkup(html) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Webpack SSR Demo</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="container">${html}</div>
    <script src="./index.js"></script>
  </body>
</html>`;
}
