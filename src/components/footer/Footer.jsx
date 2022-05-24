import { FooterContainer } from '../Home/HomeElements';
import { Section, Container } from './../Layout/layoutElement';
import { ButtonMain } from '../button/buttonElements';
import MainButton from '../button/MainButton';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <Section bg='#1D2646' padding='28px 0px'>
            <Container>
                <FooterContainer>
                    <div className="footer_contacts">
                        <div className="footer_contacts_contact">
                            <h3 className="">Contact our team.</h3>
                            <div className="footer_contact">
                                <div className="footer_contact_item">
                                    <img src='/img/mail.svg' alt='' width={28} height={28} />
                                    <h4><a href="mailto:info@icadconcord.com.ng">info@icadconcord.com.ng</a></h4>
                                </div>
                                <div className="footer_contact_item">
                                    <img src='/img/phone.svg' alt='' width={28} height={28} />
                                    <h4><a href="tel:+2347031696693">+234-7031696693</a></h4>
                                </div>
                            </div>
                        </div>
                        <div className="footer_contacts_social footer_show">
                            <ul className="footer_contacts_social_list">
                                <li className='footer_contacts_social_item'><a href="https://www.facebook.com/ICADPay" className="footer_contacts_social_link"><img src='/img/facebook.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="https://twitter.com/icadpayng" className="footer_contacts_social_link"><img src='/img/twitter.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="https://www.instagram.com/icadpay/" className="footer_contacts_social_link"><img src='/img/instagram.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="https://www.linkedin.com/company/icadpay" className="footer_contacts_social_link"><img src='/img/linkden.svg' alt='' width={20} height={20}/></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer_menu">
                        <div className="footer_menu_nav">
                            
                            <Link to='/' >
                                <img src='/img/logow.png' alt='' width={116} height={39} />
                            </Link>

                            <ul className="footer_menu_nav_list">
                                <li className="footer_menu_nav_item"><Link to="/bills" className="footer_menu_nav_link">Pay Bills</Link></li>
                                <li className="footer_menu_nav_item"><Link to="/" className="footer_menu_nav_link">For Businessess</Link></li>
                                <li className="footer_menu_nav_item"><Link to="/" className="footer_menu_nav_link">Documentation</Link></li>
                            </ul>
                        </div>
                        <div className="footer_menu_btn">
                            <MainButton text='Get started' main={true}/>
                        </div>
                    </div>
                    
                    <div className="footer_copyright">
                        <div className="footer_contacts_social footer_hidden">
                            <ul className="footer_contacts_social_list">
                                <li className='footer_contacts_social_item'><a href="" className="footer_contacts_social_link"><img src='/img/facebook.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="" className="footer_contacts_social_link"><img src='/img/twitter.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="" className="footer_contacts_social_link"><img src='/img/instagram.svg' alt='' width={20} height={20}/></a></li>
                                <li className='footer_contacts_social_item'><a href="" className="footer_contacts_social_link"><img src='/img/linkden.svg' alt='' width={20} height={20}/></a></li>
                            </ul>
                        </div>
                        <div className="footer_copyright_rights">
                            <h4>2022  Icadpay. All Rights Reserved</h4>
                        </div>
                        <div className="footer_copyright_policy">
                            <a href="" className="">Privacy Policy</a>
                            <a href="" className="">Cookies</a>
                        </div>
                    </div>
                </FooterContainer>
            </Container>
        </Section>
    );
}