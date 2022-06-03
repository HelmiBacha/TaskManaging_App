import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tickets from '../tickets/Tickets';
import Form from '../form/Form';
import { getTickets, getTicketsBySearch } from '../../actions/tickets';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import {  useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from '../../styles';
import Pagination from '../pagination';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => 
{
    const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  
const handleKeyPress = (e) => {
  if(e.keyCode === 13) {
    //search task 13 is enter
    searchTicket();
  }
}

const handleAdd = (tag) => setTags([...tags, tag]);

const handleDelete = (tagToDelete) => setTags(tags.filter((tags) => tags !== tagToDelete));

 

  const searchTicket = () => {
   if(search.trim() || tags) {
    // dispatch something to search a task
    dispatch(getTicketsBySearch({ search, tags: tags.join(',') }))
   } else {
     history.push('/');
   }
  }
    return(
    <Grow in>
    <Container maxWidth="xl">
      <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
        <Grid item xs={12} sm={6} md={9}>
            <Tickets setCurrentId={setCurrentId} /> 
            
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField name="search" variant="outlined" label="Search Field" onKeyPress={handleKeyPress} value={search} onChange={(e) => {setSearch(e.target.value)}}/>
            <ChipInput
              style={{ margin: '10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="search tags"
              variant="outlined"
            />
            <Button onClick={searchTicket} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
          </AppBar>
            <Form currentId={currentId} setcurrentId={currentId} maxWidth="xl" />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page}/>
            </Paper>
        </Grid>
      </Grid>
     
    </Container>
  </Grow>
);
    };
export default Home;