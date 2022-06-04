import React from 'react'
import { Container } from "../Layout/layoutElement";
import { Cat, Catimg, PopularContainer, PopularMain, PopularMainCat } from "./billsElements";
// import {Link} from 'next/link';
import { Link } from "react-router-dom";

const Popular = ({bills}) => {

    const images =[
        { identifier: 'airtime', src: '/img/phone.png' },
        { identifier: 'data', src: '/img/data.png' },
        { identifier: 'tv-subscription', src: '/img/subscription.png' },
        { identifier: 'electricity-bill', src: '/img/electric.png' },
        { identifier: 'education', src: '/img/education.png' },
        { identifier: 'events', src: '/img/events.png' },
        { identifier: 'other-services', src: '/img/others.png' },
        { identifier: 'insurance', src: '/img/insurance.png' }
    ]

  return (
    <PopularContainer>
            <Container>
                <PopularMain>
                    <h2 className="">Search By Category </h2>
                    <PopularMainCat>
                        {
                            bills !== undefined &&(
                                bills.map((data,i)=>{
                                    return(
                                        <Link key={data.categoryId} to={'/dashboard/'+data.categoryId}>
                                            {/* <a key={i} href={'/bills/dashboard/'+data.billerId}> */}
                                            <Cat >
                                                {/* <Catimg src={data.billerLogoUrl} /> */}
                                                <h3 className="">{data.categoryName}</h3>
                                            </Cat>
                                            {/* </a> */}
                                        </Link>
                                    //     <Cat >
                                    //         {   images.map(item => {
                                    //             return(
                                    //                 <>
                                    //                 { 
                                    //                  data.identifier === item.identifier ? (
                                    //                      <Catimg key={item.identifier} src={item.src} />
                                    //                      ):(<></>)
                                    //                     }
                                    //                 </>
                                    //             )
                                    //         })}
                                    //         <h3 className="">{data.name}</h3>
                                    //     </Cat>
                                )
                            })
                            )
                        }
                    </PopularMainCat>
                </PopularMain>
            </Container>
        </PopularContainer>
  )
}

export default Popular
