//test datas for frontend testing//
//////////////////////////////////
import client from './wsConnect'

import { useWebsite } from './WebsiteContext';

const sendData =  async(data) =>{
    if(client.readyState===client.OPEN){
        console.log("Stringfy: ", JSON.stringify(data));
        await client.send(JSON.stringify(data));
        //console.log('data send. data:', JSON.stringify(data));
    }
};

const useBackend = () => {

    // const { setUnsignedContract } = useWebsite();

    //--User handling functions--//
    const AddUser = (payload) => {
        console.log("in addUser");
        console.log(payload);
        sendData(["AddUser",payload]);
    }
    
    const loginLine = (payload) =>{
        console.log("loginLine");
        sendData(["loginLine", payload]);
    }

    const getUContract = () => {
        console.log("getUContract");
        sendData(["readUContract",{}]);
    }

    const register = (payload) => {
        console.log("register");
        sendData(["register",payload]);
    }

    const verify = (payload) => {
        console.log("verify");
        sendData(["verify", payload]);
    }
    const getIn = (payload) => {
        console.log("getIn");
        sendData(["getIn", payload]);
    }

    const sendContract = (payload) => {
        console.log("sendData");
        sendData(["getContract",payload]);
    }

    return {
        AddUser, loginLine, getUContract, register, verify, getIn, sendContract
    };
};

export default useBackend;

//sendData(["AddUser",{name:name, address:address}]);