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

const AddSignedContract = (data, ws) => {

}

export {AddUser};
