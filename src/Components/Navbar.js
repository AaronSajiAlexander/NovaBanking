import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; // Material-UI icon for user account

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Nova Banking</Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/home" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>About</Link>
          <Link to="/help" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>Help</Link>
          <Link to="/signout" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>Sign Out</Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
