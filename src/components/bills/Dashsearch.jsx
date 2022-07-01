import { DashSearchContainer, DashSearchIcon, DashSearchInput,BackContainer } from './billsElements';
// import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
export default function DashSearch() {
    const navigate = useNavigate();

    const back = () => {
        navigate('/bills');
    }
    return (
        <>
            <DashSearchContainer>
                <DashSearchIcon
                    src='/img/search.svg'
                    />
                <DashSearchInput/>
            </DashSearchContainer>
            <BackContainer>
                <span className="" onClick={back}>
                    <img src='/img/arrow_left.png' alt='' width={`15px`} height={`12px`}/>
                </span>
                <h2>Choose your  package </h2>
            </BackContainer>
        </>
    );
}