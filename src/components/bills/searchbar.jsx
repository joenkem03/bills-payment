import { useState, useEffect, useCallback} from "react";
import { SearchbarContainer, SearchbarIcon, Searchbarinput,Searchbardropdown } from "./billsElements";
// import Link from 'next/link';
import { Link } from "react-router-dom";
import Select from 'react-select'


export default function SearchBar ({props}) {

    const [result,setResult] = useState([]);
    const [showDropdown,setshowDropdown] = useState(false);
    const [search,setSearch] = useState('');
    const [searchResult,setSearchResult] = useState('');

    const handleSearch = useCallback((e) => {
        // const arr = [];
        // const searchParams = e.currentTarget.value.toUpperCase();
        // if(searchParams.length >= 3){
            // eslint-disable-next-line array-callback-return
            // console.log(searchParams.toUpperCase())
        //     props?.filter((cat) => {
        //         if(cat.billerName){
        //             let isValid = cat.billerName.includes(searchParams.toUpperCase())
        //             console.log(isValid);
        //             if(cat.billerName.includes(searchParams)){     
        //                 return (
        //                     arr.push({
        //                         id:cat.billerId,
        //                         name:cat.billerName,
        //                         catId:cat.categoryId
        //                     })
        //                 )               
        //             }
        //         }
        //     })
        //     setshowDropdown(true);
        //     setResult(arr);
        //     console.log('typing',arr)
        // }else{
        //     setResult([]);
        //     // setshowDropdown(false)
        //     console.log('value',e.currentTarget.value )
        // }
        const arr = []
        // const searchParams = e.currentTarget.value.toUpperCase();

        console.log(props)

        props?.filter((item) => {
            if(item.billerName){
                arr.push({
                    label:item.billerName,
                    value:item.categoryId
                })
            }
        })
        setResult(arr);
        console.log(result)
    },[])

    const handleSearch2 = (e) =>{
            const arr = []
            result.filter((item)=>{
                return (
                    item.label.includes(search) && arr.push({
                        item
                    })
                )
            })
            setSearchResult(arr)
            console.log(searchResult)
    }


    useEffect(()=>{
        if(props !== null){
            handleSearch();
        }
    },[props,handleSearch])

    // useEffect(()=>{
    //     if(search.length > 0 ){
    //         handleSearch2()
    //     }
    // },[search,handleSearch2])

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
                onKeyUp={handleSearch2}
            />
        {/* <Select options={result} /> */}

        </SearchbarContainer>
        <Searchbardropdown show={true}>
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