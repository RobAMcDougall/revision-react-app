import React from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";
class Navigation extends React.Component {
  scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    return (
<<<<<<< HEAD
      <div className="navigation" role="navigation">
        <button onClick={() => this.scrollToSection("section2")}>
          What is NoteApp
        </button>
        <button onClick={() => this.scrollToSection("section3")}>
          Register
        </button>
        <button onClick={() => this.scrollToSection("section3")}>
          Contact Us
        </button>
=======
      <div className="navigation">
        <div className="logo-container">
          <NavLink to="/">
            <img src="../../public/02logo.svg" />
          </NavLink>
          <NavLink to="/">
            <h1 className="logo">First Revision</h1>
          </NavLink>
        </div>
        <div className="scroll">
          <button
            className="landbutton"
            onClick={() => this.scrollToSection("section2")}
          >
            What is NoteApp
          </button>
          <button
            className="landbutton"
            onClick={() => this.scrollToSection("section3")}
          >
            Register
          </button>
          <button
            className="landbutton"
            onClick={() => this.scrollToSection("section3")}
          >
            Contact Us
          </button>
        </div>
>>>>>>> dev
      </div>
    );
  }
}

export default Navigation;
