//react import 
import {useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack } from '@mui/material';

//component import 



//router import
//hooks import

//functional component
const PersonalPage = () => {

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h5" component="div">
                Personal Info
            </Typography>
            <Divider />
        </Box>
    )
}

//export
export default PersonalPage;
