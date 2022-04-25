import React, { useState, useEffect, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import axios from "axios";
import { BACKEND_URL } from "../config/index";

/**
 * The function creates the wrapper for contexts that contain
 * all the event detail and the events data.
 * @param {*} props
 * @returns The map of saved events and the events data
 */
export default function ContextWrapper(props) {
  const [indexMonth, setIndexMonth] = useState(dayjs().month());
  const [selectedDay, setselectedDay] = useState(dayjs());
  const [eventModalShow, seteventModalShow] = useState(false);
  const [currentSelectEvent, setcurrentSelectEvent] = useState(null);
  const [labels, labelSet] = useState([]);
  const [eventsSaved, setEventSaved] = useState([]);
  //  const user = localStorage.getItem(user);
  //  console.log("userrrrr",user);

  /**
   * The function to create a wrapper to render the
   * saved events an to wrap all the events.
   * @param {*} state The parameter state defines
   * the state of the event such as open or closed
   * @param {*} param1
   * @returns The function returns the state or an error if any
   */
  // useEffect(()=>{
  //   axios.post(`${BACKEND_URL}/wg/fetchWatchGroupByUserID`, {email:"tm@gmail.com"}).then(res=>{
  //   setEventSaved(res.data.data);
  // });
  // },[])

  const eventsFiltered = useMemo(() => {
    return eventsSaved.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [eventsSaved, labels]);

  useEffect(() => {
    labelSet((prevLabels) => {
      return [...new Set(eventsSaved.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [eventsSaved]);

  useEffect(() => {
    if (!eventModalShow) {
      setcurrentSelectEvent(null);
      axios
        .post(`${BACKEND_URL}/wg/fetchWatchGroupByUserID`, {
          email: "tm@gmail.com",
        })
        .then((res) => {
          setEventSaved(res.data.data);
        });
    }
  }, [eventModalShow]);

  function labelUpdate(label) {
    labelSet(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        indexMonth,
        setIndexMonth,
        selectedDay,
        setselectedDay,
        eventModalShow,
        seteventModalShow,
        currentSelectEvent,
        setcurrentSelectEvent,
        eventsSaved,
        labelSet,
        labels,
        labelUpdate,
        eventsFiltered,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
