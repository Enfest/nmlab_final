import { useContext, createContext, useState, useEffect } from 'react'


const WebsiteContext = createContext({
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

    return (
        <WebsiteContext.Provider
            value={{
                isManager, setIsManager, iflog, setIflog, 
            }}
            {...props}
        />
    );
};
const useWebsite = ()=>useContext(WebsiteContext);
export { WebsiteProvider, useWebsite }