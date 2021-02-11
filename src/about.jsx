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
          The generators are designed to play ambient music forever, but never
          repeat themselves. Every listening experience is completely unique.
        </p>
        <p>
          Each generator is meant to set a consistent mood. It&apos;s a bit like
          having different shades of paint to color your acoustic environment.
        </p>
        <p>
          The service is{' '}
          <a href="https://github.com/generative-fm">open-source</a> and users{' '}
          <a href="https://play.generative.fm/donate">pay whatever they like</a>
          .
        </p>
      </div>
    </main>
  </>
);

export default About;
