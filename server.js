const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const loadHtmlFile = (res, urlPath) => {
    fs.readFile(path.join(__dirname + urlPath), "utf8", (err, content) => {
      console.log(__dirname + urlPath);
      if (err) {
        loadErrNotFound(res);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(content);
        res.end();
      }
    });
  };

  const loadFile = (res, filePath, fileType) => {
    let fileData = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": fileType });
    res.end(fileData, "binary");
  };

  const loadErrNotFound = (res) => {
    res.writeHead(404);
    res.end("404 - Not Found");
  };

  let repCSS = /\/css/;
  let repImages = /\/images/;
  let repJs = /\/js/;
  console.log(req.url);
  switch (true) {
    case req.url === "/":
      loadHtmlFile(res, "/index.html");
      break;

    case req.url === "/Accueil":
      loadHtmlFile(res, "/public/html/Accueil.html");
      break;

    case req.url === "/Fabrication":
      loadHtmlFile(res, "/public/html/Fabrication.html");
      break;

    case req.url === "/Utilisation":
      loadHtmlFile(res, "/public/html/Utilisation.html");
      break;

    case req.url === "/Elimination":
      loadHtmlFile(res, "/public/html/Elimination.html");
      break;

    case req.url === "/Solution":
      loadHtmlFile(res, "/public/html/Solution.html");
      break;

    case repJs.test(req.url):
      console.log(repJs.test(req.url));
      let jsFilePath = path.join(__dirname + req.url);
      loadFile(res, jsFilePath, "text/javascript");
      break;

    case repImages.test(req.url):
      let imgFilePath = path.join(__dirname + req.url);
      loadFile(res, imgFilePath, "image/png");
      break;

    case repCSS.test(req.url):
      let cssFilePath = path.join(__dirname + req.url);
      console.log(cssFilePath);
      loadFile(res, cssFilePath, "text/css");
      break;

    default:
      loadErrNotFound(res);
  }
});

const PORT = 4200;
server.listen(PORT);
console.log(
  `Nouvelle connexion... Server running at http://localhost:${PORT}/`
);
