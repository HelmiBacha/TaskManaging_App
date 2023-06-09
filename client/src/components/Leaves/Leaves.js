import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper, Card, Grid } from '@material-ui/core';
import useStyles from '../form/styles';
import {Link} from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";
import './Leaves.css';

import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

function Leaves() {
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(()=> {
        getLeaves();
    }, []); 

    const getLeaves = async () => {
        const response = await axios.get("http://localhost:4040/leave");
        console.log(response);
        if(response.status === 200) {
            setData(response.data);
        }
    };

    
    const onDeleteLeave = async (id) => {
        if(window.confirm("are you sure that you wanted to delete this leave request?")) {
           const response = await axios.delete(`http://localhost:4040/leave/${id}`)
           if(response.status === 200) {
               history.push('/leaves');
                window.location.reload();
           }
        }
    }

    const token = localStorage.getItem('authToken');
    if(token === '') return (
        <Grid container alignItems="stretch" spacing={3}>
                
        <Card  raised elevation={6}>


            <div className={classes.overlay}>
              <Typography variant="h6">Please login to consult your leaves</Typography>
              </div>
              </Card>
            </Grid>
    )

  return (
                
                 <Paper style={{marginTop:"150px"}}>
                      <Link to="/addLeave">
                                <Button variant="contained" color="primary" size="large">
                            Add a leave request
                        </Button>
                        </Link>
                    <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>ID</th>
                            <th style={{textAlign: "center"}}>Reason</th>
                            <th style={{textAlign: "center"}}>Status</th>
                            <th style={{textAlign: "center"}}>Start Date</th>
                            <th style={{textAlign: "center"}}>End Date</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((data) => {
                            console.log(data);
                            return (
                                <tr key={data._id}>
                                    <th scope="row">{data._id}</th>
                                    <td>{data.Reason}</td>
                                    <td>{data.Status}</td>
                                    <td>{data.start}</td>
                                    <td>{data.end}</td>
                                    <td>
                                    <Link to={`/leaves`}>
                             <Button
                                variant="contained"
                                color="primary"
                                
                            >Confirm</Button>
                                </Link>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick= {() => onDeleteLeave(data._id)}
                                            startIcon={<DeleteIcon />}
                                        >Delete</Button>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </Paper>
                
        
                 )
}

export default Leaves;