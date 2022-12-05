import React from 'react'
import { Container } from "../Layout/layoutElement";
import { Cat, PopularContainer, PopularMain, PopularMainCat } from "./billsElements";
import { Link } from "react-router-dom";
import CategoryLoader from '../loaders/CategoryLoader';

const Categories =({bills,load})=>{
    const billCategories= [
        {identifier:"airtime",name:"Airtime Recharge"},
        {identifier:"data",name:"Data Services"},
        {identifier:"education",name:"Education"},
        {identifier:"electricity-bill",name:"Electricity Bill"},
        // {identifier:"events",name:"Events"},
        // {identifier:"insurance",name:"Insurance"},
        // {identifier:"other-services",name:"Other Merchants/Services"},
        {identifier:"tv-subscription",name:"TV Subscription"}
    ]
    return(
            billCategories.map((data,i)=>{
                return(
                    <Link key={i} to={'/dashboard/'+data.identifier}>
                        <Cat >
                            <h3 className="">{data.name}</h3>
                        </Cat>
                    </Link>
            )
        })
    )
}
const Popular = ({bills,loading}) => {
    console.log(loading);
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
                            <CategoryLoader/>
                            :  <Categories load={loading} bills={bills}/>
                        }
                        <Link to={'/dashboard/nipost'}>
                            <Cat >
                                <h3 className="">Nipost Payments</h3>
                            </Cat>
                        </Link>
                    </PopularMainCat>
                </PopularMain>
            </Container>
        </PopularContainer>
  )
}

export default Popular
