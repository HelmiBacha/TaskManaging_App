import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';

import { Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {Link} from 'react-router-dom';
import "./User.css";
import axios from "axios";

const User = () => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        getUsers();
    }, []); 

    const getUsers = async () => {
        const response = await axios.get("http://localhost:4040/admin/users");
        if(response.status === 200) {
            setData(response.data);
        }
    };

  
    
     const onDeleteUser = async (id) => {
         if(window.confirm("are you sure that you wanted to delete that user?")) {
            const response = await axios.delete(`http://localhost:4040/admin/users/${id}`)
            if(response.status === 200) {
                getUsers();
            }
         }
     }

    
    console.log(data);

    const role = localStorage.getItem('role');
    if(role !== 'Admin') return (
        <Grid  container alignItems="stretch" spacing={3}>
                
        <Card  raised elevation={6}>


            <div >
              <Typography variant="h6">You don't have permission to access this page</Typography>
              </div>
              </Card>
            </Grid>
    )

  return (
    
    <div style={{marginTop: "150px"}}>
        <div >
            <Link to='/register'>
        <Button variant="contained" color="primary" size="large">
    Add User
  </Button>
  </Link>
        </div>
     
  
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>ID</th>
                    <th style={{textAlign: "center"}}>Name</th>
                    <th style={{textAlign: "center"}}>First Name</th>
                    <th style={{textAlign: "center"}}>Username</th>
                    <th style={{textAlign: "center"}}>Email</th>
                    <th style={{textAlign: "center"}}>Role</th>
                    <th style={{textAlign: "center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.user?.map((user) => {
                    console.log(user);
                    return (
                        <tr key={user._id}>
                            <th scope="row">{user._id}</th>
                            <td>{user.name}</td>
                            <td>{user.firstName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/admin/add/${user._id}`}>
                             <Button
                                variant="contained"
                                color="primary"
                                
                            >Update</Button>
                                </Link>
                                <Link to={`/admin/users/delete/${user._id}`}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick= {() => onDeleteUser(user._id)}
                                    startIcon={<DeleteIcon />}
                                >Delete</Button>
                                 </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    </div>
  );
};

export default User;