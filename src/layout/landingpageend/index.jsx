import LoginLanding from "../../components/LandingComponents/LoginLanding";
import ContactForm from "../../components/LandingComponents/contactLanding";
import "./end.css";

function End() {
  return (
    <>
      <div className="endSection">
        <LoginLanding />
        <ContactForm />
      </div>
      <footer>I am a footer</footer>
    </>
  );
}

export default End;
