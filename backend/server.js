const express = require('express')
const app = express()

const login = require('./src/login');
const api = require('./src/api');
const middle = require('./src/middle');

const port = process.env.PORT || 8001;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/tribus")
.then(() => {
  const log = middle.log;
  const auth = middle.auth;
  app.use(express.json());
  app.use('/auth', [log], login);
  app.use('/api', [auth, log], api);
  app.listen(port, () => console.log(`Started on port ${port}`));
});

