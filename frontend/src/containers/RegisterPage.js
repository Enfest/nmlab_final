//react import 
import {useEffect, useState} from "react";

//mui import
import { Typography, Box, Chip, Divider, Stack, TextField, CardMedia, Button } from '@mui/material';

//component import 

import React from "react";
import useBackend from "./hooks/useBackend";
import { useWebsite } from "./hooks/WebsiteContext";
// import { vc_contract } from "../IOTA/vc_contract";
// import { vc_photo } from "../IOTA/vc_photo";

//router import
//hooks import

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

//functional component
const Register = () => {

    const [file, setFile] = useState();
    const [file_loc, setFileLoc] = useState();
    const [img_base64, setImg64] = useState();
    const [name, setName] = useState();
    const [birth, setBirth] = useState();
    const [id, setID] = useState();

    const { AddUser, register } = useBackend();
    const {regis} = useWebsite();

    const getFile = (file) => {
        console.log(file);
        setFileLoc(file)
        setFile(URL.createObjectURL(file));
      
        fileToDataUri(file)
        .then(dataUrl => {
            // console.log(getBase64StringFromDataURL(dataUrl));
            setImg64(getBase64StringFromDataURL(dataUrl));
            console.log(img_base64);
        })
    }

    const handleRegister = async() => {
        AddUser({
            name: name,
            id: id,
            birth: birth,
            img: img_base64
        })
        register({
            name: name,
            id: id,
            birth: birth,
            img: img_base64
        });
        // const DIDreturn = await createDID();
        // console.log(DIDreturn);
        // downloadJSON(DIDreturn.privateKey, "privateKey");

        // const VCcredReturn = await vc_contract(DIDreturn.DID, name, birth);
        // downloadJSON(VCcredReturn.credentialJwt, "VCcontract");
        // const VCphotoReturn = await vc_photo(DIDreturn.DID, img_base64, name);
        // downloadJSON(VCphotoReturn.credentialJwt, "VCphoto");
    }

    const downloadJSON = (data, fileName) => {
        const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const jsonURL = URL.createObjectURL(jsonData);
        const link = document.createElement('a');
        link.href = jsonURL;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(()=>{

    },[file, regis])

    //return
    return(
        <Box sx={{
            width: "100%",
            display: "grid",
            gap: 2
            }}>
            <Typography variant="h5" component="div">
                Register Page
            </Typography>
            <Divider />
            <Typography variant="subtitle2" component="div" color="text.secondary">Please fill out the form below to create an account</Typography>
            <Typography variant="h6" component="div" >Name:</Typography>
            <TextField id="standard-basic" label="name" variant="outlined" onChange={(e)=>{setName(e.target.value)}}/>
            <Typography variant="h6" component="div" >Birthday:</Typography>
            <TextField id="standard-basic" label="YYYY/MM/DD" variant="outlined" onChange={(e)=>{setBirth(e.target.value)}}/>
            <Typography variant="h6" component="div" >National ID:</Typography>
            <TextField id="standard-basic" label="ID Number" variant="outlined" onChange={(e)=>{setID(e.target.value)}}/>
            <Typography variant="h6" component="div" >Upload Personal Photo:</Typography>
            <input type="file" onChange={(e) => {getFile(e.target.files[0])}} accept="img/*"></input>
            {/* <Typography variant="h6" component="div" >{file}</Typography> */}
            <CardMedia component='img' src={file} />
            {/* <p>{img_base64}</p> */}
            <Button variant="contained" 
                disabled={!img_base64 || !name || !id || !birth}
                onClick={()=>{handleRegister()}}
                // color={regis? "primary":"secondary"}
                >
                Register
            </Button>
        </Box>
    )
}

//export
export default Register;
