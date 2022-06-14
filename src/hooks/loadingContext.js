import { createContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({children}) {
    const [ loading, setloading ]= useState(true);

    const toggleLoad =()=>{
        setloading(!loading);
    }

    return(
        <LoadingContext.Provider value = {{loading,toggleLoad}}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;