import { AddUser, writePhoto } from "./writeFunction.js";
import { readPhoto, readUnsignedContract } from "./readFunctions.js";
import { register, verify, getIn } from "./iota.js";
import { sendStringToServer, sendbackServer } from "./faceReconig.js";

const initData = () => {
    console.log('data initialization called.')
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
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
            const img1 = await readPhoto();
            const result = await sendStringToServer(payload.img, img1);
            console.log("in register: ", result);
            if(result.result = 'true'){
                // sendbackServer(result.result);
                sendData(["registerSucess",{}],ws);
                register(payload, ws);
            }
            else{
                sendData(["registerFailed",{}],ws);
                // sendbackServer(result.result);
            }
            // console.log(res);
            // register(payload, ws);
            break;
        }
        case "verify":{
            console.log("in verify");
            verify(payload, ws);
            break;
        }
        case "getIn":{
            console.log("in getIn");
            await getIn(payload, ws);
            break;
        }
        case "picture":{
            console.log("in picture");
            console.log(payload);
            writePhoto(payload.photo);
            break;
        }
        case "checkP":{
            sendData()
            break;
        }
        // case "getContract":{
        //     console.log("in getContract");
            
        //     break;
        // }
    }
}

export {initData, onMessage};

