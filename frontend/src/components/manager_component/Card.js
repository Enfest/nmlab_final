import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useState } from 'react';
import { TextField } from '@mui/material';


const ClientCard = ({did, type}) => {

  const [seat, setSeat] = useState(false);
  const handleSign = () => {

  }

  return (
    <Card sx={{ display: 'flex', width: "100%"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , width: '70%' }}>
        <CardContent sx={{ flex: '1 0 auto', alignItems: "end"}} >
          <Typography component="div" variant="h5">
            {did}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {type}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
          </Typography>
          <Typography variant="h6" component="div" color="">Seat Number:</Typography>
          <TextField sx={{ width: "100%" }} id="standard-basic" label="Seat Number" variant="outlined" onChange={(e)=>{setSeat(e.target.value)}}/>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   .
          </Typography>
          <Button variant="contained" 
                disabled = {!seat}
                onClick={()=>{handleSign()}}
                >
                Sell Seat
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

export default ClientCard;
