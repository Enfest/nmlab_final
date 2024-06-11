import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

//import Navigate
import { useNavigate, useLocation } from "react-router-dom";
import BarDrawer from './bar_component/MenuDrawer';
import { ThemeProvider } from '@emotion/react';

import theme1 from '../theme';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - 200px)`,
      marginLeft: `200px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));




export default function Bar({open, setOpen}) {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme1}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' theme={theme1} open={open}>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>{setOpen(!open)}}
                    >
                        {open? (<KeyboardDoubleArrowLeftIcon />):(<MenuIcon />)}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Heya Heya Heya
                    </Typography>
                    <Button color="inherit" onClick={()=>{navigate("/register")}}>Register</Button>
                    <Button color="inherit" onClick={()=>{navigate("/login")}}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <BarDrawer open={open} setOpen={setOpen} />
        </ThemeProvider>
    );
}
