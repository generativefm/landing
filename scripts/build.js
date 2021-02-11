'use strict';

const fsp = require('fs').promises;
const path = require('path');
const renderPage = require('./render-page');

const buildPage = (pageName) =>
  renderPage(`../src/${pageName}.jsx`).then((html) => {
    const filename = path.join(__dirname, '../dist', `${pageName}.html`);
    console.log('writing ', filename);
    return fsp.writeFile(filename, html);
  });

fsp
  .mkdir(path.join(__dirname, '../dist'))
  .catch(() => {
    //ignore
  })
  .then(() => Promise.all(['index', 'about'].map(buildPage)));
