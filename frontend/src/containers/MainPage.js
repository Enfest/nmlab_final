import ConcertCard from "../components/Card.js";
import EventCard from "../components/Card.js"
import Box from '@mui/material/Box';

import {concerts} from "../informations/concert_information.js";
import { Grid } from "@mui/material";
import React from 'react';

const MainPage = () => {

    return(
        <Box sx = {{ width: "100%", alignContent: "space-around"}}>
            <Grid container spacing={2}>
            {concerts.map((concert, index) => (
                <Grid item xs={6}>
                    <ConcertCard name={concert.name} img={concert.img} sale_time={concert.sale_time} perform_time={concert.perform_time} index={index}/>
                </Grid>))}
            </Grid>
        </Box>
        // <EventCard />
    )

}

export default MainPage;