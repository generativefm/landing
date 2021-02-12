import React from 'react';

const links = [
  ['Play', 'https://play.generative.fm'],
  ['Record', 'https://record.generative.fm'],
  ['About', '/about'],
];

const About = () => (
  <>
    <header className="header">
      <a href="/" className="header__home">
        Generative.fm
      </a>
      <div className="header__links">
        {links.map(([label, href]) => (
          <a className="header__links__link" href={href} key={href}>
            {label}
          </a>
        ))}
      </div>
    </header>
    <main className="about">
      <h1 className="about__title">About</h1>
      <div className="about__text">
        <p>
          Generative.fm is a generative music service from{' '}
          <a href="https://alexbainter.com">Alex Bainter</a>, a web developer
          and musician.
        </p>
        <p>
          Each generator can play ambient music forever but will never repeat
          itself. There are an unlimited number of performances and every
          listening experience is entirely unique.
        </p>
        <p>
          The music is meant to be ignorable, but not boring. It&apos;s great
          when you want something to listen to that isn&apos;t distracting, like
          while you&apos;re working, reading, or falling asleep.
        </p>
        <p>
          Generative.fm is{' '}
          <a href="https://github.com/generative-fm">open-source</a> and users{' '}
          <a href="https://play.generative.fm/donate">pay whatever they like</a>
          .
        </p>
      </div>
      <div className="about__button-container">
        <a className="big-button" href="https://play.generative.fm">
          Open Web Player
        </a>
      </div>
    </main>
  </>
);

export default About;
