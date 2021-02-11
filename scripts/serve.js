'use strict';

const path = require('path');
const fsp = require('fs').promises;
const express = require('express');
const fetch = require('node-fetch');
const getPieceInfo = require('./get-piece-info');

const app = express();

app.use('/static', express.static(path.join(__dirname, '../static')));

const humanMonths = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

app.get('/about', (req, res) => {
  const renderPage = require('./render-page');
  const About = require('../dist/about');
  const html = renderPage(About);
  res.send(html);
});

app.get('/', (req, res) => {
  getPieceInfo().then((pieces) => {
    const [newest] = pieces.sort((a, b) => b.releaseDate - a.releaseDate);
    fetch('http://stats.api.generative.fm/v1/global/playtime')
      .then((response) => response.json())
      .then((json) => {
        const [mostPlayed] = pieces
          .filter(({ id }) => id !== 'aisatsana' && id !== newest.id)
          .sort((a, b) => json[b.id] - json[a.id]);
        const now = Date.now();
        const [mostTrending] = pieces
          .filter(
            ({ id }) =>
              id !== 'aisatsana' && id !== mostPlayed.id && id !== newest.id
          )
          .sort(
            (a, b) =>
              json[b.id] / (now - b.releaseDate.getTime()) -
              json[a.id] / (now - a.releaseDate.getTime())
          );
        Promise.all(
          [newest, mostPlayed, mostTrending].map(({ image }) =>
            fsp.readFile(image, { encoding: 'base64' })
          )
        )
          .then((base64Images) =>
            base64Images.map(
              (base64Image) => `data:image/png;base64,${base64Image}`
            )
          )
          .then(([newestImage, mostPlayedImage, mostTrendingImage]) => {
            const featuredGenerators = [
              {
                title: mostPlayed.title,
                subtitle: `played for ${Math.floor(
                  json[mostPlayed.id] / (1000 * 60 * 60)
                )} hours`,
                imageSrc: mostPlayedImage,
                href: mostPlayed.href,
              },
              {
                title: mostTrending.title,
                subtitle: `played ${Math.floor(
                  json[mostTrending.id] /
                    ((now - mostTrending.releaseDate.getTime()) / 24)
                )} hours per day`,
                imageSrc: mostTrendingImage,
                href: mostTrending.href,
              },
              {
                title: newest.title,
                subtitle: `released ${
                  humanMonths[newest.releaseDate.getMonth()]
                } ${newest.releaseDate.getFullYear()}`,
                imageSrc: newestImage,
                href: newest.href,
              },
            ];
            const renderPage = require('./render-page');
            const Index = require('../dist/index');
            const html = renderPage(Index, { featuredGenerators });
            res.send(html);
          });
      });
  });
});

app.listen(3000);
