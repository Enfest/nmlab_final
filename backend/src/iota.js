import { createDID } from "../../createDID.js";
import { vc_contract } from "../../vc_contract.js";
import { vc_photo } from "../../vc_photo.js";
import { createVP } from "../../createVP.js"; 
import { validateVP } from "../../validateVP.js";
import { updateDID } from "../../updateDID.js";
import { validateVC } from "../../validateVC.js";
import { AddContract } from "./writeFunction.js";
import { readPhoto } from "./readFunctions.js";
import { sendStringToServer } from "./faceReconig.js";

async function register(payload, ws){
    try{
        const DID = await createDID();
        sendData(["didKey", DID.didKey], ws)
        sendData(["privateKey", DID.privateKey], ws);
        console.log("DID here");
        const vcContract = await vc_contract(DID.didKey, payload.name, payload.birth);
        sendData(["vcContract", vcContract.credentialJwt], ws);
        const vcPhoto = await vc_photo(DID.didKey, payload.img, payload.name);
        sendData(["vcPhoto", vcPhoto.credentialJwt], ws)
    }catch(error){
        console.log(error);
    }
    // try{
        
    // }catch(error){
    //     console.log(error);
    // }
    // try{    
        
    // }catch(error){
    //     console.log(error);
    // }
}

async function verify(payload, ws){
    const nonce = "475a7984-1bb5-4c4c-a56f-822bccd46440";
    try{
        const presentation = await createVP(nonce, payload.DID, payload.privateKey, payload.vc);
        const vpSuccess = await validateVP(nonce, presentation);
        sendData(["vpSuccess", {}], ws);
        await updateDID(payload.DID, payload.concert, payload.seat, payload.price);
        AddContract({
            DID: payload.DID,
            seat: payload.seat,
            price: payload.price,
            concert: payload.concert
        })
    }catch(error){
        console.log(error);
    }
}

async function getIn(payload, ws){
    try{
        const check = await validateVC(JSON.stringify(payload.vc));
        const img1 = await readPhoto();
        const result = await sendStringToServer(img1, check.photo);
        sendData(["getIn", result], ws);
        // process.exit();
    }catch(error){
        console.log(error);
    }
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

export {register, verify, getIn};