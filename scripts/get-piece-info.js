'use strict';

const path = require('path');
const glob = require('glob');

const getFullManifestPath = (packageFile) => {
  const { generativeFmManifest } = require(packageFile);
  return packageFile.replace('package.json', generativeFmManifest);
};

const mapManifestModule = ({ title, image, id, releaseDate }) => ({
  title,
  id,
  image: path.join(
    __dirname,
    `../node_modules/@generative-music/piece-${id}`,
    image
  ),
  releaseDate: new Date(releaseDate),
  href: `https://play.generative.fm/generator/${id}`,
});

const getPieceInfo = () =>
  new Promise((resolve) => {
    glob(
      path.join(
        __dirname,
        '../node_modules/@generative-music/piece-*/package.json'
      ),
      (err, packageFiles) =>
        resolve(
          packageFiles
            .map(getFullManifestPath)
            .map((manifestFile) => require(manifestFile))
            .map(mapManifestModule)
        )
    );
  });

module.exports = getPieceInfo;
