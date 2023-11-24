import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Card, CardContent, Grid, Box } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-google-charts'; 

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const accID = sessionStorage.getItem('accID');
  const [accountBalance, setAccountBalance] = useState(null);
  const userName = sessionStorage.getItem('userName');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      const fetchAccountBalance = async () => {
        try {
          const apiUrl = `https://naan-mudhalvan.onrender.com/v1/balance/${accID}`;
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            setAccountBalance(data.balance);
          } else {
            console.error('Failed to fetch account balance');
          }
        } catch (error) {
          console.error('Error during account balance fetch:', error);
        }
      };

      const fetchUserTransactions = async () => {
        try {
          const apiUrl = `https://naan-mudhalvan.onrender.com/v1/transactions/${accID}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (response.ok) {
            const countTransactions = (type) => {
              return data.filter((transaction) => transaction.transactionType === type).length;
            };

            // Generate chartData array
            const newChartData = [
              ['Transaction Type', 'Number'],
              ['Deposits', countTransactions('Deposit')],
              ['Withdrawals', countTransactions('Withdraw')],
              ['Transfers', countTransactions('Transfer')],
            ];

            setChartData(newChartData);
          } else {
            console.error('Failed to fetch transactions:', data.error);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };

      fetchAccountBalance();
      fetchUserTransactions(); // Call the function to fetch user transactions
    }
  }, [isLoggedIn, navigate, accID]);

  const chartCardStyle = {
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px', 
    padding: '20px', 
  };

  const cardStyle = {
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    margin: '0 auto 20px auto'
    
  };


  

  return (
    <div>
      <Navbar />

      <Container style={{ paddingBottom: '20px', position: 'relative' }}>
        <h2 style={{ marginTop: 20 }}> Welcome to Nova Banking, {userName || 'Guest'}</h2>

        <Box mt={2} mb={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
        <Card style={chartCardStyle}>
          <Typography variant="h6">Transaction Summary</Typography>
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              chartArea: { width: '80%' }, 
              hAxis: {
                title: 'Number',
                minValue: 0,
              },
              vAxis: {
                title: 'Transaction Type',
              },
            }}
          />
        </Card>
        </Grid>
        <Grid item xs={12} md={2}>
              <Card component={Link} to="./transaction-log" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6">Account Balance</Typography>
                  <Typography variant="h4">${accountBalance !== null ? accountBalance.toFixed(2) : 'Loading...'}</Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        </Box>
        <br></br>
        <br></br>
        <Box mt={2} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Card component={Link} to="./add" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6">Add Beneficiary</Typography>
                  <Typography variant="body2">Click here to add a new beneficiary</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card component={Link} to="./withdraw" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6">Withdraw</Typography>
                  <Typography variant="body2">Withdraw funds from your account</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card component={Link} to="./deposit" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6">Deposit</Typography>
                  <Typography variant="body2">Deposit funds into your account</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card component={Link} to="./transfer" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6">Transfer Money</Typography>
                  <Typography variant="body2">Transfer money to another account</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
};

export default Home;