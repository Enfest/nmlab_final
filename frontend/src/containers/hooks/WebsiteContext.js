import { useContext, createContext, useState, useEffect } from 'react'
import client from './wsConnect';
import RPIclient from './rpiConnect';
import PYclient from './pythonConnect';
import React from 'react';


const WebsiteContext = createContext({
    checkManager:   false,
    isManager:      false,
    verifyLogin:    {},
    concert:        0,
    unsigned_contract: [],
    status:         "",
    validate:       false,
    regis:       true
})
const Managers =[
    {
        name: "Cs",
        id: "B10901099"
    }
]

const RPIsendData =  async(data) =>{
    if(RPIclient.readyState===client.OPEN){
        console.log("Stringfy: ", JSON.stringify(data));
        await RPIclient.send(JSON.stringify(data));
        //console.log('data send. data:', JSON.stringify(data));
    }
};

const WebsiteProvider = (props) => {
    const [isManager, setIsManager]     = useState(false);
    const [iflog, setIflog]             = useState(false);
    const [concert, setConcert]         = useState(0);
    const [unsigned_contract, setUnsignedContract] = useState([]);
    const [status, setStatus] = useState("Register");
    const [regis, setRegister] = useState(true);
    const [validate, setValidate] = useState(false);
    const checkManager = (input_name, id) => {
        const getName = Managers.find(({name})=>(name===input_name));
        if(!getName){
            setIsManager(false);
           return false
        }
        if(getName.id === id){
            setIsManager(true);
            return true
        }
        else{
            setIsManager(false);
            return false
        }

    }

    const sendStringToServer = async (img1, img2) => {
        try {
          const response = await fetch('http://localhost:8082/process_string', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "picture1": img1,
                "picture2": img2
             }),
          });
          const data = await response.json();
          console.log(data); // Log the response from the server
        } catch (error) {
          console.error('Error sending string:', error);
        }
      };

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){
            case "readUContract": 
                console.log("readContract: ", payload);
                setUnsignedContract(payload);
                break;
            case "didKey":
                console.log("didKey:", payload);
                downloadJSON(payload, "didKey");
            case "privateKey":
                console.log("privateKey:", payload);
                downloadJSON(payload, "privateKey");
            case "vcContract":
                console.log("vcContract", payload);
                downloadJSON(payload, "vcContract");
            case "vcPhoto":
                console.log("vcPhoto", payload);
                downloadJSON(payload, "vcPhoto");
            case "vpSuccess":
                console.log("vpSuccess", payload);
                setValidate(true);
            case "getIn":
                console.log("getIn", payload);
                setValidate(payload.result);
            case "unsuccessR":
                console.log("unsuccessR", payload);
                setRegister(false);
            case "registerSucess":
                console.log("registerSucess");
                setRegister(true);
            case "registerFailed":
                console.log("registerFailed");
                setRegister(false);
        }
    }
    RPIclient.onmessage = (byteString) => {
        const {data} = byteString;
        const payload = JSON.parse(data);
        console.log("getPhoto");
        const pic_get = payload.picture;
        const get_equiv = sendStringToServer();
        if(status === "register"){
            RPIsendData(get_equiv);
        }
        else if(status === "get in"){
            RPIsendData(get_equiv);
        }
        else{
            RPIsendData("error");
        }
    }

    const downloadJSON = (data, fileName) => {
        console.log("in download JSON");
        const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const jsonURL = URL.createObjectURL(jsonData);
        const link = document.createElement('a');
        link.href = jsonURL;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    const verifyLogin = (input_name, id) => {
        if(!checkManager(input_name, id)){
            return false;
        }
        setIflog(true);
        return true;
    }

    return (
        <WebsiteContext.Provider
            value={{
                isManager, setIsManager, iflog, setIflog, checkManager, verifyLogin,
                concert, setConcert, unsigned_contract, setUnsignedContract, validate, regis
            }}
            {...props}
        />
    );
};
const useWebsite = () => useContext(WebsiteContext);
export { WebsiteProvider, useWebsite }