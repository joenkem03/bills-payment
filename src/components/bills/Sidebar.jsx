import react, { useState, useEffect} from "react";
import { SidebarContainer } from "./billsElements";
import DashList from "./DashList";
import DashSearch from './Dashsearch';

export default function Sidebar({data,setBiller,biller,proceed}) {
    
    // console.log('sidebar__',data);
    
    return (
        <SidebarContainer>
            <DashSearch/>
            <DashList datas={data} setdata={setBiller} bill={biller} proceed={proceed}/>
        </SidebarContainer>
    );
}