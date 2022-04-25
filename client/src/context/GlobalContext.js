import React from "react";
/**
 * The constant variable for global access of the events
 */
const GlobalContext = React.createContext({
  indexMonth: 0,
  setIndexMonth: (index) => { },
  selectedDay: null,
  setselectedDay: (day) => { },
  eventModalShow: false,
  seteventModalShow: () => { },
  calendarEventDispatch: ({ type, payload }) => { },
  eventsSaved: [],
  currentSelectEvent: null,
  setcurrentSelectEvent: () => { },
  labelSet: () => { },
  labels: [],
  labelUpdate: () => { },
  eventsFiltered: []
});
/**
 * The context is being exported as GlobalContext 
 * so that this context can be imported into other modules.
 */
export default GlobalContext;
