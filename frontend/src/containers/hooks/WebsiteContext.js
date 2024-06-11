import { useContext, createContext, useState, useEffect } from 'react'
import client from './wsConnect';

const WebsiteContext = createContext({
    checkManager:   false,
    isManager:      false,
    verifyLogin:    {},
    concert:        0,

})
const Managers =[
    {
        name: "Cs",
        id: "B10901099"
    }
]
const WebsiteProvider = (props) => {
    const [isManager, setIsManager]     = useState(false);
    const [iflog, setIflog]             = useState(false);
    const [concert, setConcert]         = useState(0);
    const checkManager = (input_name, id) => {
        const getName = Managers.find(({name})=>(name===input_name));
        if(!getName){
            setIsManager(false);
           return false
        }
        if(getName.id === id){
            setIsManager(true);
            return true
        }
        else{
            setIsManager(false);
            return false
        }

    }

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){

        }
    }

    const verifyLogin = (input_name, id) => {
        if(!checkManager(input_name, id)){
            return false;
        }
        setIflog(true);
        return true;
    }

    return (
        <WebsiteContext.Provider
            value={{
                isManager, setIsManager, iflog, setIflog, checkManager, verifyLogin,
                concert, setConcert
            }}
            {...props}
        />
    );
};
const useWebsite = () => useContext(WebsiteContext);
export { WebsiteProvider, useWebsite }