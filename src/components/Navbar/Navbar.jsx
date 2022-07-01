import { useState } from "react";
import { Menu, MenuItem, NavContainer, NavLogo , ButtonContainer, Nav, MobileMenu} from "./NavbarElements"
import { Link } from "react-router-dom";
import Button from "../button/button"
// import { useNavigate } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";

export default function Navbar(){
    const [open,setopen] =useState(false)

    // let navigate = useNavigate();

    const toggleMenu = (e)=>{
        e.preventDefault();
        setopen(!open);
    }

   
    const navigateToLogin = ()=>{
        // window.location.replace('https://icadpay.com/user/login')
        window.open('https://icadpay.com/user/login', "_blank")

    }
    
    const handleClicked = ()=>{
        setopen(!open);
    }
    return(
        <NavContainer>
            <Nav>
                <Link to='/' passto>
                    <NavLogo src="/img/logo.png" alt=""/>
                </Link>
                <Menu>
                    <MenuItem><Link to={`/bills`}>Pay bills</Link></MenuItem>
                    <MenuItem><Link to={`/`}>For businesses </Link></MenuItem>
                    <MenuItem><a href={`https://icadpay.com/developers/index.html`} target="_blank" rel="noreferrer" >Documentation </a></MenuItem>
                </Menu>
            </Nav>
            <ButtonContainer>
                <Button text={`Login`} click={navigateToLogin} />
            </ButtonContainer>
            <MobileMenu open={open}>
                <button className="menubtn" onClick={toggleMenu}>
                    <FiMenu/>
                </button>
                <div className="mobile_container">
                    <button className="mobile_close" onClick={toggleMenu}>
                        <GrFormClose/>
                    </button>
                    <div className="mobile_menu">
                        <div className="">
                            <Link  to='/bills' onClick={handleClicked}>
                                <NavLogo src="/img/logo.png" alt="" />
                            </Link>
                        </div>
                        <ul>
                            <li className=""><Link to={`/bills`} onClick={handleClicked}>Pay Bills </Link></li>
                            <li className=""><Link to={`/`} onClick={handleClicked}>For Businessess</Link></li>
                            <li className=""><a href={`https://icadpay.com/developers/index.html`} onClick={handleClicked} target="_blank" rel="noreferrer" >Documentation </a></li>
                        </ul>
                        <Button text={`Login`} click={navigateToLogin} />
                       
                    </div>
                </div>
            </MobileMenu>
        </NavContainer>
    )
}