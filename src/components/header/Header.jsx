
import { HeaderMain, HeaderParagraph,HeaderTitle } from './HeaderElements';
import { Container,Column } from './../Layout/layoutElement';
// import Button from '../button/button';
// import { ButtonMain } from '../button/buttonElements';
import Img from './../image/img';
import MainButton from './../button/MainButton';

export default function Header () {
    return (
        <HeaderMain>
            <Container>
                <Column divide={2}>
                    <HeaderTitle>Make Swift & seamless payments</HeaderTitle>
                    <HeaderParagraph>We are your one-stop payment service for payment collections and disbursement with the widest choice of payment methods and schemes to support your organization and make transactions easier.</HeaderParagraph>
                    <MainButton text={`Get started`} main={true} />
                </Column>
                <Column divide={2}>
                    <Img alt={'picture one'} />
                </Column>
            </Container>
        </HeaderMain>
    );
}