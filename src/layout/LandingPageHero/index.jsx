/* eslint-disable react/no-unescaped-entities */
import "./Hero.css";
function HeroSection() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="hero1">
            <h1 className="herotitle">
              Your first all-in-one solution for efficient, organised revision.
              We are First Revision
            </h1>
            <img className="heroimg" src="/hero.jpg" />
          </div>
          <div className="hero2">
            <h3 className="abouttitle">About us?</h3>
            <p className="para-about">
              Bid farewell to chaotic note-taking and embrace the art of
              intelligent organization. With First Revision, your notes find
              their perfect place effortlessly, ensuring every piece of
              information is easily accessible when you need it most. But that's
              just the beginning.With First Revision, learning knows no bounds.
              Equip yourself with the tools you need to conquer academic
              obstacles and rewrite the narrative of education. Join us as we
              revolutionize the way you study – one note at a time. Welcome to a
              world where greatness awaits. Welcome to First Revision.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
