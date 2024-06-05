import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useWebsite } from "./containers/hooks/WebsiteContext";

import Box from '@mui/material/Box';

import Bar from "./components/Bar.js";
import MainPage from "./containers/MainPage.js";

function App() {

  const [open, setOpen] = useState(false);
  // const {iflog, isManager} = useWebsite();

  return (
    <Router>
      <Box> 
        <Bar></Bar>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/manager" element={(isManager)? <ManagerPage />:<Login />} /> */}
        </Routes>
      </Box>
    </Router>
    
  );
}

export default App;
