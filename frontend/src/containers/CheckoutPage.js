//react import 
import {useState} from "react";
import React from 'react';
//mui import
import { Typography, Box, Chip, Divider, Stack, CardMedia, MenuItem, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//component import 

import { concerts } from "../informations/concert_information";
import useBackend from "./hooks/useBackend";

//router import
//hooks import
import { useWebsite } from "./hooks/WebsiteContext";
import PriceTable from "../components/PriceTable";

//functional component
const CheckoutPage = () => {

    const [index, setIndex] = useState(0);
    const [vc, setVC] = useState('');
    const [did, setDID] = useState('');
    const [privatekey, setPrivate] = useState('');
    const {concert} = useWebsite();
    const specific_concert = concerts[concert-1];
    // const [type, setType] = useState('');

    const { verify } = useBackend();

    const handleVC = (file) => {
        console.log(file);
        // console.log(file.readString());
        console.log(URL.createObjectURL(file));
        // const reader = FileReader.readAsDataURL(file);
        // console.log(reader);
        fetch(URL.createObjectURL(file))
            .then( (r) => r.json() )
            .then( (responsejson) => setVC(responsejson))
    }
    
    const handleDID = (file) => {
        console.log(file);
        // console.log(file.readString());
        console.log(URL.createObjectURL(file));
        // const reader = FileReader.readAsDataURL(file);
        // console.log(reader);
        fetch(URL.createObjectURL(file))
            .then( (r) => r.json() )
            .then( (responsejson) => setDID(responsejson))
    }

    const handlePrivate = (file) => {
        console.log(file);
        // console.log(file.readString());
        console.log(URL.createObjectURL(file));
        // const reader = FileReader.readAsDataURL(file);
        // console.log(reader);
        fetch(URL.createObjectURL(file))
            .then( (r) => r.json() )
            .then( (responsejson) => setPrivate(responsejson))
    }

    const getFile = (file) => {
        console.log(file);
        // console.log(file.readString());
        console.log(URL.createObjectURL(file));
        // const reader = FileReader.readAsDataURL(file);
        // console.log(reader);
        fetch(URL.createObjectURL(file))
            .then( (r) => r.json() )
            .then( (responsejson) => console.log(responsejson))
    }

    const handleSelect = (event) => {
        setIndex(event.target.value);
    }

    const handleContract = () => {
        // payload.DID, payload.privateKey, payload.vc
        // payload.DID, payload.concert, payload.seat, payload.price
        verify({
            concert: specific_concert.name,
            DID: did,
            privateKey: privatekey,
            vc: vc,
            seat: specific_concert.tickets[index].type,
            price: specific_concert.tickets[index].price
        })

    }

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h3" component="div">
                {specific_concert.name} Checkout
            </Typography>
            <Divider />
            <Box  sx={{ display: 'flex', width: '100%'}}>
            <Box sx={{ display: 'content', flexDirection: 'column' , width: '55%'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Performance Date
                </Typography>
                <Typography variant="h5" component="div">
                    {specific_concert.perform_time}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
                </Typography>
                {/* <Typography variant="h5" component="div">
                    Ticket Price
                </Typography> */}
                {/* <PriceTable tickets={specific_concert.tickets} /> */}
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ticket Select
                </Typography>
                <Typography variant="h5" component="div">
                    <FormControl sx={{width: '95%'}}>
                        <InputLabel id="demo-simple-select-label">type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={index}
                            label="Type"
                            onChange={handleSelect}
                        >
                            {specific_concert.tickets.map((e,index)=>(<MenuItem value={index}>{e.type} - {e.price} NTD</MenuItem>))}
                        </Select>
                    </FormControl>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Price
                </Typography>
                <Typography variant="h5" component="div">
                    {specific_concert.tickets[index].price} NTD
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Upload VC
                </Typography>
                <input type="file" onChange={(e) => {handleVC(e.target.files[0])}} ></input>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Upload DID
                </Typography>
                <input type="file" onChange={(e) => {handleDID(e.target.files[0])}} ></input>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Upload Private Key
                </Typography>
                <input type="file" onChange={(e) => {handlePrivate(e.target.files[0])}} ></input>
                
                <Button sx={{width: '95%'}}
                onClick={()=>{handleContract()}}
                >Create Contract
                </Button>
            </Box>
            <CardMedia sx={{width: '45%'}}
                component="img"
                src={specific_concert.seat_img}
                
                ></CardMedia>
            </ Box>
        </Box>
    )
}

//export
export default CheckoutPage;
