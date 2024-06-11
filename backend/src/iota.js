import { createDID } from "../../createDID.js";

async function register(){
    try{
        console.log("FUCL");
        const DID = await createDID();
        console.log(DID);
    }catch(error){
        console.log(error);
    }
    
}

export {register};