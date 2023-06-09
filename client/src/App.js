import React from 'react';
import { Container} from '@material-ui/core';

import { ToastContainer } from "react-toastify";

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//routing
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import TicketDetails from './components/TicketDetails/TicketDetails';
import User from './components/UserManagement/User';
import AddEdit from './components/UserManagement/AddEdit';

import LoginScreen from "./components/Auth/screens/LoginScreen";
import RegisterScreen from "./components/Auth/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/Auth/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/Auth/screens/ResetPasswordScreen";


import Planning from "./components/Planning/Planning";
import Event from "./components/Event/Event";
import Leave from "./components/Leaves/Leaves";
import AddLeave from "./components/Leaves/AddLeave";

const App =  () => {


return(
  
<BrowserRouter>


  <Container maxWidth="xl">
    
    <Navbar />
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/home"/>}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/home/search" exact component={Home}/>
      <Route path="/tickets/:id" exact component={TicketDetails}/>
      <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          
          <Route path="/admin/users" component={User}/>
          <Route path="/admin/add" component={AddEdit}/>
          <Route path="/admin/add/:id" component={AddEdit}/>
          <Route path="/planning/" component={Planning}/>
          <Route path="/event/" component={Event}/>
          <Route path="/leaves" component={Leave}/>
          <Route path="/addLeave" component={AddLeave}/>
    </Switch>
  </Container>
  
</BrowserRouter>

);

};

export default App;