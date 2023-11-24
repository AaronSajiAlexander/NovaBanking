// Import createRef from React
import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  makeStyles,
  Select,
} from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';

const Transfer = () => {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [errorMessage] = useState('');
  const [currentBalance, setCurrentBalance] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [accountID, setAccountID] = useState('');
  const [transferResult, setTransferResult] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const accID = sessionStorage.getItem('accID');
  // Use createRef to create a ref
  const receiverSelectRef = useRef(null);

  useEffect(() => {
    // Fetch account balance
    const fetchAccountBalance = async () => {
      try {
        const balanceUrl = `https://naan-mudhalvan.onrender.com/v1/balance/${accID}`;
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

    // Fetch beneficiary data
    const fetchBeneficiaries = async () => {
      try {
        const apiUrl = `https://naan-mudhalvan.onrender.com/v1/beneficiaries/${accID}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setBeneficiaries(data);
        } else {
          console.error('Failed to fetch beneficiaries');
        }
      } catch (error) {
        console.error('Error during beneficiary fetch:', error);
      }
    };

    fetchBeneficiaries();
  }, [accID]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleReceiverChange = (event) => {
    const selectedBeneficiary = beneficiaries.find(
      (beneficiary) => beneficiary.accountID_Beneficiary === event.target.value
    );
    setReceiverName(selectedBeneficiary ? selectedBeneficiary.name : '');
    setAccountID(event.target.value);
  };

  // Inside the Transfer component

const handleTransfer = async () => {
    try {
      const apiUrl = `https://naan-mudhalvan.onrender.com/v1/transfer/${accID}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderName,
          receiverName,
          accountID: accountID,
          amount: parseFloat(amount),
        }),
      });
  
      const statusCode = response.status;
  
      if (statusCode === 200) {
        const result = await response.json();
        setTransferResult(result);
  
        // Print success message to the user
        console.log(`Transfer successful. Status Code: ${statusCode}`);
        
        // Manually update the current balance
        const newBalance = parseFloat(currentBalance) - parseFloat(amount);
        alert(`Transfer successful! New Balance: $${newBalance.toFixed(2)}`);
        setCurrentBalance(newBalance);
  
        // Reset input fields
        setAmount('');
        setSenderName('');
        setReceiverName('');
        setAccountID('');
      } else {
        const errorData = await response.json();
        console.error(`Transfer failed. Status Code: ${statusCode}, Error:`, errorData.error);
        setTransferResult(null);
      }
    } catch (error) {
      console.error('Error during transfer:', error);
      setTransferResult(null);
    }
  };
  

  return (
    <div>
      <Navbar />
      <Paper elevation={3} className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Transfer Page
        </Typography>
        <Typography variant="subtitle1" className={classes.balance}>
          Account Balance: ${currentBalance !== null ? currentBalance.toFixed(2) : 'Loading...'}
        </Typography>
        <TextField
          label="Sender Name"
          value={senderName}
          onChange={handleSenderNameChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <Select
  labelId="receiver-label"
  id="receiver"
  value={accountID}
  onChange={handleReceiverChange}
  fullWidth
  native  
  ref={receiverSelectRef} 
  style={{ marginBottom: 10 }}
>
  {beneficiaries.map((beneficiary) => (
    <option key={beneficiary.accountID_Beneficiary} value={beneficiary.accountID_Beneficiary}>
      {beneficiary.name} ({beneficiary.accountID_Beneficiary})
    </option>
  ))}
</Select>
        <TextField
          label="Receiver Name"
          value={receiverName}
          fullWidth
          disabled
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          style={{ marginBottom: 20 }}
        />
        {errorMessage && <Typography variant="body2" color="error" className={classes.errorMessage}>{errorMessage}</Typography>}
        <Button variant="contained" color="primary" onClick={handleTransfer}>
          Transfer
        </Button>
        {transferResult && (
          <Typography variant="body2" className={classes.successMessage}>
            {transferResult.message}
          </Typography>
        )}
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
  successMessage: {
    marginTop: theme.spacing(2),
    color: '#4CAF50',
  },
}));

export default Transfer;
