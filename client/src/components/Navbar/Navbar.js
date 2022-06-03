import React from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import useStyles from '../Navbar/styles';
import plw from '../../images/plw.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Navbar = () =>{ 
    const user = localStorage.getItem("user");
    const classes = useStyles();
    const history = useHistory();

    const logout = () => {
      localStorage.setItem("user",'');
      localStorage.setItem("authToken",'');
      localStorage.setItem("email",'');
      history.push("/login");
      window.location.reload();

    }

return (
  <React.Fragment>
    <AppBar className={classes.appBar} position="static" color="inherit">
        <img className={classes.image} src={plw} alt="plw" heighth="1"/>
        <div className={classes.brandContainer}>

        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">Home</Typography>
        
        <Typography component={Link} to="/admin/users" className={classes.heading} variant="h6" align="center" style={{marginLeft: "300px"}}>Users Management</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          {user !==''? (
              <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.name} >{user.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={() => logout()}>Logout</Button>
              </div>
          ) : ( 
            <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
          )}
      </Toolbar>

      </AppBar>
    </React.Fragment>
      );
};

export default Navbar;