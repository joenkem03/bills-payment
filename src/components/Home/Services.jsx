import { Column, Container, Section } from "../Layout/layoutElement";
import { Servicesimage, Servicesimg, ServicesText } from "./HomeElements";
// import Image from "next/image";
import MainButton from "../button/MainButton";

const Services = () => {
    return (
        <Section bg='' padding='100px 0px'>
            <Container>
                <Column divide={2}>
                    <ServicesText>
                        <h2 className="">Built for Convenient Payments</h2>
                        <p className="">Join over 1000+ Nigerian businesses enjoying seamless payment services with one click</p>
                        <MainButton text='Get started' main={false}/>
                    </ServicesText>
                </Column>
                <Column divide={2}>
                    <Servicesimg>
                        <Servicesimage
                            src='/img/pic7.png'
                            alt={'pic'}
                            width={'280px'}
                            height={'380px'}
                            bottom={`0px`}
                            left={`0px`}
                            mwidth={'166px'}
                            mheight={'207px'}
                            mbottom={`0px`}
                            mleft={`0%`}
                        />
                        <Servicesimage
                            src='/img/pic8.png'
                            alt={'pic'}
                            width={'280px'}
                            height={'380px'}
                            bottom={`30px`}
                            left={`300px`}
                            mwidth={'150px'}
                            mheight={'201px'}
                            mbottom={`30px`}
                            mleft={`55%`}
                        />
                        
                    </Servicesimg>
                </Column>
            </Container>
        </Section>
    );
}

export default Services;