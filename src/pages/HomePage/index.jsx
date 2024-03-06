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
      <div className="dashboard-section1">
        <div className="welcome-message">
          Welcome, what would you like to work on today?
        </div>
        <FullCalendar />
      </div>
      <div className="dashboard-section2">
        <div className="dashboard-section3">
          <Todos />
          <Timer />
        </div>
        <div className="dashboard-section4">
          <StickyNotes />
          <Quotes />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
