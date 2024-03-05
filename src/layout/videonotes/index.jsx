import Notes from "../../components/Notes";
import VideoPlayer from "../../components/embedingvideo";
import "./section1.css";

function VideoS1() {
  return (
    <>
      <div className="section1">
        <VideoPlayer />
        <Notes />
      </div>
    </>
  );
}

export default VideoS1;
