//react import 
import {useEffect, useState} from "react";

//mui import
import {Box, Divider, TextField, Typography, Button, Alert, AlertTitle} from "@mui/material";

//hook import
import { useWebsite } from "./hooks/WebsiteContext";
import useBackend from "./hooks/useBackend";

//import navigate
import { useNavigate, useLocation } from "react-router-dom";

import qs from 'qs'

//functional component 
const Login = () => {
    //set state
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    //hook import
    const { checkManager, iflog, ifsend, setifsend } = useWebsite();

    //navigate define
    const navigate = useNavigate();

    const info = useLocation();

    //function define
    const handleLogin = () => {
        if(!id || !name){
            return
        }
        navigate("/")

        
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
            <Typography variant="h5" component="div" justifySelf="center">買家登入</Typography>
            <Divider sx={{width: "100%"}}/>
            <TextField
                variant="outlined"
                label="使用者名稱"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
                variant="outlined"
                label="使用者ID"
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
            />
            {openAlert? 
            <Alert severity="error">
                <AlertTitle>{Alert}</AlertTitle>
            </Alert>:<></>}
            <Button 
                variant="contained" 
                sx={{backgroundColor: "green"}}
                onClick={()=>{handleLine()}}
                >
                使用Line登入
            </Button>
            <Button 
                variant="contained" 
                disabled={!id || !name}
                onClick={()=>{handleLogin()}}
                >
                登入 / 註冊
            </Button>
        </Box>
    )
}

//export 
export default Login;