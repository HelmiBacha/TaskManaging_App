import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
 
import useStyles from './styles';
import { createTicket, updateTicket } from '../../actions/tickets'




const Form = ({ currentId, setCurrentId }) => {
    const username = localStorage.getItem("user");
    console.log(username);

    const [ticketData, setTicketData] = useState({PSA_Number: '', Owner: username, RequestType: '', Description: '', Priority: '', comments:'', Due_Date: '', selectedFile:'' });
    const updTickets = useSelector((state) => state.tickets); //i needed to destructure it cuz state.tickets.find didn't work
    console.log(updTickets);
    const ticket = useSelector((state) => (currentId ? updTickets.tickets.find((p) => p._id === currentId) : null ));
    console.log(ticket);
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        if(ticket) setTicketData(ticket);
    }, [ticket]);

    const clear = () => {
        currentId = null;
        setTicketData({PSA_Number: '', Owner: username, RequestType: '', Description: '', Priority: '',comments: '', Due_Date: '',selectedFile:'' })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId) {
            dispatch(updateTicket(currentId, ticketData))
            clear();
        }else {
            dispatch(createTicket(ticketData))
            clear();
        }
        
    }

    if(username === ''){
        return(
            <Paper className={classes.papaer}>
                <Typography variant="h6" align="center">Can you please login to manage your tasks</Typography>
                
            </Paper>
        )
    }


    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a request</Typography>
                <TextField 
                    name="PSA_Number" 
                    variant="outlined" 
                    label="PSA Number" 
                    fullWidth
                    value={ticketData.PSA_Number}
                    onChange={(e) => setTicketData({ ...ticketData, PSA_Number: e.target.value})}
                />
                <TextField 
                    name="Owner" 
                    variant="outlined" 
                    label="Owner" 
                    fullWidth
                    value={ticketData.Owner}
                    onChange={(e) => setTicketData({ ...ticketData, Owner: e.target.value})}
                />
                <TextField 
                    name="RequestType" 
                    variant="outlined" 
                    label="Request Type" 
                    fullWidth
                    value={ticketData.RequestType}
                    onChange={(e) => setTicketData({ ...ticketData, RequestType: e.target.value})}
                />
           
            <TextField 
                    name="Description" 
                    variant="outlined" 
                    label="Description" 
                    fullWidth
                    value={ticketData.Description}
                    onChange={(e) => setTicketData({ ...ticketData, Description: e.target.value})}
                />
                  <TextField 
                    name="Priority" 
                    variant="outlined" 
                    label="Priority (P1 to P4)" 
                    fullWidth
                    value={ticketData.Priority}
                    onChange={(e) => setTicketData({ ...ticketData, Priority: e.target.value})}
                />
                  <TextField 
                    name="comments" 
                    variant="outlined" 
                    label="Comments" 
                    fullWidth
                    multiline 
                    rows={4}
                    value={ticketData.comments}
                    onChange={(e) => setTicketData({ ...ticketData, comments: e.target.value})}
                />
                <TextField 
                    name="Due_Date" 
                    variant="outlined" 
                    label="Due Date" 
                    fullWidth
                    value={ticketData.Due_Date}
                    onChange={(e) => setTicketData({ ...ticketData, Due_Date: e.target.value})}
                />
                <div className={classes.fileInput}> 
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setTicketData({ ...ticketData, selectedFile: base64 })}
                    />
                </div>
                
                 <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                 <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
             </form>
        </Paper>
    );
};
export default Form;