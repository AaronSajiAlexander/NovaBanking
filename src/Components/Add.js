import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';

const AddBeneficiary = () => {
  const classes = useStyles();
  const [accountIDBeneficiary, setAccountIDBeneficiary] = useState('');
  const [name, setName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const accountIDUser = sessionStorage.getItem('accID');

  const handleAddBeneficiary = async () => {
    let response;
    try {
      if(accountIDUser === accountIDBeneficiary){
        alert("Cannot Add self as Beneficiary");
        setAccountIDBeneficiary('');
        setName('');
        setIfscCode('');
      }
      else{
      const apiUrl = 'https://naan-mudhalvan.onrender.com/v1/add';
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountIDUser,
          accountIDBeneficiary,
          name,
          ifscCode,
        }),
      });
      }

      if (response && response.ok) {
        setSuccessMessage('Beneficiary added successfully!');
        setErrorMessage('');
        setAccountIDBeneficiary('');
        setName('');
        setIfscCode('');
      } else {
        const errorData = await response.json();
        setSuccessMessage('');
        alert("Beneficiaries can be added only if they are registered with the bank. Some registered Beneficiaries are SBI0001, SBI0002, SBI0007, etc.");
        setErrorMessage(`Failed to add beneficiary. Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during beneficiary addition:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <Paper elevation={3} className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Add Beneficiary
        </Typography>
        <TextField
          label="Beneficiary Account ID"
          value={accountIDBeneficiary}
          onChange={(e) => setAccountIDBeneficiary(e.target.value)}
          fullWidth
          style={{ marginBottom: 10 }}
          required
        />
        <TextField
          label="Beneficiary Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          style={{ marginBottom: 10 }}
          required
        />
        <TextField
          label="IFSC Code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          fullWidth
          style={{ marginBottom: 20 }}
          required
        />
        {errorMessage && (
          <Typography variant="body2" color="error" className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" className={classes.successMessage}>
            {successMessage}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleAddBeneficiary}>
          Add Beneficiary
        </Button>
      </Paper>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
    position: 'relative',
  },
  hero: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: theme.spacing(8),
    textAlign: 'center',
  },
  heroTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
    marginTop: theme.spacing(8),
    maxWidth: 400,
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#333',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    color: '#f44336',
  },
  successMessage: {
    marginTop: theme.spacing(2),
    color: '#4CAF50',
  },
}));

export default AddBeneficiary;
