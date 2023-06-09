import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import idea from '../../../images/idea.png';
import { useDispatch } from 'react-redux';
import { deleteTicket, assignTicket } from '../../../actions/tickets';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';




const Ticket = ({ ticket, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const username = localStorage.getItem("user");
    

const openTicket = () => {
    localStorage.setItem("ticket",JSON.stringify(ticket));
    history.push(`/tickets/${ticket._id}`)};

    return (
        
        <Card className={classes.card} raised elevation={6}>

            <CardMedia className={classes.media} image={ticket.SelectedFile || idea } title={ticket.PSA_Number}/>
           
            
            <div className={classes.overlay}>
                <Typography variant="h6">{ticket.PSA_Number}</Typography>
                <Typography variant="body2">{moment(ticket.Due_Date).fromNow()}</Typography>
            </div>
            
            <div className={classes.overlay2}>
            {(username === ticket.Owner) && (
                <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(ticket._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            )}
            </div>
            
            
<ButtonBase className={classes.cardAction} onClick={openTicket}>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{ticket.RequestType}</Typography>
            </div>
          
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>{ticket.Description}</Typography>
                
                <Typography variant="body2" color="textSecondary">{ticket.Status}</Typography>
            </CardContent>
</ButtonBase>
          
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={ticket.Status === "Assigned"} onClick={() =>dispatch(assignTicket(ticket._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Claim
                </Button>
                {(username === ticket.Owner) && (
                <Button size="small" color="primary" onClick={() =>dispatch(deleteTicket(ticket._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
            </CardActions>

        </Card>
    );
};
export default Ticket;