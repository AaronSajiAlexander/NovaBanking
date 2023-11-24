// Login.js
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Paper, makeStyles, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const Login = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
  const [accID, setaccID] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 // const navigate = useNavigate();

  const { login } = useAuth();
  // useEffect(() => {
  //   console.log('isLoggedIn in useEffect of login', isLoggedIn);
  //   // Redirect if isLoggedIn becomes true
  //   if (isLoggedIn) {
  //     navigate('/home');
  //   }
  // }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    const apiUrl = 'http://localhost:8080/v1/login';
  
    const requestBody = {
      accountID: accID,
      password: password,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { name } = data;
  
        sessionStorage.setItem('accID', accID);
        sessionStorage.setItem('userName', name);
  
        login();
      } else {
        setErrorMessage('Invalid accountID or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleUsernameChange = (event) => {
    setaccID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Nova Banking</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/register" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>
              Register
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Login
        </Typography>
        <TextField
          label="Account ID"
          type="text"
          value={accID}
          onChange={handleUsernameChange}
          fullWidth
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          style={{ marginBottom: 20 }}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: 'auto',
    marginTop: 20,
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#333',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    color: '#f44336',
  },
  appBar: {
    background: 'linear-gradient(135deg, rgba(19, 83, 154, 0.8), rgba(67, 203, 243, 0.8))', 
    boxShadow: 'none',
    marginBottom: theme.spacing(4),
  },
}));

export default Login;
