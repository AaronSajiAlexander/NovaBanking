import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';
import Footer from './Footer';
import { AppBar, Toolbar } from '@material-ui/core';
import emailjs from 'emailjs-com';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formRef = useRef(); 

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    const apiUrl = 'https://naan-mudhalvan.onrender.com/v1/signup';  
  
    const requestBody = {
      name,
      password,
      phoneNumber,
      email
    };
    console.log('req body',requestBody);
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
    } else if (name.trim() === '') {
      setErrorMessage('name is required');
    } else if (!validatePassword(password)) {
      setErrorMessage('Invalid password. It should be at least 8 characters and contain a digit and a special character.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
        
          const result = await response.json();

          alert('Registration successful! Check mail, even in Spam');
          emailjs.send(
            'service_xzjqmh9',
            'template_p8se0ds',
            { to_email: email, accountID: result.accountID , name: name},
            'AWDuQoVztkKWb49RS'
          )
            .then((result) => {
              console.log(result.text);
              navigate('/');
            })
            .catch((error) => {
              console.log(error.text);
            });
          navigate('/'); 
        } else {
          const errorResponse = await response.json();
  
          console.error('Registration failed:', errorResponse);
  
          if (errorResponse.code === 204 && errorResponse.level === 'ERROR') {
            setErrorMessage('Phone Number Already Exists');
          }
          else if (errorResponse.code === 205 && errorResponse.level === 'ERROR') {
           
            setErrorMessage('Email ID Already Exists');
          }  
          else {
            setErrorMessage('Registration failed. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage('An error occurred during registration. Please try again.');
      }

      //console.log('User Details:', userDetails);
      //alert('Registration successful!');

      
    }
  };

  const handleEmailChange = (event) => {
    //validateEmail(event.target.value);
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => { 
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
   // validatePassword(event.target.value);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Nova Banking</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/" style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>Login</Link>
          </div>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Registration Page
        </Typography>
        <form ref={formRef}>
          <TextField
            label="Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Name"  
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="Phone Number"  
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
        </form>
        {errorMessage && (
          <Typography variant="body2" color="error" className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Paper>
      <Footer />
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
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#333',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    color: '#f44336',
  },
}));

export default Register;
