//react import 
import {useState} from "react";
import React from 'react';
//mui import
import { Typography, Box, Chip, Divider, Stack, Select, MenuItem } from '@mui/material';
import ClientCard from "../components/manager_component/Card";

//component import 
import { concerts } from "../informations/concert_information";
import { useWebsite } from "./hooks/WebsiteContext";


//router import
//hooks import

//functional component
const ManagerPage = () => {

    const [concert_idx, setConcertIdx] = useState(0);
    const [concert, setConcert] = useState(concerts[0]);
    const { unsigned_contract } = useWebsite();

    // let concert = concerts[concert_idx];

    const handleSelect = (value) => {
        setConcertIdx(value);
        // console.log(value);
        // console.log(concerts[value]);
        setConcert(concerts[value]);
    }

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
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={concert_idx}
                onChange={(e) => {handleSelect(e.target.value)}}
            >
                {concerts.map((e, index) => (<MenuItem value={index}>{e.name}</MenuItem>))}
            </Select>
                {unsigned_contract.map((e)=>((concert.name === e.concert)? <ClientCard did={e.did} type={e.type} />:<></>))}
        </Box>
    )
}

//export
export default ManagerPage;
