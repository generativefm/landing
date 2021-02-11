'use strict';

const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const renderPage = (componentModule, props = null) => {
  const staticMarkup = renderToStaticMarkup(
    createElement(componentModule, props)
  );
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <link rel="stylesheet" href="/static/styles.css">
      </head>
      <body>${staticMarkup}</body>
    </html>`;
};

module.exports = renderPage;
