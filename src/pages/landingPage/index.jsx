
import HeroSection from "../../layout/LandingPageHero";
import ExplainSection from "../../layout/Landingpagemid";
import End from "../../layout/landingpageend";
import Navigation from "../../components/LandingComponents/LandingNavigation";
import React from "react";
import "./landing.css";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="nav">
          <Navigation />
          <div>
            <HeroSection />
          </div>
        </div>
        <div id="section2">
          <ExplainSection />
        </div>
        <div id="section3">
          <End />
        </div>
      </div>
    );
  }
}

export default LandingPage;
