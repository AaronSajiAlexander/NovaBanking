import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles'; 

const Profile = () => {
  const classes = useStyles(); 
  const [accID, setAccID] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const storedAccID = sessionStorage.getItem('accID');
    const storedName = sessionStorage.getItem('userName');

    setAccID(storedAccID || '');
    setName(storedName || ''); 

    // Fetch balance using the URL
    const fetchBalance = async () => {
      try {
        const apiUrl = `https://naan-mudhalvan.onrender.com/v1/balance/${storedAccID}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error('Failed to fetch account balance');
          
        }
      } catch (error) {
        console.error('Error during account balance fetch:', error);
        
      }
    };

    if (storedAccID) {
      fetchBalance();
    }
  }, [classes]); 

  return (
    <div>
      <Navbar />
      <h2>Profile Page</h2>
      <Card className={classes.container}>
        <CardContent>
          <Typography variant="h6">Account Details</Typography>
          <div>
            <label>Account ID:</label>
            <p>{accID}</p>
          </div>
          <div>
            <label>Name:</label>
            <p>{name}</p>
          </div>
          <div>
            <label>Balance:</label>
            <p>{balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}</p>
          </div>
        </CardContent>
      </Card>
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
  balance: {
    marginBottom: theme.spacing(3),
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    color: '#f44336',
  },
}));

export default Profile;
