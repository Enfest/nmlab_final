import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useWebsite } from "./containers/hooks/WebsiteContext";
import { styled } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";

import Box from '@mui/material/Box';

import Bar from "./components/Bar.js";
import MainPage from "./containers/MainPage.js";
import Login from './containers/Login.js';
import ManagerPage from './containers/ManagerPage.js';
import { Main, DrawerHeader } from './components/bar_component/BarDrawer.js';

import theme from './theme.js';


function App() {

  const [open, setOpen] = useState(false);
  const {iflog, isManager} = useWebsite();

  return (
    <ThemeProvider theme={theme} >
    <Router>
      <Box> 
        <Bar open={open} setOpen={setOpen}></Bar>
        <Main open={open}>
          <DrawerHeader>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/manager" element={(isManager)? <ManagerPage />:<Login />} />
            </Routes>
          </DrawerHeader>
        </Main>
      </Box>
    </Router>
    </ThemeProvider>
    
  );
}

export default App;
