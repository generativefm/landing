import React from 'react';
import getFeaturedGenerators from './get-featured-generators';

const links = [
  ['Play', 'https://play.generative.fm'],
  ['Record', 'https://record.generative.fm'],
];

const Generator = ({ generator }) => {
  const { imageSrc, title, subtitle, href } = generator;
  return (
    <a key={href} className="generator" href={href}>
      <img
        className="generator__img"
        src={imageSrc}
        alt={`${title} cover image`}
      />
      <div className="generator__info">
        <div className="generator__info__title">{title}</div>
        <div className="generator__info__subtitle">{subtitle}</div>
      </div>
    </a>
  );
};

const Index = getFeaturedGenerators().then((featuredGenerators) => {
  return function IndexComponent() {
    return (
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
        <main>
          <div className="cta">
            <h1 className="cta__title">
              Music for
              <br />
              <span className="cta__title__keywords">
                <span>focus</span>
                <span>sleep</span>
                <span>meditation</span>
                <span>relaxing</span>
                <span>content</span>
              </span>
            </h1>
            <h2 className="cta__subtitle">
              Ambient music generators that never end or repeat.
            </h2>
            <a href="https://play.generative.fm" className="big-button-link">
              Launch Player
            </a>
          </div>
          <div className="topics">
            <div className="topics__group">
              <div className="topics__group__text">
                <h2 className="topics__group__text__title">Truly ambient</h2>
                <div className="topics__group__text__content">
                  Music that lasts as long as you&apos;d like to listen—with no
                  distracting track changes or loops. Redefine what it means for
                  music to be &lsquo;ambient.&rsquo;
                </div>
              </div>
              <div className="topics__generator">
                <Generator generator={featuredGenerators[0]} />
              </div>
            </div>
            <div className="topics__group">
              <div className="topics__group__text">
                <h2 className="topics__group__text__title">
                  Not just &lsquo;on repeat&rsquo;
                </h2>
                <div className="topics__group__text__content">
                  Every performance is completely unique and capable of
                  sustaining as long a session as you want&mdash;as many times
                  as you need.
                </div>
              </div>
              <div className="topics__generator">
                <Generator generator={featuredGenerators[1]} />
              </div>
            </div>
            <div className="topics__group">
              <div className="topics__group__text">
                <h2 className="topics__group__text__title">
                  Pay what you want
                </h2>
                <div className="topics__group__text__content">
                  The entire service is available with no obligations, no ads,
                  and no account required.
                </div>
              </div>
              <div className="topics__generator">
                <Generator generator={featuredGenerators[2]} />
              </div>
            </div>
          </div>
          <div className="tail">
            <h2 className="tail__title">
              Choose from 50+ hand-crafted generators
            </h2>
            <h3 className="tail__subtitle">with new ones added all the time</h3>
            <div className="tail__text">
              Music isn&apos;t one-size-fits-all, and generative music is no
              different. The music from Generative.fm is composed by a
              human&mdash;not AI&mdash;and comes from a variety of unique
              generators, so you can find the ones that suit your taste.
            </div>
          </div>
          <a href="https://play.generative.fm" className="big-button-link">
            Launch Player
          </a>
        </main>
        <footer>
          <a className="footer-link" href="https://alexbainter.com">
            made by Alex Bainter
          </a>
          <a className="footer-link" href="https://twitter.com/alex_bainter">
            Twitter
          </a>
        </footer>
      </>
    );
  };
});

export default Index;
