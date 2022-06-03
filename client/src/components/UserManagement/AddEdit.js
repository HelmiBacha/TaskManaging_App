import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";



const initialState = {
    name: "",
    firstName: "",
    username: "",
    email: "",
    password: "",
    role: ""
};

const AddEdit = (data) => {
    const [state, setState] = useState(initialState);
    const { name, firstName, username, email, role } = state;
    const history = useHistory();

    console.log(window.location.pathname);
    const id = window.location.pathname.split("/");
    console.log(id);
    const _id = id[3];
    console.log(_id);
    useEffect(() => {
        if(_id) {
            getSingleUser(_id);
        };
    }, [_id]);

    const getSingleUser = async (_id) => {
        
            const response = await axios.get(`http://localhost:4040/admin/users/${_id}`);
            console.log(response);
            if(response.status === 200) {
                setState({...response.data});
            };
    };

    const addUser = async (data) => {
        const response = await axios.put(`http://localhost:4040/admin/users/${_id}`,data);
        if (Response.status === 200) {
            toast.success(response.data);
        };
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !firstName || !username || !email || !role) {
            toast.error("Please provide value into each input field");
        }else{
        addUser(state);
        history.push('/admin/users');
    };
    };


const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name]: value});
};


  return (
    <div style={{marginTop: "150px"}}>
        <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter Name ..." onChange={handleInputChange} value={name}/>
            <label htmlFor="name">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter First name ..." onChange={handleInputChange} value={firstName}/>
            <label htmlFor="name">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username ..." onChange={handleInputChange} value={username}/>
            <label htmlFor="name">Email</label>
            <input type="text" id="email" name="email" placeholder="Enter email ..." onChange={handleInputChange} value={email}/>
            <label htmlFor="name">Role</label>
            <input type="text" id="role" name="role" placeholder="Enter role ..." onChange={handleInputChange} value={role}/>
        </form>
        <Button
        style={{marginLeft: "1000px"}}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>

    </div>
  );
};

export default AddEdit