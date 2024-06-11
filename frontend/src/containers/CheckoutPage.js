//react import 
import {useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack, CardMedia, MenuItem, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//component import 

import { concerts } from "../informations/concert_information";


//router import
//hooks import
import { useWebsite } from "./hooks/WebsiteContext";
import PriceTable from "../components/PriceTable";

//functional component
const CheckoutPage = () => {

    const [option, setOption] = useState('');
    const [vc, setVC] = useState('');
    const {concert} = useWebsite();
    const specific_concert = concerts[concert-1];

    const handleContract = () => {

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
        setOption(event.target.value);
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
                            value={option}
                            label="Type"
                            onChange={handleSelect}
                        >
                            {specific_concert.tickets.map((e,index)=>(<MenuItem value={e.price}>{e.type} - {e.price} NTD</MenuItem>))}
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
                    {option} NTD
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Upload VC
                </Typography>
                <input type="file" onChange={(e) => {getFile(e.target.files[0])}} accept="img/*"></input>
                <Button sx={{width: '95%'}}
                // onClick={()=>{()=>{handle}}}
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
