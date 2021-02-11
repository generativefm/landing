'use strict';

const path = require('path');
const express = require('express');
const renderPage = require('./render-page');

const app = express();

app.get('/about', (req, res) => {
  renderPage('../src/about.jsx').then((html) => {
    res.send(html);
  });
});

app.get('/', (req, res) => {
  renderPage('../src/index.jsx').then((html) => {
    res.send(html);
  });
});

app.use('/sw.js', express.static(path.join(__dirname, '../dist/sw.js')));

app.listen(3000);
