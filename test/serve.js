const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , "index.html"));
});

PORT = 3000
http.listen(PORT, () => {
  console.log("To view your app, open this link in your browser: http://localhost:" + PORT);
});