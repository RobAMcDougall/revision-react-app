import CalenderLanding from "../../components/LandingComponents/CalenderLanding";
import MotiLanding from "../../components/LandingComponents/MotiLanding";
import TODOLanding from "../../components/LandingComponents/TODOLanding";
import VideoNoteLanding from "../../components/LandingComponents/VideoNoteLanding";
import "./mid.css";

function ExplainSection() {
  return (
    <>
      <div className="mid">
        <VideoNoteLanding />
        <TODOLanding />
        <CalenderLanding />
        <MotiLanding />
      </div>
    </>
  );
}

export default ExplainSection;
