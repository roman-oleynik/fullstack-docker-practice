const express = require('express');
const path = require('path');
const app = express();

const AWS = require('aws-sdk');
const config = require('../db/config');


// app.use(express.static(path.join(__dirname, "../..", "dist")));

// app.use(express.static("public"));

const getTodos = function (req, res) {
  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: config.aws_table_name
  };

  docClient.scan(params, function (err, data) {

    if (err) {
      console.log(err)
      res.send({
        success: false,
        message: err
      });
    } else {
        const { Items } = data;
        console.log(data);
        res.json({
          todos: Items
        });
    }
  });
};



// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "../..", "dist", "index.html"));
// });
app.get('/api/todos', getTodos);

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
