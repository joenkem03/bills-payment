import { createContext, useState } from "react";
import axios from 'axios';

const appContext = createContext();

export function AppProvider({children}) {
    const [ loading, setloading ]= useState(false);
    const [ billloading, setbillloading ]= useState(false);
    const [ category, setCategory] = useState([])
    const [ billerProducts, setBillerProducts] = useState([])
    const [ isloaded, setisloaded] = useState(false)

    const toggleLoad =()=>{
        setloading(!loading);
    }
    const toggleBillLoad =()=>{
        setbillloading(!billloading);
    }

    const getCat = async ()=>{
        toggleLoad()
        // const billers = await axios.get('https://app-service.icadpay.com/api/Biller/billerCategories');
        const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/servicesCategory');
        if(billers.status === 200){
          const billsdata = await billers.data;
          console.log(billsdata);
          setCategory(billsdata);
          toggleLoad()
        }
    }
    
    const getBillers = async ()=>{
        toggleBillLoad()
        // const billers = await axios.get('https://app-service.icadpay.com/api/Biller/allBillers');
        const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/servicesCategory');
        if(billers.status === 200){
            const billsdata = await billers.data;
            setBillerProducts(billsdata);
            toggleBillLoad()
            setisloaded(true)
        }
    }
    return(
        <appContext.Provider 
            value = {{
                loading,
                getCat,
                category,
                getBillers,
                billerProducts,
                billloading,
                isloaded
        }}>
            {children}
        </appContext.Provider>
    )
}

export default appContext;