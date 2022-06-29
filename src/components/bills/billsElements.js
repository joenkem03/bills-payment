import styled from "styled-components";
// import Button from './../button/button';
export const Loader = styled.div`

    width: 100%;
    height: 100vh;
    background-color: rgba(255,255,255,.6);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`
export const BillheaderContainer = styled.div`
    width: 100%;
    height: 302px;
    background: #F3F6FF;
    padding-top: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {}
    .billcontainer{
        text-align: center;
        h2{
            //styleName: Header 2;
            font-family: Poppins;
            font-size: 36px;
            font-weight: 600;
            line-height: 43px;
            letter-spacing: 0em;
            text-align: center;
            color: #1D2646;
            @media screen and (max-width: 480px) {
                font-size: 24px;
                line-height: 28px;
            }
        }
        p{
            //styleName: Body 1 ;
            font-family: Poppins;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: center;
            color: #1D2646;
            @media screen and (max-width: 480px) {
                font-size: 14px;
            }

        }
    }
`
export const SearchbarContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 61px;
    width: 635px;
    border-radius: 40.5px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    overflow: hidden;
    transform:translate(-50%,50%);
    box-shadow: 0px 5px 20px rgba(29, 38, 70, 0.1);
    @media screen and (max-width: 480px) {
        width: 80%;
    }

`
export const Searchbarinput = styled.input`
    width: 95%;
    height: 100%;
    outline: none;
    border:none;
    font-family: Poppins;
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 20px;
`
export const SearchbarIcon = styled.img`
    
`
export const Searchbardropdown = styled.div`
    width: 635px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,.3);
    position: absolute;
    bottom: -180%;
    border-radius:15px;
    padding: 16px 30px;
    overflow: scroll;

    display: ${props=> props.show ? 'block':'none'};
    ul{
        padding: 0;
        li{
            border-bottom:1px solid rgba(0,0,0,.1);
            padding:10px 0px;

            a{
                letter-spacing: 0;
                text-transform: capitalize;
            }
        }
    }
`
export const PopularContainer = styled.div`
    min-height: 544px;
    width: 100%;
    @media screen and (max-width: 480px) {
        min-height: 700px;
    }
`
export const PopularMain = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    width: 100%;
    align-items: flex-start;
    padding-top: 107px;
    h2{
        //styleName: Header 4;
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;
        color: #1D2646;
    }
`
export const PopularMainCat = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    width: 100%;
    a{
        /* margin-right: 30px; */
        @media screen and (max-width: 480px) {
            margin: 0;
        }
        &:last-of-type{
            margin-right: 0px;
        }
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        margin: 0px auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        /* flex-flow:row wrap; */
        /* justify-content: space-between; */
        /* padding: 0px; */
        /* padding-bottom: 100px; */
    }

`
export const Cat = styled.div`
    /* height: 139px; */
    min-width: 100px;
    border-radius: 5px;
    background: #F3F6FF;
    border: 1px solid #E7E8E5;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 5px 20px;
    border-radius: 50px;
    margin-bottom: 15px;
    margin-right: 10px;
    &:hover{
        cursor: pointer;
        /* box-shadow: 0px 0px 3px #E7E8E5; */
        border: 3px solid #E7E8E5;
        padding: 2px 18px;
        

    }
    @media screen and (max-width: 480px) {
        min-width: 80px;
        height: 30px;
        padding: 25px 10px;
        margin: 0px;
        border-radius: 30px;
    }

    h3{
        //styleName: body 2 ;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: center;
        text-transform: capitalize;
        @media screen and (max-width: 480px) {
            font-size: 12px;
        }
    }

`
export const Catimg = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
@media screen and (max-width: 480px) {
    height: 40px;
    width: 40px;

}
`
export const Billimg = styled.img`
    width: ${props=>props.width};
    height: ${props=>props.height};
    position: absolute;
    top: ${props=>props.top};
    left: ${props=>props.left};
    z-index:100;
    @media screen and (max-width: 480px) {
        display: none;
    }

`

export const SidebarContainer = styled.div`
height: calc(100vh - 80px);
width: 30%;
border: 1px solid rgba(116,116,120,.2);
margin-top: 80px;
/* overflow: scroll; */
@media screen and (max-width: 480px) {
    width: 100%;
    height: 100vh;
    border: none;
    display: ${props=> props.sidebar ? 'none':''};
}


`
export const DashSearchContainer = styled.div`
    width: 310px;
    height: 50px;
    background: #F9F9F9;
    border: 1px solid rgba(43, 44, 62, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto 10px;
    overflow: hidden;
    @media screen and (max-width: 480px) {
        width: 80%;
    }

    
    `
export const BackContainer = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding-left: 10px;
    margin: 0 auto 10px;
    span{
        width: 33px;
        height: 33px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background:rgba(57,77,147,.2);
        margin-right: 20px;
        display: none;
        @media screen and (max-width: 480px) {
            display: flex;
        }
    }    
    h2{
        //styleName: Header 4;
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;
        margin: 0;
        @media screen and (max-width: 480px) {
            font-family: Poppins;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
        }
    }
`

export const DashSearchIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 0 5px;
`
export const DashSearchInput = styled.input`
    width: 90%;
    height: 100%;
    outline: none;
    border: none;
    background: #F9F9F9;
    border-left:1px solid rgba(116,116,120,.2);
    //styleName: body 3;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #2B2C3E;
    padding-left: 20px;
    @media screen and (max-width: 480px) {
        width: 80%;
    }
`
export const DashMain = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    @media screen and (max-width: 480px) {
        flex-flow: column;
    }
`
export const DashListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    border-top: 1px solid rgba(116,116,120,.2);
    overflow: scroll;
    padding-bottom: 200px;
    @media screen and (max-width: 480px) {
        padding-bottom: 500px;
    }
    .proceed{
        width: 100%;
        /* height:100px; */
        padding:30px;
        background: #F9F9F9;
        position: fixed;
        bottom: 0px;
        left: 0px;
        display: none;
        @media screen and (max-width: 480px) {
            display: block;
        }
    }
    .btn{
    }
    .paybtn{
        height: 50px;
        width: 100%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #DC0D11;
        border: none;
        outline: none;
        color: #FFFFFF;
        margin-top: 20px;
        
        &:hover{
            cursor: pointer;
        }
    }
    .paybtn_not{
            background-color: #ccc;
            color:#1D2646;
            height: 50px;
            width: 100%;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            outline: none;
            color: #FFFFFF;
            margin-top: 20px;
            pointer-events: none;
            &:hover{
                cursor: pointer;
            }
        }
`
export const DashListsContent = styled.ul`
width: 310px;
margin: 0 auto;
display: flex;
padding: 20px 0;
flex-flow: column;

.active{
        cursor: pointer;
        background: #ECF1FF;
        border: 1px solid #2C63EA;

}
li{
    width: 100%;
    height: 90px;
    border-radius: 10px;
    background: #F8F8F8;
    border: 1px solid rgba(29, 38, 70, 0.1);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: all ease-in-out .3s;
    margin-bottom: 20px;
    &:hover{
        cursor: pointer;
        background: #ECF1FF;
        border: 1px solid #2C63EA;
    }

    .listnames{
        width: 80%;
        display: flex;
        flex-flow: column;
        h4{
            //styleName: Body 2 medium;
            font-family: Poppins;
            font-size: 14px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: 0em;
            text-align: left;
            color: #2B2C3E;
            margin: 0;
        }
        h5{
            //styleName: Small 1;
            font-family: Poppins;
            font-size: 10px;
            font-weight: 500;
            line-height: 15px;
            letter-spacing: 0em;
            text-align: left;
            color: #2B2C3E;
            margin: 0;
        }
    }
}
`
export const DashListcheck = styled.img`
    
`
export const DListimg = styled.img`
    width: 90px;
    height: 90px;
    border: 1px solid #E3E3E4;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #E3E3E4;
    font-size: 20;
    font-weight: 600;
    @media screen and (max-width: 480px) {
        width: 50px;
        height: 50px;
        
    }
`
export const DashMainContent = styled.div`
    width: 70%;
    height: calc(100vh - 80px);
    margin-top: 80px;
    border-top: 1px solid rgba(116,116,120,.2);
    overflow: scroll;
    /* direction: rtl; */
    @media screen and (max-width: 480px) {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        right: ${props=> props.detail ? '0%':'-100%'};
        background: #fff;
    }
    .dashheader{
        width: 100%;
        height: 150px;
        background: #F9F9F9;
        padding: 30px;
        display: flex;
        align-items: center;
        direction: ltr;
        @media screen and (max-width: 480px) {
            direction: rtl;
            justify-content: space-between;
        }
        .namecontainer{
            display: flex;
            align-items: center;
        }
        .backbtn{
            height: 33px;
            width: 33px;
            border-radius: 40px;
            background: rgba(57, 77, 147, .1);
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            display: none;
            @media screen and (max-width: 480px) {
               display: flex;
            }
            &:hover{
                cursor: pointer;
            }
            img{
                width:20px;
                height: 10px;
            }
        }
        h3{
            //styleName: Header 3;
            font-family: Poppins;
            font-size: 24px;
            font-weight: 600;
            line-height: 36px;
            letter-spacing: 0em;
            text-align: left;
            color: #1D2646;
            margin: 0;
            @media screen and (max-width: 480px) {
                font-size: 14px;
                color: #394D93;
                line-height: 20px;
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
            color: #1D2646;
            margin: 0;
            @media screen and (max-width: 480px) {
                font-size: 13px;
            }
        }
    }
    .dashcontent{
        width: 100%;
        height: 100%;
        padding: 30px 100px;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 480px) {
            flex-flow: column;
            width: 90%;
            margin: 0 auto;
            padding: 0;
        }
        h3{
            //styleName: Header 5;
            font-family: Poppins;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
            color: #2B2C3E;
        }
        &_left{
            width: 60%;
            height: fit-content;
            padding-bottom: 100px;
            @media screen and (max-width: 480px) {
                width: 100%;
                order: 1;
                padding:0;
            }
            .disabled{
                background-color:#ccc !important ;
                pointer-events: none;
                input{
                    pointer-events: none;
                    background-color:#ccc !important ;
                }
            }
            .input_container{
                border: 1px solid rgba(29, 38, 70, 0.1);
                width: 100%;
                height: 50px;
                background: #FFFFFF;
                box-sizing: border-box;
                border-radius: 10px;
                overflow: hidden;
                margin: 20px 0;
                @media screen and (max-width: 480px) {
                
                }
                input{   
                    width: 95%;
                    height: 100%;
                    border: none;
                    outline: none;
                    padding-left: 20px;
                    //styleName: body 2 ;
                    font-family: Poppins;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #2B2C3E;
                }
                span{
                    //styleName: Body 1 ;
                    font-family: Poppins;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #DCDCDC;
                }
                select{
                    width: 98%;
                    height: 100%;
                    border: none;
                    outline: none;
                    padding-left: 20px;
                    //styleName: body 2 ;
                    font-family: Poppins;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #2B2C3E;
                }

            }
            .input_div{
                label{
                    font-size: 13px;
                    margin:0;
                    margin-left:5px ;
                    font-weight: 700;
                }
                .input_container{
                    margin-top: 2px !important;
                }
            }
            
            .subtext{
                display: flex;
                flex-flow: column;
                margin-top: 40px;
                h3{
                    font-family: Poppins;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 0px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #2B2C3E;
                }
                p{
                    //styleName: body 3;
                    font-family: Poppins;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 10px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #1D2646;
                    margin: 0;
                }
            }
        }
        &_right{
            width: 30%;
            @media screen and (max-width: 480px) {
                width: 100%;
                order: 2;
                padding-bottom:300px;
                position: relative;
            }
            .dashpay{
                height: 172px;
                width: 100%;
                border-radius: 10px;
                border: 1px solid #E3E3E4;
                box-sizing: border-box;
                margin-top: 50px;
                padding: 20px;
                @media screen and (max-width: 480px) {
                    background: #F9F9F9;
                    position: fixed;
                    bottom: 0px;
                    left: 0;
                    border: none;
                    border-radius: 0;
                    padding: 31px;
                }
                h3{
                    //styleName: body 2 ;
                    font-family: Poppins;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                    letter-spacing: 0em;
                    text-align: left;
                    color: #1D2646;
                    margin: 0;
                }
                .price{
                    @media screen and (max-width: 480px) {
                        
                    }
                    span{
                        //styleName: Body 1 ;
                        font-family: Poppins;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        letter-spacing: 0em;
                        text-align: left;
                        @media screen and (max-width: 480px) {
                            font-family: Poppins;
                            font-size: 27px;
                            font-weight: 600;
                            line-height: 41px;
                        }
                    }
                    h2{
                        //styleName: Header 3;
                        font-family: Poppins;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 36px;
                        letter-spacing: 0em;
                        text-align: left;
                        color: #1D2646;
                        margin: 0;
                        @media screen and (max-width: 480px) {
                            font-family: Poppins;
                            font-size: 27px;
                            font-weight: 600;
                            line-height: 41px;
                            letter-spacing: 0em;
                            text-align: left;
                        }
                    }
                }
                .paybtn{
                    height: 50px;
                    width: 100%;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #DC0D11;
                    border: none;
                    outline: none;
                    color: #FFFFFF;
                    margin-top: 20px;
                    
                    &:hover{
                        cursor: pointer;
                        cursor: pointer;
                        background: #B30020;
                        box-shadow: 0px 10px 20px rgba(220, 13, 17, 0.25);
                    }
                }
                .paybtn_not{
                        background-color: #ccc;
                        color:#1D2646;
                        height: 50px;
                        width: 100%;
                        border-radius: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: none;
                        outline: none;
                        color: #FFFFFF;
                        margin-top: 20px;
                        pointer-events: none;
                        &:hover{
                            cursor: pointer;
                        }
                    }
            }
        }

    }
`
export const DashListimg = styled.img`
    width: 48px;
    height: 48px;
    border: 1px solid #E3E3E4;
    border-radius: 10px;
`
export const DashPlaceholder = styled.div`
    width: 48px;
    height: 48px;
    border: 1px solid #E3E3E4;
    border-radius: 10px;
    background-color: #1D2646;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #E3E3E4;
    font-size: 12px;
    font-weight: 600;
`
export const ModalContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.1);
    width: 100%;
    height: 100vh;
    z-index: 500;
    display: ${props=> props.show ? 'flex':'none'};
`
export const Modalbox = styled.div`
    height: 481px;
    width: 338px;
    border-radius: 20px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    background: #fff;
    z-index: 600;
    display: flex;
    padding: 40px 30px;
    flex-flow: column;
    align-items: center;
    h2{
        //styleName: Header 4;
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;
        color: #2B2C3E;
        margin: 16px 0;
    }
    p{
        //styleName: body 3;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        color: #2B2C3E;
        margin: 16px 0;
    }
    button{
        width: 100%;
        height: 50px;

        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        margin-bottom: 20px;
        //styleName: Body 1 medium;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;
    }
    .red{
            color: #fff;
            background: #DC0D11;
        }
        .blue{
            color: #2C63EA;
            background: #ECF1FF;

        }
`
export const Paywith = styled.div`
    height: 200px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    pointer-events: ${ props=> props.disabled ? 'none': 'all' };
    box-shadow:0px 0px 3px rgba(0,0,0,.2);
    margin-bottom: 20px;
    //styleName: Body 1 medium;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    background-color:  ${ props=> props.disabled ? 'rgba(0,0,0,.1)': '#fff' };
    &:hover{
        cursor: pointer;
        box-shadow:0px 0px 5px rgba(0,0,0,.4);

    }
`
