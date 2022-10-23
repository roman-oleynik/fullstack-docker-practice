const express = require('express');
const path = require('path');
const app = express();

const router = require('./routes/todos.router');

app.use('/api/todos', router);

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
