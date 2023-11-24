// Help.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';


const Help = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleQuerySubmit = () => {
    if (query.trim() === '') {
      setErrorMessage('Please enter your query before submitting');
    } else {
      setSuccessMessage('Query submitted successfully!');
      setQuery(''); 
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
         <Navbar />
    <Paper elevation={3} className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Help Page
      </Typography>

      <div className={classes.section}>
        <Typography variant="h5">Frequently Asked Questions (FAQs)</Typography>
        <ul>
          <li>
            <strong>Q: How do I reset my password?</strong>
            <br />
            A: You can reset your password by clicking on the "Forgot Password" link on the login page.
          </li>
          <li>
            <strong>Q: How do I contact customer support?</strong>
            <br />
            A: You can reach our customer support team via email at support@novabanking.com or by phone at 123-456-7890.
          </li>
        </ul>
      </div>

      <div className={classes.section}>
        <Typography variant="h5">Contact Details</Typography>
        <p>Email: lavanyapidikiti.24cs@licet.ac.in</p>
        <p>Phone: 6383664366</p>
      </div>

      <div className={classes.section}>
        <Typography variant="h5">Submit Your Query</Typography>
        <TextField
          label="Your Query"
          multiline
          rows={4}
          value={query}
          onChange={handleQueryChange}
          fullWidth
          style={{ marginBottom: 20 }}
        />
        {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        {successMessage && <Typography variant="body2" style={{ color: 'green' }}>{successMessage}</Typography>}
        <Button variant="contained" color="primary" onClick={handleQuerySubmit}>
          Submit Query
        </Button>
      </div>
    </Paper>
    <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#fff', 
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: theme.spacing(3),
    color: '#333', 
  },
  section: {
    marginBottom: theme.spacing(4),
  },
}));

export default Help;
