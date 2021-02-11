'use strict';

import fetch from 'node-fetch';
import sharp from 'sharp';
import getPieceInfo from './get-piece-info';

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

const getImage = (pieceInfo) =>
  sharp(pieceInfo.image)
    .resize(200)
    .toBuffer()
    .then((buffer) => `data:image/png;base64,${buffer.toString('base64')}`);

const getFeaturedGenerators = () =>
  getPieceInfo().then((pieces) => {
    const [newest] = pieces.sort((a, b) => b.releaseDate - a.releaseDate);
    return fetch('http://stats.api.generative.fm/v1/global/playtime')
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
        return Promise.all(
          [newest, mostPlayed, mostTrending].map(getImage)
        ).then(([newestImage, mostPlayedImage, mostTrendingImage]) => {
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
          return featuredGenerators;
        });
      });
  });

export default getFeaturedGenerators;
