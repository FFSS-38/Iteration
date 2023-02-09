import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function navBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const logout = () => {
    fetch('http://localhost:3000/user/logout', {
      method: 'GET',
      credentials: 'include',
    }).then((results) => {
      console.log('successfully logged out');
      setIsLoggedIn(false);
      navigate('/');
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'EB Garamond',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WUNDERPETS
          </Typography>
          {!isLoggedIn ? (
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'EB Garamond',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGIN
            </Typography>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={logout}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGOUT
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
