//react import 
import {useEffect, useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack, TextField, Button } from '@mui/material';
import React from 'react';
//component import 

import useBackend from "./hooks/useBackend";

import { useWebsite } from "./hooks/WebsiteContext";


//router import
//hooks import

//functional component
const GetIn = () => {

    const [photo, setPhoto] = useState('');

    const {validate} = useWebsite;

    useEffect(()=>{

    },[validate])
    const {getIn} = useBackend();

    const handlePhoto = (file) => {
        console.log(file);
        // console.log(file.readString());
        console.log(URL.createObjectURL(file));
        // const reader = FileReader.readAsDataURL(file);
        // console.log(reader);
        fetch(URL.createObjectURL(file))
            .then( (r) => r.json() )
            .then( (responsejson) => setPhoto(responsejson))
    }

    const handleValidate = () => {
        getIn({
            vc: photo
        });
    }

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h5" component="div">
                Concert Validation
            </Typography>
            <Divider />
            <Typography variant="subtitle2" component="div" color="text.secondary">Please upload your photo vc to get in to the contract.</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Upload Photo VC
            </Typography>
            <input type="file" onChange={(e) => {handlePhoto(e.target.files[0])}} ></input>
            <Button variant="contained" 
                disabled={!photo}
                onClick={()=>{handleValidate()}}
                color={validate? "primary":"secondary"}
                >
                Validate
            </Button>
            <Typography variant="subtitle2" component="div" color="text.secondary">{validate}</Typography>
            
        </Box>
    )
}

//export
export default GetIn;
