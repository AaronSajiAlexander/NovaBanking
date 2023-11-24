import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const TransactionLog = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const accountID = sessionStorage.getItem('accID');

  const fetchUserTransactions = async () => {
    try {
      const apiUrl = `https://naan-mudhalvan.onrender.com/v1/transactions/${accountID}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions:', data.error);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const clearSelectedRow = () => {
    setSelectedRow(null);
  };

  return (
    <div>
      <Navbar />
      <Card style={{ margin: '20px 20px 80px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <h2>Transaction Log</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Counterparty Name</b></TableCell>
                  <TableCell><b>Counterparty ID</b></TableCell>
                  <TableCell><b>Type</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>Balance</b></TableCell>
                  <TableCell><b>Transaction Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
                  <TableRow
                    key={index}
                    style={{ backgroundColor: selectedRow === index ? '#e0e0e0' : 'white' }}
                    onClick={() => handleRowClick(index)}
                    onMouseOut={clearSelectedRow}
                  >
                    <TableCell>{transaction.cpartyName}</TableCell>
                    <TableCell>{transaction.cpartyID}</TableCell>
                    <TableCell>
                      <Typography style={{ color: getTransactionColor(transaction.transactionType) }}>
                        {transaction.transactionType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ color: getTransactionColor(transaction.transactionType) }}>
                        {transaction.transactionType === 'Deposit' ? `+ $${transaction.amount.toFixed(2)}` : `- $${transaction.amount.toFixed(2)}`}
                      </Typography>
                    </TableCell>
                    <TableCell>${transaction.balance.toFixed(2)}</TableCell>
                    <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

const getTransactionColor = (transactionType) => {
  switch (transactionType) {
    case 'Deposit':
      return 'green';
    case 'Withdraw':
      return 'red';
    case 'Transfer':
      return '#FFD700'; 
    default:
      return 'black'; 
  }
};

export default TransactionLog;
