import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarParts/CalendarHeader";
import Sidebar from "./CalendarParts/Sidebar";
import Month from "./CalendarParts/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./CalendarParts/EventModal";
import "../../components/Calendar/calendar.css";
/**
 * The calendar component function to call all 
 * the functions in calendar parts at one place.
 * @param {*} props 
 * @returns 
 */
function CalendarComp(props) {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { indexMonth, eventModalShow } = useContext(GlobalContext);
  const [isRefresh, setIsRefresh] = useState(false);
  const { state } = props.location;

  useEffect(() => {
    setCurrentMonth(getMonth(indexMonth));
  }, [indexMonth]);

 const refreshCalendar = ()=>{
    setIsRefresh(!isRefresh);
 } 

  return (
    <React.Fragment>
      {eventModalShow && <EventModal data={state} refreshCalendar={refreshCalendar} isRefresh={isRefresh} />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}
/**
 * The component is being exported as CalendarComp 
 * so that this component can be imported into other modules.
 */
export default CalendarComp;
