import "./home.css";
import {
  StickyNotes,
  Quotes,
  Timer,
  Todos,
  FullCalendar,
} from "../../components";
import "../../App.css";
function HomePage() {
  return (
    <div className="container">
      <div className="f1">
        <div className="welcome-message">
          <p className="wel">Welcome,</p>
          <p className="message"> what would you like to work on today?</p>
        </div>
        <div>
          <Timer />
        </div>
      </div>
      <div className="f2">
        <FullCalendar />
        <Todos />
      </div>
      <div className="f3">
        <Quotes />
        <StickyNotes />
      </div>
    </div>
  );
}

export default HomePage;
