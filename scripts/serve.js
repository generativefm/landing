'use strict';

const express = require('express');
const renderPage = require('./render-page');

const app = express();

app.get('/', (req, res) => {
  renderPage('../src/index.jsx').then((html) => {
    res.send(html);
  });
});

//app.use('/sw.js', express.static(path.join(__dirname, '../dist/sw.js')));

app.listen(3000);
