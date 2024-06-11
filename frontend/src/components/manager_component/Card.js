import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ClientCard = ({did, type}) => {
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
        </CardContent>
      </Box>
    </Card>
  );
}

export default ClientCard;
