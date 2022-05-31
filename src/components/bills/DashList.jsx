import { DashListContainer, DashListimg, DashListsContent } from './billsElements';
import  { useEffect, useState } from 'react';
// import axios from "axios";

export default function DashList({datas,setdata,bill,proceed}) {
    
    // console.log('DashList_____',datas)
    
    const [active, setactive] = useState();
    const [proceedVal, setproceed] = useState(false);
    useEffect(()=>{

    },[]);
    const handleClick = (e)=>{
        const id = e.currentTarget.id;
        setactive('');
        setdata([])
        // if(active)
        if(datas !== '' ){

            datas.filter((item)=>{
                
                if(item.serviceID === id){
                    setdata(item);
                    setactive(item.serviceID);
                    setproceed(true)
                    // handleVariety(item.serviceID)
                }
                return item;
            })
        }

        // console.log('DashList_____id',bill);
        
    }   
    const handleProceedClick = (e)=>{
        e.preventDefault();
        proceed();
    }   
    // const handleVariety = async (id)=>{
    //     const variety = await axios.get('https://app-service.icadpay.com/api/AltBiller/serviceVariety?id='+id);

    //     const varietyData = await variety.data;
    
    //     // console.log('data',billsdata.products[0]);
    //     console.log('data',varietyData);
    // }
    return (
        <DashListContainer>
            <DashListsContent>
                {
                    datas !== '' && (

                        datas.filter(Boolean).map((item,i)=>{
                            return(
                                        <>
                                            <li key={item.serviceID} className={active === item.serviceID ? 'active':''} id={item.serviceID} onClick={handleClick}>
                                                <DashListimg
                                                    src={item.image}
                                                />
                                                <div className="listnames">
                                                    <h4 className="">{item.name}</h4>
                                                    {/* <h5>DSTV Kenya</h5> */}
                                                </div>
                                                {/* {
                                                    active == item.serviceID && (
                                                        <>
                                                        
                                                            <DashListCheck src='/img/Check_.svg'/>
                                                        </>
                                                        )
                                                } */}
                                            </li>
                                        </>
                                    )
                        })
                    )
                    
                }
                <div className="proceed">
                    <button className={ proceedVal ? 'paybtn':'paybtn_not'} onClick={handleProceedClick}>Proceed</button>
                </div>
            </DashListsContent>
        </DashListContainer>
    );
}