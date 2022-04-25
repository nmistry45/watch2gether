import React, { useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { Button, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import AuthContext from "../../../context/AuthContext";
/**
 * Function to create a new instance of event modal dialog box to add event.
 * The function contains a form to take the inputs of movie title to be added to calendar
 * @param {*} props The parameters include the movie or show title to be added to calendar
 * @returns It returns the component to add or shhow event.
 */
export default function EventModal(props) {
  const { user } = useContext(AuthContext);
  const { eventModalShow,seteventModalShow, selectedDay, currentSelectEvent } =
    useContext(GlobalContext);

  // Set title variable to add title in event
  const [title, setTitle] = useState(currentSelectEvent ? currentSelectEvent.title : "");

  // Add event function
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      day: selectedDay.valueOf(),
      id: currentSelectEvent ? currentSelectEvent.id : Date.now(),
      user_email: user.user.email,
      movie_show_id: props.data.id
    };
    if (calendarEvent) {
      calendarEvent.movie_show_id = props.data.id;
      calendarEvent.poster_url = props.data.poster_path;
      const watchGroupURL = `${BACKEND_URL}/wg/watchGroup`;
      axios.post(watchGroupURL, calendarEvent).then((res) => {
        seteventModalShow(false);  
        console.log(res)});
    }
    if (currentSelectEvent) {
      if(!eventModalShow){ 
      }
      props.refreshCalendar();
    }
  }

  return (
    // UI for dialog box to add event
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-black rounded-lg shadow-2xl w-2/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            Add Event
          </span>
          <div>
            <Button onClick={() => seteventModalShow(false)}>
              <span>close</span>
            </Button>
          </div>
        </header>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography marginTop={5} textAlign={"center"}>
              Date : {selectedDay.format("dddd, MMMM DD")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography marginLeft={1} marginTop={2.4} textAlign={"left"}>
              Enter Title:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              style={{ width: "95%" }}
              id="filled-basic"
              variant="filled"
              type="text"
              value={title}
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        </Grid>
        <footer className="flex justify-end border-t p-3 mt-5">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </Button>
        </footer>
      </form>
    </div>
  );
}
