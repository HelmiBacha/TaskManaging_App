import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';

import { getTicket} from '../../actions/tickets';


const TicketDetails = () => {
  
  console.log('TICKET DETAILS');
    const { ticket, tickets, isLoading } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getTicket(id))
    }, [id]);

    console.log(ticket);

    if(!ticket) return console.log('no ticket');


    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em"/>
        </Paper>
    }

  return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>    
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{ticket.PSA_Number}</Typography>
          <Typography variant="h3" component="h4">{ticket.RequestType}</Typography>
          <Typography variant="h3" component="h3">{ticket.Priority}</Typography>
          <Typography gutterBottom variant="body1" component="p">{ticket.Description}</Typography>
          <Typography variant="h6">Created by: {ticket.Owner}</Typography>
          <Typography variant="h6">Status: {ticket.Status}</Typography>
          <Typography variant="body1">{moment(ticket.createdAt).fromNow()}</Typography>
          <Typography variant="body1">Due date: {ticket.Due_Date}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
        </div>
      </div>
      </Paper>

  )
}

export default TicketDetails;