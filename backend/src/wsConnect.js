import { AddUser } from "./writeFunction.js";

const initData = () => {
    console.log('data initialization called.')
}

const onMessage = async (wss, ws, e) => {
    console.log("in on message");
    // console.log(e.data);
    const [task, payload] = JSON.parse(e.data);
    console.log(payload);
    switch (task) {
        // Add functions
        case 'AddUser':{
            AddUser(payload, ws);
            break;
        }

    }
}

export {initData, onMessage};

