import styled from 'styled-components';

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    height: 90vh;
    margin-top: 30px;
    @media screen and (max-width: 480px) {
        height: 34vh;
    }
    img{
        position: absolute;
    }
`

export const HeaderImage = styled.img`
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