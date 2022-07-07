import styled from 'styled-components'


export const NavContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0px 80px;
    position: fixed;
    background: #FFFFFF;
    z-index: 1;
    @media screen and (max-width: 480px) {
        height: 99px;
        padding: 0px 32px;
    }
    /* border-bottom: 1px solid #ccc; */
`
export const Nav = styled.div`
    display: flex;
    align-items: center;
    
`
export const NavLogo = styled.img`
    height: 39px;
    width: 116px;
    margin-right: 150px;
    &:hover{
        cursor: pointer;
    }
`
export const Menu = styled.ul`
    display:flex;
    justify-content: space-between;
    @media screen and (max-width: 480px) {
        display: none;
    }
`
export const MenuItem = styled.li`
    margin-right: 49px;
    a{
        text-decoration: none;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        color: #2B2C3E;
        width: fit-content;
        padding: 5px;
        &:hover{
            font-weight: 700;
        }
    }
`

export const ButtonContainer = styled.div`
    /* width: 30%; */
    @media screen and (max-width: 480px) {
        display:none;
    }
    `
export const MobileMenu = styled.div`
    /* width: 30%; */
    display: none;
    @media screen and (max-width: 480px) {
        display: block;
    }

    button{
        background: none;
        border: none;
        outline: none;
    }
    button.menubtn{
        background: none;
        border: none;
        outline: none;
        font-size: 30px;
    }
    .mobile{
        &_container{
        height: 100vh;
        width: 80%;
        background: #FFFFFF;
        position: absolute;
        left: ${props=>props.open ? '0':'-100%'};
        top: 0;
        box-shadow: 84px 0px 0px 0px rgba(0,0,0,0.22);
        padding: 120px 55px;
        overflow: hidden;
        transition: all ease-in-out .3s;
        }
        &_close{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #E7E8E5;
        color: #FFFFFF;
        font-size: 30px;
        position: absolute;
        top: 30px;
        right: 30px;
        }
        &_menu{
            display: flex;
            flex-flow: column;
            align-items: center;
            ul{
                width: 100%;
                padding: 0;
                margin-top: 100px;
                li{
                    margin-bottom: 44px;
                    a{
                        font-family: Poppins;
                        font-size: 17px;
                        font-weight: 500;
                        line-height: 26px;
                        letter-spacing: 0em;
                        text-align: left;

                    }
                }
            }
        }
    }
`