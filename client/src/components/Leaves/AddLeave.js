import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { TextField, Button, Typography, Paper, Card } from '@material-ui/core';
import axios from 'axios';
import './addLeave.css';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";


const AddLeave = (data) => {
  const [newLeave, setnewLeave] = useState({Reason: "", start: "", end:""});
    const history = useHistory();
  console.log('this is working');
    

    const addLeave = async (newLeave) => {
        const response = await axios.post("http://localhost:4040/leave",newLeave);
        if (Response.status === 200) {
            toast.success(response.data);
        };
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newLeave.Reason || !newLeave.start || !newLeave.end ) {
            toast.error("Please provide value into each input field");
        }else{
        addLeave(newLeave);
        history.push('/leaves');
    };
    };


  return (
      <Paper style={{width: "30%"}} position="static" elevation={6}>
    <Card style={{width: "100%"}}>
    <h3>Add new leave request</h3>
    <input type="text" placeholder="Add Reason" style={{marginTop:"30px", width: "100%", marginRight: "10px" }} value={newLeave.Reason} onChange={(e) => setnewLeave({ ...newLeave, Reason: e.target.value })} />
                <DatePicker placeholderText="Start Date"  selected={newLeave.start} onChange={(start) => setnewLeave({ ...newLeave, start })} />
                <DatePicker placeholderText="End Date" style={{width:"20%"}} selected={newLeave.end} onChange={(end) => setnewLeave({ ...newLeave, end })} />
     
    
          
            
             <Button variant="contained" color="secondary" size="large" >Clear</Button>
             <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
          >
        
        Save
      </Button>
             </Card>
             
       

    </Paper>
  );
};

export default AddLeave;