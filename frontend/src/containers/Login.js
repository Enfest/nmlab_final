//react import 
import {useEffect, useState} from "react";
import React from 'react';
//mui import
import {Box, Divider, TextField, Typography, Button, Alert, AlertTitle} from "@mui/material";

//hook import
import { useWebsite } from "./hooks/WebsiteContext";

//import navigate
import { useNavigate, useLocation } from "react-router-dom";

//functional component 
const Login = () => {
    //set state
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    //hook import
    const { isManager, iflog, checkManager, verifyLogin } = useWebsite();

    //navigate define
    const navigate = useNavigate();

    const info = useLocation();

    //function define
    const handleLogin = () => {
        if(!id || !name){
            return
        }
        const getLogin = verifyLogin(name, id);
        if(getLogin){
            navigate("/");
        }
        else{
            navigate("/Login");
        }

        
    }
    useEffect(()=>{
        if(iflog){
            navigate("/");
        }
    },[iflog]);


    return(
        <Box sx={{
            display: "grid",
            gap: 1,
            width: "100%",
            justifyContent: "center"
        }}>
            <Typography variant="h5" component="div" justifySelf="center">Manager Login</Typography>
            <Divider sx={{width: "100%"}}/>
            <TextField
                variant="outlined"
                label="User Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
                variant="outlined"
                label="User ID"
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
            />
            {/* {openAlert? 
            <Alert severity="error">
                <AlertTitle>{Alert}</AlertTitle>
            </Alert>:<></>} */}
            <Button 
                variant="contained" 
                disabled={!id || !name}
                onClick={()=>{handleLogin()}}
                >
                Login
            </Button>
            {/* <Button 
                onClick={()=>{navigate("/register")}}
                >
                Register
            </Button> */}
        </Box>
    )
}

//export 
export default Login;