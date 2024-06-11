//react import 
import {useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack, TextField, Button } from '@mui/material';
import React from 'react';
//component import 



//router import
//hooks import

//functional component
const FindPage = () => {

    const [did, setDid] = useState('');

    const handleFind = () => {
        
    }

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h5" component="div">
                Find Contract
            </Typography>
            <Divider />
            <Typography variant="subtitle2" component="div" color="text.secondary">Please fill out the form below to find your contracts.</Typography>
            <Typography variant="h6" component="div" >DID:</Typography>
            <TextField id="standard-basic" label="DID" variant="outlined" onChange={(e)=>{setDid(e.target.value)}}/>
            <Button variant="contained" 
                disabled={!did}
                onClick={()=>{handleFind()}}
                >
                Find Contract
            </Button>
        </Box>
    )
}

//export
export default FindPage;
