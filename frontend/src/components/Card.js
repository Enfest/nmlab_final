import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, Grid } from '@mui/material';
import { useWebsite } from '../containers/hooks/WebsiteContext';
import { useNavigate } from 'react-router-dom';

const ConcertCard = ({name, img, sale_time, perform_time, index}) => {

  const {setConcert, iflog} = useWebsite();

  const navigate = useNavigate();

  const handleBuy = () => {
    setConcert(index+1);
    navigate("/checkout");
  }

  return (
    <Card sx={{ display: 'flex', width: "100%"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , width: '70%' }}>
        <CardContent sx={{ flex: '1 0 auto', alignItems: "end"}} >
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {perform_time}
          </Typography>
          <Typography component="div">
            Ticket Saling Time: {sale_time}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Button sx={{width: '95%'}}
                onClick={()=>{handleBuy()}}
                >Buy Ticket
                </Button>
        {/* <Grid container spacing={2} sx={{width: '100%'}}>
            <Grid item><Button>Buy Ticket</Button></Grid>
          </Grid> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '30%' }}
        src={img}
      />
    </Card>
  );
}

export default ConcertCard;
