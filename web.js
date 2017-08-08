const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/dist')));

const server = app.listen(80);
console.log("listen port 80");