import { createContext, useState } from "react";
import axios from 'axios';

const appContext = createContext();

export function AppProvider({children}) {
    const [ loading, setloading ]= useState(false);
    const [ billloading, setbillloading ]= useState(false);
    const [ altcategory, setAltcategory] = useState([])
    const [ altbillerProducts, setAltBillerProducts] = useState([])
    const [ billerProducts, setBillerProducts] = useState([])
    const [ isloaded, setisloaded] = useState(false)
    const [ biller, setBiller] = useState([])
    // const [ billerProducts, setBillerProducts] = useState([])
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
          const Altbillsdata = await billers.data;
        //   console.log(Altbillsdata);
          setAltcategory(Altbillsdata);
          toggleLoad()
        }
    }
    
    const getBillers = async ()=>{
        toggleBillLoad()
        // const billers = await axios.get('https://app-service.icadpay.com/api/Biller/allBillers');
        const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/servicesCategory');
        if(billers.status === 200){
            const Altbillsdata = await billers.data;
            setAltBillerProducts(Altbillsdata);
            toggleBillLoad()
            setisloaded(true)
        }
    }

    const getNpps = async ()=>{
        toggleBillLoad()
        const billers = await axios.get('https://app-service.icadpay.com/api/Biller/allBillers');
        if(billers.status === 200){
            const billsdata = await billers.data;
            const biller = billsdata.filter( (bill) => {
                if( bill.billerId !== null){
                    return bill
                }
            });
            const gvbillers = biller.filter( (bill) => {
                if( bill.categoryId === "7"){
                    if (bill.billerId.includes("NIPOST")){
                        return bill
                    }
                }
            });
            setBillerProducts(billsdata);
            toggleBillLoad()
            setisloaded(true)
            console.log(biller);
            console.log(gvbillers);
        }
    }

    return(
        <appContext.Provider 
            value = {{
                loading,
                getCat,
                getBillers,
                getNpps,
                altcategory,
                billerProducts,
                altbillerProducts,
                billloading,
                isloaded
        }}>
            {children}
        </appContext.Provider>
    )
}

export default appContext;