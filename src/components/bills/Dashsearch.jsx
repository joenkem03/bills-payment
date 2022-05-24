import { DashSearchContainer, DashSearchIcon, DashSearchInput,BackContainer } from './billsElements';
// import Image from 'next/image';
export default function DashSearch() {
    return (
        <>
            <DashSearchContainer>
                <DashSearchIcon
                    src='/img/search.svg'
                    />
                <DashSearchInput/>
            </DashSearchContainer>
            <BackContainer>
                <span className="">
                    <img src='/img/arrow_left.png' alt='' width={`15px`} height={`12px`}/>
                </span>
                <h2>Choose your  package </h2>
            </BackContainer>
        </>
    );
}