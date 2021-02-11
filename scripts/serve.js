'use strict';

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

app.listen(3000);
