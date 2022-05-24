import { Column, Container, Section } from "../Layout/layoutElement";
// import img from "next/img";
import { CollectionText } from "./HomeElements";

export default function Collection(){
    return (
        <Section bg='#F3F6FF;' padding='100px 0px'>
            <Container>
                <Column divide={2}>
                    <img 
                        src="/img/pic6.png"
                        alt="sda" 
                        width={483}
                        height={462}
                        className='collectionimg'
                    />
                </Column>
                <Column divide={2}>
                    <CollectionText>
                        <h2 className="">Large or enterprise-level businesses</h2>
                        <p>Our collection, monitoring, and reporting solution help corporate organizations receive payments from their customers across various channels, including banks, POS, Internet Banking.</p>
                        <div className="collections">
                            <div className="collections_container">
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/paper.png' alt=''  width={27} height={27}/>
                                    </span>
                                    <h3 className="">
                                        Payroll
                                    </h3>
                                </div>
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/3d.svg' alt='' width={27} height={27}/>
                                    </span>
                                    <h3>

                                        Omni-channel platform 
                                    </h3>
                                </div>
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/note.svg' alt='' width={27} height={27}/>
                                    </span>
                                    <h3 className="">
                                        Disbursement
                                    </h3>
                                </div>
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/file.svg' alt='' width={27} height={27}/>
                                    </span>
                                    <h3 className="">
                                        E-receipts 
                                    </h3>
                                </div>
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/star.svg' alt='' width={27} height={27}/>
                                    </span>
                                    <h3>
                                        Ease of Use
                                    </h3>
                                </div>
                                <div className="collections_item">
                                    <span className="collection_img">
                                        <img src='/img/checkl.svg' alt='' width={27} height={27}/>
                                    </span>
                                    <h3>
                                        Guarantee of funds 
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </CollectionText>
                </Column>
            </Container>
        </Section>
    );
}