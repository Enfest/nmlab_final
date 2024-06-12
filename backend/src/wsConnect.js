import { AddUser } from "./writeFunction.js";
import { readUnsignedContract } from "./readFunctions.js";
import { register, verify, getIn } from "./iota.js";

const initData = () => {
    console.log('data initialization called.')
}

const onMessage = async (wss, ws, e) => {
    console.log("in on message");
    // console.log(e.data);
    const [task, payload] = JSON.parse(e.data);
    // console.log(payload);
    switch (task) {
        // Add functions
        case 'AddUser':{
            AddUser(payload, ws);
            break;
        }
        case 'readUContract':{
            console.log("readUContract");
            readUnsignedContract(ws);
            break;
        }
        case "register":{
            console.log("in register");
            register(payload, ws);
            break;
        }
        case "verify":{
            console.log("in verify");
            verify(payload, ws);
            break;
        }
        case "getIn":{
            console.log("in getIn");
            getIn(payload, ws);
            break;
        }
        // case "getContract":{
        //     console.log("in getContract");
            
        //     break;
        // }
    }
}

export {initData, onMessage};

