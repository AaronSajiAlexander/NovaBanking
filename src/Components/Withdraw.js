import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';

const Withdraw = () => {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentBalance, setCurrentBalance] = useState(null);
  const [accID, setAccID] = useState('');

  useEffect(() => {
    const storedAccID = sessionStorage.getItem('accID');
    if (storedAccID) {
      setAccID(storedAccID);
      const fetchAccountBalance = async () => {
        try {
          const balanceUrl = `https://naan-mudhalvan.onrender.com/v1/balance/${storedAccID}`;
          const balanceResponse = await fetch(balanceUrl);
          if (balanceResponse.ok) {
            const balanceData = await balanceResponse.json();
            setCurrentBalance(balanceData.balance);
          } else {
            console.error('Failed to fetch account balance');
          }
        } catch (error) {
          console.error('Error during account balance fetch:', error);
          
        }
      };

      fetchAccountBalance();
    } else {
      console.error('Acc ID not found in session storage');
    }
  }, []); 

  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setErrorMessage('Please enter a valid positive amount');
    } else if (withdrawalAmount > currentBalance) {
      setErrorMessage('Insufficient funds');
    } else {
      try {
        const apiUrl = `https://naan-mudhalvan.onrender.com/v1/${accID}/WITHDRAW/${withdrawalAmount}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const newBalance = currentBalance - withdrawalAmount;
          setCurrentBalance(newBalance);
          setAmount('');
          setErrorMessage('');

          alert(`Withdrawal of $${withdrawalAmount} successful!\nNew Balance: $${newBalance}`);
        } else {
          setErrorMessage('Withdrawal failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during withdrawal:', error);
        setErrorMessage('An error occurred during withdrawal. Please try again.');
      }
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Paper elevation={3} className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Withdraw Page
        </Typography>
        <Typography variant="subtitle1" className={classes.balance}>
          Account Balance: ${currentBalance !== null ? currentBalance.toFixed(2) : 'Loading...'}
        </Typography>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          style={{ marginBottom: 20 }}
        />
        {errorMessage && <Typography variant="body2" color="error" className={classes.errorMessage}>{errorMessage}</Typography>}
        <Button variant="contained" color="primary" onClick={handleWithdraw}>
          Withdraw
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

export default Withdraw;
