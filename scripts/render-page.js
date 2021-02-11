'use strict';

const fsp = require('fs').promises;
const path = require('path');
const rollup = require('rollup');
const csso = require('csso');
const { minify } = require('html-minifier');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const createRollupConfig = require('./create-rollup-config');

const renderPageComponent = (component) =>
  fsp
    .readFile(path.join(__dirname, '../src/styles.css'), 'utf8')
    .then((styles) => {
      const { css } = csso.minify(styles);
      const staticMarkup = renderToStaticMarkup(createElement(component));
      const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <style>${css}</style>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
      </head>
      <body>${staticMarkup}</body>
    </html>`;
      return minify(html, { collapseWhitespace: true });
    });

const renderPage = (modulePath) => {
  const rollupConfig = createRollupConfig(modulePath);
  return rollup
    .rollup(rollupConfig)
    .then((bundle) =>
      bundle.generate(rollupConfig.output).then(({ output }) => {
        const [{ code }] = output;
        bundle.close();
        return eval(code);
      })
    )
    .then((componentModule) => {
      if (typeof componentModule.then === 'function') {
        return componentModule.then((component) =>
          renderPageComponent(component)
        );
      }
      return Promise.resolve(renderPageComponent(componentModule));
    });
};

module.exports = renderPage;
