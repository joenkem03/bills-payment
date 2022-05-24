import { useState, useEffect} from "react";
import { SearchbarContainer, SearchbarIcon, Searchbarinput,Searchbardropdown } from "./billsElements";
// import Link from 'next/link';
import { Link } from "react-router-dom";


export default function SearchBar ({props}) {
    const [result,setResult] = useState([]);
    const [showDropdown,setshowDropdown] = useState(false);

    const handleSearch = (e) => {
        const arr = [];
        
        if(e.currentTarget.value.length >= 3){
            // eslint-disable-next-line array-callback-return
            props.filter((cat) => {
                if(cat.identifier.toLowerCase().includes(e.currentTarget.value)){     
                    return (
                        arr.push({
                            id:cat.identifier,
                            name:cat.name
                        })
                    )               
                }
            })
            setshowDropdown(true);
            setResult(arr);
            console.log('typing',arr)
        }else{
            setResult([]);
            // setshowDropdown(false)
            console.log('value',e.currentTarget.value )
        }

    }

    useEffect(()=>{
        if(result.length <= 0 ){
            setshowDropdown(false)
        }
    },[result])
    return (
        <>
        <SearchbarContainer>
            <SearchbarIcon
                src="/img/search.svg"
                alt=''
            />
            <Searchbarinput
                type='text'
                placeholder="Enter bill type e.g DSTV "
                onKeyUp={handleSearch}
            />

        </SearchbarContainer>
        <Searchbardropdown show={showDropdown}>
            <ul className="">  
                {
                    result.map((item)=>{
                        return(
                            <>
                                <li key={item.id}><Link to={"/dashboard/"+item.id} >{item.name}</Link></li>
                            </>
                        )
                    })
                }
            </ul>
        </Searchbardropdown>
        </>
    );
}