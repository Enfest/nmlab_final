import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readDb(dbName = '/db.json') {
    // read JSON object from file
    const data = fs.readFileSync(__dirname+dbName, 'utf8')
    if(!data){
        return null;
    }
    else{
        return JSON.parse(data);
    }
    
}

function writeDb(obj, dbName = '/db.json') {
    if (!obj) return console.log('Please provide data to save')
    try {
        fs.writeFileSync(__dirname+dbName, JSON.stringify(obj)) //overwrites current data
        return console.log('SAVE SUCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}



export { readDb, writeDb }