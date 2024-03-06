import CalenderLanding from "../../components/LandingComponents/CalenderLanding";
import MotiLanding from "../../components/LandingComponents/MotiLanding";
import TODOLanding from "../../components/LandingComponents/TODOLanding";
import VideoNoteLanding from "../../components/LandingComponents/VideoNoteLanding";

function ExplainSection() {
  return (
    <>
      <VideoNoteLanding />
      <TODOLanding />
      <CalenderLanding />
      <MotiLanding />
    </>
  );
}

export default ExplainSection;
