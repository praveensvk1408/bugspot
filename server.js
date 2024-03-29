const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const homePath = "/home/ubuntu/.jenkins/workspace/"
const port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'public/index.html'));
});

app.get("/data/:name", (req, res) => {
  if (fs.existsSync(homePath + req.params.name + "/microservices/webbff/test/e2e/goReportJSONFile/getProduct_output.json")) {
    console.log("exs")
    const jsonString = fs.readFileSync(homePath + req.params.name + "/microservices/webbff/test/e2e/goReportJSONFile/getProduct_output.json")
    const data = JSON.parse(jsonString)
    res.json(data)
  }
}
)
