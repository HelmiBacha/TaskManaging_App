import React, { useState } from 'react'
import {Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from "date-fns/parse";
import startOfWeek from "date-fns/getDay";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import useStyles from './Styles';

import { Grid, CircularProgress, Card, Typography, Button } from '@material-ui/core';



const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const events = [
    {
        title: "Shift matin 'Helmi'",
        allDay: true,
        start: new Date(2022,6,4),
        end: new Date(2022,6,4),
    },
    {
        title: "Shift soir 'Amine'",
        allDay: true,
        start: new Date(2022,6,4),
        end: new Date(2022,6,4),
    },
    {
        title: "Shift matin 'Helmi'",
        allDay: true,
        start: new Date(2022,6,3),
        end: new Date(2022,6,3),
    },
];




function Event() {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end:""});
    const [allEvents, setAllEvents] = useState(events);
    const classes = useStyles();

    function handleAddEvent() {
        
    const role = localStorage.getItem('role');
    
        if(role === 'IRT')
        {
        setAllEvents([...allEvents, newEvent]);
    }else{
        window.alert('You are not an IRT member you don"t have permission to add an event');
    };

    }

    const token = localStorage.getItem('authToken');
    if(token === '') return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                
        <Card className={classes.card} raised elevation={6}>


            <div className={classes.overlay}>
              <Typography variant="h6" style={{marginTop: "30px"}}>Please login to consult your plannings</Typography>
              </div>
              </Card>
            </Grid>
    )

  return (
      <Grid>
   <Card className={classes.card}>
   
       <h4>   &nbsp; &nbsp;Add new event</h4>
       <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date"  selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" style={{width:"20%"}} selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large"  onClick={handleAddEvent}>
                    Add Event
                </Button>
            </div>
           
           
       <h1>Calendar</h1>
           
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}}/>
    </Card>
    </Grid>
  )
}

export default Event