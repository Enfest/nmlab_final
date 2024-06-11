//react import 
import {useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack } from '@mui/material';

//component import 

import React from 'react';

//router import
//hooks import

//functional component
const ManagerPage = () => {

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h5" component="div">
                Manager Page
            </Typography>
            <Divider />
        </Box>
    )
}

//export
export default ManagerPage;
