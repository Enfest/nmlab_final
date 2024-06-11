import { readDb } from "./dbFunctions.js";

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const readUnsignedContract = (ws)=>{
    var getUContract = readDb("/database/unsigned_contract.json");
    // writeDb(User);
    console.log("readUnsignedContract: ", getUContract);
    sendData(["readUContract", getUContract], ws);
}


export {readUnsignedContract};