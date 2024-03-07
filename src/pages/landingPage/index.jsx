import React from "react";
import HeroSection from "../../layout/LandingPageHero";
import ExplainSection from "../../layout/Landingpagemid";
import End from "../../layout/landingpageend";
import Navigation from "../../components/LandingComponents/LandingNavigation";
import "./landing.css";

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div className="background">
          <div className="nav">
            <Navigation />
          </div>
          <div>
            <HeroSection />
          </div>
          <div className="sections">
            <div id="section2">
              <ExplainSection />
            </div>
            <div id="section3">
              <End />
            </div>
          </div>
        </div>
        <div className="design-elements">
          <img
            className="de-1"
            src="/el1.png"
            alt="floating element"
            style={{
              animation: "moveLeftRight1 5s infinite alternate",
              position: "absolute",
              left: "50px",
              top: "1200px",
            }}
          />
          <img
            className="de-2"
            src="/el2.png"
            alt="floating element"
            style={{
              animation: "moveUpDown1 4s infinite alternate",
              position: "absolute",
              left: "200px",
              top: "4000px",
            }}
          />
          <img
            className="de-3"
            src="/el3.png"
            alt="floating element"
            style={{
              animation: "moveLeftRight2 6s infinite alternate",
              position: "absolute",
              left: "1100px",
              top: "3500px",
            }}
          />
          <img
            className="de-4"
            src="/el4.png"
            alt="floating element"
            style={{
              animation: "moveLeftRight3 4.5s infinite alternate",
              position: "absolute",
              left: "400px",
              top: "200px",
            }}
          />
          <img
            className="de-5"
            src="/el5.png"
            alt="floating element"
            style={{
              animation: "moveUpDown2 5.5s infinite alternate",
              position: "absolute",
              left: "350px",
              top: "3000px",
            }}
          />
          <img
            className="de-6"
            src="/el6.png"
            alt="floating element"
            style={{
              animation: "moveLeftRight4 4s infinite alternate",
              position: "absolute",
              left: "1000px",
              top: "2500px",
            }}
          />
          <img
            className="de-7"
            src="/el7.png"
            alt="floating element"
            style={{
              animation: "moveUpDown3 6s infinite alternate",
              position: "absolute",
              left: "1500px",
              top: "1000px",
            }}
          />
          <img
            className="de-8"
            src="/el8.png"
            alt="floating element"
            style={{
              animation: "moveLeftRight5 5s infinite alternate",
              position: "absolute",
              left: "1300px",
              top: "1500px",
            }}
          />
          <img
            className="de-9"
            src="/el9.png"
            alt="floating element"
            style={{
              animation: "moveUpDown4 4.5s infinite alternate",
              position: "absolute",
              left: "1250px",
              top: "520px",
            }}
          />
        </div>
      </>
    );
  }
}

export default LandingPage;
