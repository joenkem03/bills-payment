/* eslint-disable array-callback-return */
import React,{ useContext,useState, useEffect, } from 'react'
import { SearchbarContainer, SearchbarIcon, Searchbarinput,Searchbardropdown } from "./billsElements";
// import Link from 'next/link';
import { Link } from "react-router-dom";
import appContext from '../../hooks/appHook';

export default function SearchBar ({props}) {

    const [result,setResult] = useState([]);
    const [showDropdown,setshowDropdown] = useState(false);
    const [search,setSearch] = useState([]);
    const [searchResult,setSearchResult] = useState('');
    const {getBillers,billerProducts,isloaded} = useContext(appContext);

    useEffect(()=>{
        getBillers();
    },[])
    
    useEffect(()=>{
        if(isloaded){
           console.log(billerProducts)
           handleData(billerProducts);
        }
    },[])

    useEffect(()=>{
        if(search.length > 0){
            console.log('perform search')
            handlesearch(search);

            setTimeout(()=>{
                setshowDropdown(true)
            },300)
        }else{
            setTimeout(()=>{
                setshowDropdown(false)
            },300)
        }
        // console.log('perform search')
    },[search])

    const handleData = (data) =>{
        const arr =[];
        console.log(data);
        data?.filter((item)=>{
            // if(item.billerName){
            //     arr.push({
            //         label:item.billerShortName,
            //         value:item.categoryId
            //     })
            // }
            if(item.name){
                arr.push({
                    label:item.name,
                    value:item.identifier
                })
            }
        })
        console.log(arr)
        setResult(arr);
    }
    const handlesearch = (search)=>{
        const arr = []
        result?.filter((item)=>{
            if(item.label.toLowerCase().includes(search.toLowerCase())){
                arr.push({
                    label:item.label,
                    value:item.value
                })
            }
        })
        console.log(arr);
        setSearchResult(arr)
    }
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
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        {/* <Select options={result} /> */}

        </SearchbarContainer>
        <Searchbardropdown show={showDropdown}>
            <ul className="">  
                {
                    searchResult && searchResult?.map((item)=>{
                        return(
                            <>
                                <li key={item.id}><Link to={"/dashboard/"+item.value} >{item.label.toLowerCase().trim()}</Link></li>
                            </>
                        )
                    })
                }
            </ul>
        </Searchbardropdown>
        </>
    );
}