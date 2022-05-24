import styled  from 'styled-components';


export const HeaderMain = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 70px 0px;
    
    @media screen and (max-width: 480px) {
        padding:33px 0px ;
    }

`
export const HeaderContainer = styled.div`
    width: 72%;
    margin: 0px auto;

`
export const HeaderContents = styled.div``
export const HeaderPic = styled.div``
export const HeaderTitle = styled.h1`
    //styleName: Header 1;
    font-family: Poppins;
    font-size: 60px;
    font-weight: 600;
    line-height: 66px;
    text-align: left;
    color: #1D2646;
    margin-bottom: 30px;
    margin-top: 100px;
    @media screen and (max-width: 480px) {
        font-family: Poppins;
        font-size: 30px;
        font-weight: 600;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
   
    }
`
export const HeaderParagraph = styled.p`
    //styleName: Body 1 ;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: #1D2646;
    margin-bottom: 30px;
    @media screen and (max-width: 480px) {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;   
    }
    
`