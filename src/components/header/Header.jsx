
import { HeaderMain, HeaderParagraph,HeaderTitle } from './HeaderElements';
import { Container,Column } from './../Layout/layoutElement';
import Img from './../image/img';
import MainButton from './../button/MainButton';
import { useNavigate } from 'react-router-dom';

export default function Header () {
    const navigate = useNavigate()
    const hadleregister = ()=>{
        navigate('/user/register')
        // window.location.href('' )
        // window.open('https://portal.icadpay.com/user/register', "_blank")
    }
    return (
        <HeaderMain>
            <Container>
                <Column divide={2}>
                    <HeaderTitle>Make Swift & seamless payments</HeaderTitle>
                    <HeaderParagraph>We are your one-stop payment service for payment collections and disbursement with the widest choice of payment methods and schemes to support your organization and make transactions easier.</HeaderParagraph>
                    <MainButton text={`Register`} click={hadleregister} main={true} />
                </Column>
                <Column divide={2}>
                    <Img alt={'picture one'} />
                </Column>
            </Container>
        </HeaderMain>
    );
}