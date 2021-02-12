'use strict';

const fsp = require('fs').promises;
const path = require('path');
const favicons = require('favicons');
const renderPage = require('./render-page');

const buildPage = (pageName, { headInjectedHtml = '' } = {}) =>
  renderPage(`../src/${pageName}.jsx`, { headInjectedHtml }).then((html) => {
    const filename = path.join(__dirname, '../dist', `${pageName}.html`);
    console.log('writing ', filename);
    return fsp.writeFile(filename, html);
  });

const buildFavicons = () =>
  new Promise((resolve, reject) => {
    favicons(
      path.join(__dirname, '../src/logo.png'),
      {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
      (err, response) => {
        if (err) {
          return reject(err);
        }
        Promise.all(
          response.images.map(({ name, contents }) =>
            fsp.writeFile(path.join(__dirname, '../dist', name), contents)
          )
        ).then(() => {
          resolve(response.html.join(''));
        });
      }
    );
  });

fsp
  .mkdir(path.join(__dirname, '../dist'))
  .catch(() => {
    //ignore
  })
  .then(() => buildFavicons())
  .then((faviconHtml) =>
    Promise.all(
      ['index', 'about'].map((pageName) =>
        buildPage(pageName, { headInjectedHtml: faviconHtml })
      )
    )
  );
