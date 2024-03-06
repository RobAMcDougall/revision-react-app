import React from "react";
import Calendar from "react-calendar";
import "./index.css";
import { useState } from "react";

export default function FullCalendar() {
  const [calDate, setCalDate] = useState(new Date());

  // function onChange(calDate) {
  //   // change results based on calendar date click
  //   setCalDate(calDate)

  //   const filteredResults = userResults.filter(result => {
  //       const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
  //       const newCalDateFormat = calDate.toLocaleString().split(",")[0]
  //       return newResultFormat === newCalDateFormat
  //   })  }

  return (
    <div className="calendar-tile">
      <div className="calendar-tile-white">
        {/* <Calendar/> */}
        <iframe
     src="https://outlook.live.com/calendar/0/published/00000000-0000-0000-0000-000000000000/bcc35105-a008-4175-b085-4d7a936bfaf0/cid-1C604F3B8CD58FCB/calendar.html/"
     width="700"
     height="360"
    />
      </div>
    </div>
  );
}
