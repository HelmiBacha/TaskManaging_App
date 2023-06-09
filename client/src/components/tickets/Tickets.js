import React from 'react';
import { Grid, CircularProgress, Card, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Ticket from './ticket/Ticket';

import useStyles from './styles';




const Tickets = ({ setCurrentId }) => {
    const { tickets, isLoading } = useSelector((state) => state.tickets);
    const classes = useStyles();
    const token = localStorage.getItem('authToken');

    if(!tickets && !isLoading) return 'No tasks';

    if(token === '') return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                
        <Card className={classes.card} raised elevation={6}>


            <div className={classes.overlay}>
              <Typography variant="h6">Please login to consult your tasks</Typography>
              </div>
              </Card>
            </Grid>
    )

    return (
            
           isLoading ? <CircularProgress /> :  (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {tickets.map((ticket) => (
                        <Grid key={ticket._id} item xs={12} sm={12} md={6} lg={3}>
                            <Ticket ticket={ticket} setCurrentId={setCurrentId}/>

                        </Grid>
                    ))}
                </Grid>
        )
    );
};
export default Tickets;