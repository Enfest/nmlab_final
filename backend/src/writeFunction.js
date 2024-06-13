import { readDb, writeDb } from "./dbFunctions.js";

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const AddUser = (User, ws)=>{
    var getUsers = readDb("/database/user.json");
    // writeDb(User);
    if(!getUsers){
        writeDb(getUsers, "/database/user.json");
        sendData(["addUser", false], ws);
    }
    else{
        const old_user = getUsers.find((element) => (element.name == User.name));
        if(!old_user){
            getUsers.push(User);
        }
        else{
            sendData(["addUser", true], ws);
        }
    }
    

}

const AddUnsignedContract = (data, ws) => {
    var getUContract = readDb("/database/unsigned_contract.json");
    
}

const AddContract = (data, ws) => {
    var getContracts = readDb("/database/user.json");
    // writeDb(User);
    if(!getContracts){
        writeDb(getContracts, "/database/user.json");
        sendData(["addUser", false], ws);
    }
    else{
        getContracts.push(data);
        writeDb(getContracts, "/database/user.json");
    }
}

const writePhoto = (photo) => {
    writeDb({photo: photo}, "/database/photo.json");
}

export {AddUser, AddContract, writePhoto};
