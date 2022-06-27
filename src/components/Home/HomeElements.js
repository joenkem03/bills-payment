import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SectionBoxContainer =styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 480px) {
        flex-flow: column;
    }
    /* height: 535px; */
`
export const IconContianter =styled.div`
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {
    }
    &::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        background-color: #6C97FF;
        opacity: 0.2;
        z-index: 10;
    }
    Img{
        z-index: 20;
    }
`
export const SectionBox =styled(Link)`
    position: relative;
    display: flex;
    flex-flow: column;
    width: calc(100% / 3 - 10px);
    height: 300px;
    padding: 40px;
    transition: all .3s ease-in-out;
    &:hover{
        cursor: pointer;
        transform: scale(.95);
        &::before{
            border: 1px solid #FFFFFF;
            box-shadow: 0px 0px 6px #FFFFFF;;
        }
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 22px;
    }
    &::before{
        content: '';
        width: 100%;
        height: 300px;
        background: rgba(255, 255, 255, 0.21);
        opacity: 0.2;
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
    }
    h2{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        color: #FFFFFF;
        @media screen and (max-width: 480px) {
            font-size: 18px;
            font-weight: 600;
            line-height: 27px;
            margin: 0;
        }
    }
    p{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: #FFFFFF;
        @media screen and (max-width: 480px) {
            font-family: Poppins;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: 0em;
            text-align: left;

        }
    }
`

export const FeatureBox =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    @media screen and (max-width: 480px) {
        padding: 3px;
    }
    
    p{
        text-align: center;
        //styleName: Body 1 ;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #1D2646;
        @media screen and (max-width: 480px) {
            font-family: Poppins;
            font-size: 13px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: 0em;
            text-align: center;
        }

    }

`
export const FeatureBoxContainer =styled.div`
    display: flex;

`
export const SectionFeatures =styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 0px 200px 0px;
    @media screen and (max-width: 480px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding-bottom: 66px;
    }
`
export const Featurecolumn =styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    h2{
        width: 480px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 120%;
        color: #1D2646;
        @media screen and (max-width: 480px) {
            font-family: Poppins;
            font-size: 24px;
            font-weight: 600;
            line-height: 29px;
            letter-spacing: 0em;
            text-align: left;
            width: 100%;
        }
    }
    p{
        //styleName: Body 1 ;
        width: 480px;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
        @media screen and (max-width: 480px) {
            font-size: 16px;
            width: 100%;
        }

    }
    .featurescontainer{
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        @media screen and (max-width: 480px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

    }
    .features{
        width: fit-content;
        padding: 0px 20px;
        height: 60px;
        border: 1px solid rgba(29, 38, 70, 0.17);
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 20px;
        @media screen and (max-width: 480px) {
            padding: 0px 10px;
            width: 90%;
            margin: 10px auto;
        }
        h3{
            //styleName: Body 1 ;
            font-family: Poppins;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: center;
            color: #1D2646;
            margin-left: 10px;
            @media screen and (max-width: 480px) {
                font-size: 13px;
                margin-left: 0px;
            }
        }
    }

`
export const FeatureImg = styled.div`
    position: relative;
    @media screen and (max-width: 480px) {
        .featureimg{
            height: 307.24139404296875px;
            width: 304.137939453125px;

        }
        order: 1;
        margin-top: 50px;
        margin-bottom: 50px;
    }
`
export const Circle = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    border-radius: 50%;
    background: ${props => props.bg};
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    @media screen and (max-width: 480px) {
        height: ${props => props.mheight};
        width: ${props => props.mwidth};
        top: ${props => props.mtop};
        left: ${props => props.mleft};
    }
`

export const CollectionText = styled.div`
    position: relative;
    h2{
        //styleName: Header 2;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 120%;
        color: #1D2646;
        @media screen and (max-width: 480px) {
            font-size: 24px;
            line-height: 28.8px;
        }

    }
    p{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: #1D2646;
        margin-bottom: 50px;
        @media screen and (max-width: 480px) {
            font-size: 14px;
        }
    }
    .collections{
        &_container{
            width: 100%;
            display:grid;
            grid-template-columns: 1fr 1fr;
        }
        &_item{
            display: flex;
            align-items: center;
            width: 100%;
            h3{
                //styleName: Body 1 ;
                font-family: Poppins;
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                letter-spacing: 0em;
                text-align: left;
                color: #1D2646;
                margin-left: 30px;
                @media screen and (max-width: 480px) {
                    font-size: 13px;
                    margin-left: 10px;
                }
            }
        }
        &_img{
            display: block;
            margin-right: 10px;
        }

    }
`

export const ServicesText = styled.div`
display: flex;
justify-content: space-between;
flex-flow: column;
h2{
    //styleName: Header 1;
    font-family: Poppins;
    font-size: 60px;
    font-weight: 600;
    line-height: 66px;
    text-align: left;
    margin: 0;
    color: #1D2646;
    margin-top: 100px;
    @media screen and (max-width: 480px) {
        font-size: 36px;
        line-height: 39.6px;
        margin-top: 0px;
    }
}
p{
    //styleName: Body 1 ;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    @media screen and (max-width: 480px) {
        font-size: 14px;
        line-height: 21px;
    }
}
`

export const Servicesimg = styled.div`
    display: flex;
    position: relative;
    height:70vh;
    @media screen and (max-width: 480px) {
        height: 30vh;
    }
    img{
        position: absolute;
    }
`
    
export const Servicesimage = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    @media screen and (max-width: 480px) {
        width: ${props => props.mwidth};
        height: ${props => props.mheight};
        bottom: ${props => props.mbottom};
        left: ${props => props.mleft};
    }

`

export const FooterContainer = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    .footer{
        &_hidden{
            display: none !important;
            @media screen and (max-width: 480px) {
                display: flex !important;
            }
        }
        &_show{
            display: flex !important;
            @media screen and (max-width: 480px) {
                display: none !important;
            }

        }
        &_contacts{
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            padding:15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.21);
            @media screen and (max-width: 480px) {
                flex-flow: column;
            }
            &_contact{
                width: 60%;
                @media screen and (max-width: 480px) {
                    width: 100%;
                    display: flex;
                    flex-flow: column;
                }
            }
            &_social{
                display: flex;
                justify-content: end;
                align-items: center;
                width: 40%;
                padding-right: 20px;
                @media screen and (max-width: 480px) {
                    width: 100%;
                    justify-content: start;
                }
                &_list{
                    display: flex;
                    width: 60%;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    @media screen and (max-width: 480px) {
                        width: 100%;
                        justify-content: start;
                        margin: 0;
                        padding: 0;
                        align-items: flex-start;
                    }
                }
                &_item{
                    width: 20px;
                    height: 20px;
                    @media screen and (max-width: 480px) {
                        margin-right: 22px;
                        width: fit-content;
                        height: fit-content;
                    }
                }
                &_link{
                    position: relative;
                    display: flex;
                    width: 36.06px;
                    height: 36.06px;
                    justify-content: center;
                    align-items: center;
                    @media screen and (max-width: 480px) {
                    
                    }

                    &::after{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 36.06px;
                        height: 36.06px;
                        background: #FFFFFF;
                        border-radius: 50%;
                        border: 0.801249px solid #FFFFFF;
                        box-sizing: border-box;
                        opacity: .2;
                    }
                    &:hover{
                        &::after{
                            opacity: .4;
                        }
                    }
                }
            }
            h3{
                font-family: Poppins;
                font-size: 14px;
                font-weight: 600;
                line-height: 15px;
                letter-spacing: 0em;
                text-align: left;
                color: #FFFFFF;
                margin: 0;
                @media screen and (max-width: 480px) {
                    font-size: 12px;
                }
            }
        }
        &_contact{
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 480px) {
                flex-flow: column;
                margin: 30px 0px;
            }
            &_item{
                display: flex;
                align-items: center;
                @media screen and (max-width: 480px) {
                    margin: 10px 0px;
                    align-items: center;
                }
                h4{                    
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 19.23px;
                    line-height: 118%;
                    color: #FFFFFF;
                    margin-left: 20px;
                    @media screen and (max-width: 480px) {
                        margin: 0;
                        font-size: 16px;
                        margin-left: 10px;
                    }
                }
            }
        }
        &_menu{
            padding: 36px 0px;
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 480px) {
                flex-flow: column;
                border-bottom: 1px solid rgba(255, 255, 255, 0.21);
            }
            &_nav{
                display: flex;
                align-items: center;
                @media screen and (max-width: 480px) {
                    flex-flow: column;
                    align-items: start;
                }
                &_list{
                    display: flex;
                    align-items: center;
                    margin-top: 25px;
                    @media screen and (max-width: 480px) {
                        flex-flow: column;
                        align-items: flex-start;
                        padding: 0;
                    }
                }
                &_item{
                    @media screen and (max-width: 480px) {
                        margin-bottom: 20px;

                    }
                
                    a{
                        font-family: Poppins;
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 19px;
                        letter-spacing: 0px;
                        text-align: center;
                        margin-right:28.0437px;
                        color: #FFFFFF;
                        @media screen and (max-width: 480px) {
                            color: #FFFFFF;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        &_copyright{
            display: flex;
            align-items: center;
            justify-content: space-between;
            @media screen and (max-width: 480px) {
                flex-flow: column;
                align-items: flex-start;
                padding-top: 50px;
            }
            &_rights{
                display: flex;
                h4{
                    font-family: Poppins;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 19px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #FFFFFF;
                    @media screen and (max-width: 480px) {
                        font-size:12px ;
                    }
                }
            }
            &_policy{
                display: flex;
                a{
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14.4225px;
                    line-height: 129.5%;
                    color: #FFFFFF;
                    margin-right: 60px;
                    &:last-of-type{
                        margin-right: 0px;
                    }
                    @media screen and (max-width: 480px) {
                        font-size   :12px ;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
`