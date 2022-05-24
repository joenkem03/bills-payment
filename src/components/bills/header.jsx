import { BillheaderContainer, Billimg } from './billsElements';
import SearchBar from './searchbar';

export default function Billsheader({data}){
    return (
        <BillheaderContainer>
            <div className="billcontainer">
                <h2 className="">Make Bill Payments</h2>
                <p>Enter the type of bill you would like to pay </p>
            </div>
            <SearchBar props={data}/>
            
            <Billimg 
                src='/img/person.svg'
                width='120px'
                height='200px'
                top='100px'
                left='90px'
            />
            <Billimg 
                src='/img/card2.svg'
                width='70px'
                height='70px'
                top='150px'
                left='270px'
            />
            <Billimg 
                src='/img/wallet.svg'
                width='70px'
                height='70px'
                top='100px'
                left='350px'
            />
            <Billimg 
                src='/img/dollar.svg'
                width='57px'
                height='57px'
                top='200px'
                left='1080px'
            />
            <Billimg 
                src='/img/dollar.svg'
                width='57px'
                height='57px'
                top='150px'
                left='980px'
            />
            <Billimg 
                src='/img/dollar.svg'
                width='57px'
                height='57px'
                top='170px'
                left='350px'
            />
            <Billimg 
                src='/img/card1.svg'
                width='127px'
                height='97px'
                top='100px'
                left='1050px'
            />
        </BillheaderContainer>
    );
}