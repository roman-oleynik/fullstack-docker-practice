const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "../..", "dist")));

app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../..", "dist", "index.html"));
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
