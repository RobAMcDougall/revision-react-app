import React from "react";

class Navigation extends React.Component {
  scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    return (
      <div className="navigation">
        <button onClick={() => this.scrollToSection("section2")}>
          What is NoteApp
        </button>
        <button onClick={() => this.scrollToSection("section3")}>
          Register
        </button>
        <button onClick={() => this.scrollToSection("section3")}>
          Contact Us
        </button>
      </div>
    );
  }
}

export default Navigation;
