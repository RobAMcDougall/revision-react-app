/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./video.css";

function VideoNoteLanding() {
  const pictureRef = useRef(null);

  useEffect(() => {
    const picture = pictureRef.current;

    const handleMouseMove = (event) => {
      const { clientWidth, clientHeight } = picture;
      const { clientX, clientY } = event;
      const rect = picture.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      const xPercent = (offsetX - clientWidth / 2) / clientWidth;
      const yPercent = (offsetY - clientHeight / 2) / clientHeight;

      gsap.to(picture, {
        x: xPercent * -30,
        y: yPercent * -30,
        rotation: xPercent * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(picture, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    picture.addEventListener("mousemove", handleMouseMove);
    picture.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      picture.removeEventListener("mousemove", handleMouseMove);
      picture.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="wholeSection">
        <div className="text">
          <h2 className="title">
            Streamlining Learning: The Integration of YouTube into a Dedicated
            App
          </h2>
          <p className="para">
            YouTube, now a primary study tool, offers diverse educational
            content. Its integration into an app boosts accessibility and
            efficiency. By consolidating resources, it saves time and aligns
            with modern learners' need for streamlined knowledge access, marking
            a significant leap in efficient learning methods.
          </p>
        </div>
        <div className="imgContainer" ref={pictureRef}>
          <img className="video-landing" src="/video.png" alt="Screenshot" />
        </div>
      </div>
    </>
  );
}

export default VideoNoteLanding;
