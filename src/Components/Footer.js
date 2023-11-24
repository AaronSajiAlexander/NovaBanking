import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icons: {
    color: 'white',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Nova Banking
        </Typography>
        <div>
          <IconButton className={classes.icons} href="https://github.com/JamesWayne69/NM-LICET-GROUP10" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </IconButton>
          <IconButton className={classes.icons} href="https://www.linkedin.com/in/lavanya-pidikiti-0079b2214/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
