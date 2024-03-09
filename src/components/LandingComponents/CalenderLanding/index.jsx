/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./calender.css";

function CalenderLanding() {
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
          <h2 className="title">The Role of Calendars in Modern Society</h2>
          <p className="para">
            Calendars, essential for organization, integrate with Outlook,
            boosting accessibility and convenience. Digital platforms optimize
            time management by consolidating tasks. This aligns with modern
            society's pursuit of efficiency, enhancing productivity.
          </p>
        </div>
        <div>
          <img
            className="calender-landing"
            src="/calender.png"
            ref={pictureRef}
            alt="Screenshot"
          />
        </div>
      </div>
    </>
  );
}

export default CalenderLanding;
