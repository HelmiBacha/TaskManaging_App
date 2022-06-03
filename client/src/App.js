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
import View from './components/UserManagement/View';

import LoginScreen from "./components/Auth/screens/LoginScreen";
import RegisterScreen from "./components/Auth/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/Auth/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/Auth/screens/ResetPasswordScreen";


const App =  () => {


return(
  
<BrowserRouter>


  <Container maxWidth="xl">
    
    <Navbar />
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/home"/>}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/home/search" exact component={Home}/>
      <Route path="/home/:id" exact component={TicketDetails}/>
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
          <Route path="/admin/users/details/:id" component={View}/>
    </Switch>
  </Container>
  
</BrowserRouter>

);

};

export default App;