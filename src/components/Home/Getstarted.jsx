import { Container, Section, SectionTitle } from "../Layout/layoutElement";
import { SectionBox, SectionBoxContainer, IconContianter } from "./HomeElements";
// import Image from 'next/image';
import { Link } from 'react-router-dom';

export default function Getstarted(){
    return (
        <Section
            bg={'#1D2646'}
            padding={'70px 0px 80px 0px'}
            mpadding={'50px 0px 50px 0px'}
        >
            <Container>
                <SectionTitle color="#ffffff">
                    <h2>Get started </h2>
                </SectionTitle>
            </Container>
            <Container>
                <SectionBoxContainer>
                    <Link to="/bills">
                        <SectionBox href='#'>
                            <IconContianter>
                                <img 
                                    src="/img/Wallet_duotone.svg"
                                    alt="sda" 
                                    width={18}
                                    height={17}
                                />
                            </IconContianter>
                            <h2>Make payments </h2>
                            <p>Pay your government tariffs, private levies, Taxes, Institutional fees, and public applications</p>
                        </SectionBox>
                    </Link>
                    <SectionBox href="/">
                        <IconContianter>
                            <img 
                                src="/img/Wallet_duotone.svg"
                                alt="sda" 
                                width={18}
                                height={17}
                            />
                        </IconContianter>
                        <h2>Upscale your business </h2>
                        <p>All the tools you need to run a digital business and thrive in a digital economy on one platform.</p>
                    </SectionBox>
                    <SectionBox href={`https://icadpay.com/developers/index.html`} target="_blank" rel="noreferrer">
                        <IconContianter>
                            <img 
                                src="/img/Wallet_duotone.svg"
                                alt="sda" 
                                width={18}
                                height={17}
                            />
                        </IconContianter>
                        <h2>Use our API </h2>
                        <p>Simple, clean ready-to-use APIs at your beck and call to accept and process payments on any platform.</p>
                    </SectionBox>
                </SectionBoxContainer>
            </Container>
        </Section>
    );
}