import { Section, Container, SectionTitle, Column } from './../Layout/layoutElement';
import { FeatureBox,Featurecolumn, FeatureImg,Circle,SectionFeatures } from './HomeElements';
// import img from 'next/img';
import MainButton from '../button/MainButton';
export default function Features() {
    return (
        <Section 
            padding={'100px 0px'}
            mpadding={'30px 0px'}
        >
            <Container>
                <SectionTitle color="#1D2646">
                    <h2>Features</h2>
                    <p>We create and sustain a seamless payment ecosystem that helps commerce evolve, businesses grow and individuals thrive.</p>
                </SectionTitle>
            </Container>
            <Container>
                <SectionFeatures>
                    <Column divide={4}>
                        <FeatureBox>
                            <img src='/img/lable.svg' alt='' width={60} height={60}/>
                            <p>Enjoy free payments  for individuals & businesses </p>
                        </FeatureBox>
                    </Column>
                    <Column divide={4}>
                        <FeatureBox>
                            <img src='/img/lock.svg' alt='' width={60} height={60}/>
                            <p>Privacy and Security  are guaranteed  </p>
                        </FeatureBox>
                    </Column>
                    <Column divide={4}>
                        <FeatureBox>
                            <img src='/img/layers.svg' alt='' width={60} height={60}/>
                            <p>We accept multiple modes of payments</p>
                        </FeatureBox>
                    </Column>
                    <Column divide={4}>
                        <FeatureBox>
                            <img src='/img/chart.svg' alt='' width={60} height={60}/>
                            <p>Gain Real-time reports & analytics</p>
                        </FeatureBox>
                    </Column>
                </SectionFeatures>
            </Container>
            <Container>
                <Column divide={2}>
                    <Featurecolumn>
                        <h2>For small-to-medium-sized businesses</h2>
                        <p>Icadpay provides pain-free means to accept online payment in Nigeria. </p>
                        <div className="featurescontainer">
                            <div className="features">
                                <img src='/img/scan.png' alt='' width={20} height={25}/>
                                <h3>QR code</h3>
                            </div>
                            <div className="features">
                                <img src='/img/cpu.svg' alt='' width={20} height={25}/>
                                <h3>avs</h3>
                            </div>
                            <div className="features">
                                <img src='/img/switch.png' alt=''width={20} height={25}/>
                                <h3>Bank Transfer</h3>
                            </div>
                            <div className="features">
                                <img src='/img/desktop.svg' alt='' width={20} height={25}/>
                                <h3>Web</h3>
                            </div>
                            <div className="features">
                                <img src='/img/tablet.png' alt='' width={20} height={25}/>
                                <h3>Mobile</h3>
                            </div>
                            <div className="features">
                                <img src='/img/tablet.png' alt='' width={20} height={25}/>
                                <h3>USSD</h3>
                            </div>
                        </div>
                        <MainButton text='Get started' main={false}/>
                    </Featurecolumn>
                </Column>
                <Column divide={2}>
                    <FeatureImg>
                        <img src='/img/pic5.png' className='featureimg' alt='' width={511} height={514}/>
                        <Circle 
                            bg=' #DC0D11' 
                            width='90px' 
                            height='90px' 
                            top='210px' 
                            left='-40px' 
                            mwidth='53px' 
                            mheight='53px' 
                            mtop='45%' 
                            mleft='-20px'
                        />
                        <Circle 
                            bg=' linear-gradient(167.96deg, #6C97FF 8.79%, #2C63EA 89.57%)' 
                            width='36px' 
                            height='36px' 
                            top='20px' 
                            left='380px'
                            mwidth='21px' 
                            mheight='21px' 
                            mtop='20px' 
                            mleft='90%'
                        />
                        <Circle 
                            bg=' linear-gradient(167.96deg, #ECF1FF 8.79%, #F8E4FF 89.57%)' 
                            width='124px' 
                            height='124px' 
                            top='380px' 
                            left='250px'
                            mwidth='74px' 
                            mheight='74px' 
                            mtop='80%' 
                            mleft='60%'
                        />
                    </FeatureImg>
                </Column>
            </Container>
        </Section>
    );
}