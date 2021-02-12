import React from 'react';
import getFeaturedGenerators from './get-featured-generators';

const links = [
  ['Play', 'https://play.generative.fm'],
  ['Record', 'https://record.generative.fm'],
  ['About', '/about'],
];

const Index = getFeaturedGenerators().then((featuredGenerators) => {
  return function IndexComponent() {
    return (
      <>
        <header className="header">
          <a href="/" className="header__home header__home--is-hidden">
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
        <main className="landing">
          <div className="landing__content">
            <h1 className="landing__content__title">Generative.fm</h1>
            <h2 className="landing__content__subtitle">
              Ambient music generators to let you focus, sleep, or relax.
              Composed by a human and infinitely performed by computers.
            </h2>
            <a href="https://play.generative.fm" className="big-button">
              Open Web Player
            </a>
          </div>
          <div className="landing__featured">
            {featuredGenerators.map(({ imageSrc, title, subtitle, href }) => (
              <a
                key={href}
                className="landing__featured__generator"
                href={href}
              >
                <img
                  className="landing__featured__generator__img"
                  src={imageSrc}
                />
                <div className="landing__featured__generator__info">
                  <div className="landing__featured__generator__info__title">
                    {title}
                  </div>
                  <div className="landing__featured__generator__info__subtitle">
                    {subtitle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>
      </>
    );
  };
});

export default Index;
