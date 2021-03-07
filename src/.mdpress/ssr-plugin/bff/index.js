const express = require("express");
const prepare = require('./prepare');
const app = express();

prepare(app);
app.listen(process.env.BFF_PORT);