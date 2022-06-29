import React from 'react'
import { Container } from "../Layout/layoutElement";
import { Cat, PopularContainer, PopularMain, PopularMainCat } from "./billsElements";
import { Link } from "react-router-dom";
import CategoryLoader from '../loaders/CategoryLoader';

const Categories =({bills,load})=>{
    return(
        // <Link  to={'/dashboard/'}>
        //     <Cat >
        //         <h3 className="">fsfsfdffsdsfd</h3>
        //     </Cat>
        // </Link>
        // bills !== undefined &&(
            // load && bills?.map((data,i)=>{
            //     return(
            //         <Link key={data.categoryId} to={'/dashboard/'+data.categoryId}>
            //             <Cat >
            //                 <h3 className="">{data.categoryName}</h3>
            //             </Cat>
            //         </Link>
            // )
            load && bills?.map((data,i)=>{
                return(
                    <Link key={i} to={'/dashboard/'+data.identifier}>
                        <Cat >
                            <h3 className="">{data.name}</h3>
                        </Cat>
                    </Link>
            )
        })
        // )
    )
}
const Popular = ({bills,loading}) => {

    // const images =[
    //     { identifier: 'airtime', src: '/img/phone.png' },
    //     { identifier: 'data', src: '/img/data.png' },
    //     { identifier: 'tv-subscription', src: '/img/subscription.png' },
    //     { identifier: 'electricity-bill', src: '/img/electric.png' },
    //     { identifier: 'education', src: '/img/education.png' },
    //     { identifier: 'events', src: '/img/events.png' },
    //     { identifier: 'other-services', src: '/img/others.png' },
    //     { identifier: 'insurance', src: '/img/insurance.png' }
    // ]

  return (
    <PopularContainer>
            <Container>
                <PopularMain>
                    <h2 className="">Search By Category </h2>
                    <PopularMainCat>
                        {loading ?
                            <Categories load={loading} bills={bills}/>
                            : <CategoryLoader/>
                        }
                    </PopularMainCat>

                </PopularMain>
            </Container>
        </PopularContainer>
  )
}

export default Popular
