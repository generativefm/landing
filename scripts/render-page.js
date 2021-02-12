'use strict';

const fsp = require('fs').promises;
const path = require('path');
const rollup = require('rollup');
const { minify } = require('html-minifier');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const createRollupConfig = require('./create-rollup-config');

const TITLE = 'Generative.fm &ndash; Endless ambient music generators';
const DESCRIPTION =
  'Ambient generative music to let you focus, sleep, or relax. Composed by a human and infinitely performed by computers.';

const renderPageComponent = (component) =>
  Promise.all(
    ['../src/styles.css', '../src/page-script.js'].map((filepath) =>
      fsp.readFile(path.join(__dirname, filepath), 'utf8')
    )
  ).then(([css, script]) => {
    const staticMarkup = renderToStaticMarkup(createElement(component));
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>${TITLE}</title>
        <meta name="theme-color" content="#ffd700" />
        <meta name="author" content="Alex Bainter" />
        <meta name="keywords" content="generative music, ambient music, music generator, focus music, sleep music, drone music, background music, generated music, generative ambient"/>
        <meta name="description" content="${DESCRIPTION}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://generative.fm" />
        <meta
          name="og:title"
          content="${TITLE}"
        />
        <meta
          name="og:description"
          content="${DESCRIPTION}"
        />
        <meta
          name="og:image"
          content="https://generative.fm/social-image.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://generative.fm" />
        <meta
          property="twitter:title"
          content="${TITLE}"
        />
        <meta
          property="twitter:description"
          content="${DESCRIPTION}"
        />
        <meta
          property="twitter:image"
          content="https://generative.fm/social-image.png"
        />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <style>${css}</style>
        <script type="text/javascript">${script}</script>
      </head>
      <body>${staticMarkup}</body>
    </html>`;
    return minify(html, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
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
