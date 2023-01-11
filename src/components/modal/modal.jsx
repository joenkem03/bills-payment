import { ModalContainer,Modalbox } from './../bills/billsElements';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
export default function Modal(props){
    // const navigate = useNavigate();
    // const handleContinue = ()=>{
    //     props.close();
    //     navigate('/bills')
    // }
    return (
        <ModalContainer show={props.show}>
            <Modalbox>
            <svg width="173" height="173" viewBox="0 0 173 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.1" cx="86.5" cy="86.5" r="86.5" fill="#3BC873"/>
            <circle opacity="0.2" cx="86.5" cy="86.5" r="70.5" fill="#3BC873"/>
            <circle opacity="0.3" cx="86.5" cy="86.5" r="49.5" fill="#3BC873"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M65.5 110.75V83.25C65.5 72.8791 65.5 67.6936 68.7218 64.4718C71.9437 61.25 77.1291 61.25 87.5 61.25H104C105.268 61.25 106.503 61.3931 107.689 61.664C102.398 63.0695 98.5 67.892 98.5 73.625V83.25L98.2283 110.659L90.25 108L82 110.75L73.75 108L65.5 110.75ZM119.25 83.25H102.5V73.625C102.5 68.9996 106.25 65.25 110.875 65.25C115.5 65.25 119.25 68.9996 119.25 73.625V83.25ZM71.75 72.25C71.75 71.1454 72.6454 70.25 73.75 70.25H90.25C91.3546 70.25 92.25 71.1454 92.25 72.25C92.25 73.3546 91.3546 74.25 90.25 74.25H73.75C72.6454 74.25 71.75 73.3546 71.75 72.25ZM71.75 83.25C71.75 82.1454 72.6454 81.25 73.75 81.25H79.25C80.3546 81.25 81.25 82.1454 81.25 83.25C81.25 84.3546 80.3546 85.25 79.25 85.25H73.75C72.6454 85.25 71.75 84.3546 71.75 83.25ZM71.75 94.25C71.75 93.1454 72.6454 92.25 73.75 92.25H84.75C85.8546 92.25 86.75 93.1454 86.75 94.25C86.75 95.3546 85.8546 96.25 84.75 96.25H73.75C72.6454 96.25 71.75 95.3546 71.75 94.25Z" fill="white"/>
            <path d="M65.5 110.75H64.5V112.137L65.8162 111.699L65.5 110.75ZM68.7218 64.4718L68.0147 63.7647L68.0147 63.7647L68.7218 64.4718ZM87.5 61.25V62.25V61.25ZM104 61.25V62.25V61.25ZM107.689 61.664L107.946 62.6304L107.912 60.6891L107.689 61.664ZM98.5 83.25L99.5 83.2599V83.25H98.5ZM98.2283 110.659L97.912 111.608L99.2146 112.042L99.2282 110.669L98.2283 110.659ZM90.25 108L90.5662 107.051L90.25 106.946L89.9338 107.051L90.25 108ZM82 110.75L81.6838 111.699L82 111.804L82.3162 111.699L82 110.75ZM73.75 108L74.0662 107.051L73.75 106.946L73.4338 107.051L73.75 108ZM102.5 83.25H101.5V84.25H102.5V83.25ZM119.25 83.25V84.25H120.25V83.25H119.25ZM64.5 83.25V110.75H66.5V83.25H64.5ZM68.0147 63.7647C66.187 65.5924 65.3293 67.9404 64.9116 71.0468C64.4979 74.1243 64.5 78.0928 64.5 83.25H66.5C66.5 78.0363 66.5021 74.2266 66.8938 71.3133C67.2816 68.4287 68.0348 66.5731 69.4289 65.1789L68.0147 63.7647ZM87.5 60.25C82.3428 60.25 78.3743 60.2479 75.2968 60.6616C72.1904 61.0793 69.8424 61.937 68.0147 63.7647L69.4289 65.1789C70.8231 63.7848 72.6787 63.0316 75.5633 62.6438C78.4766 62.2521 82.2863 62.25 87.5 62.25V60.25ZM104 60.25H87.5V62.25H104V60.25ZM107.912 60.6891C106.653 60.4016 105.344 60.25 104 60.25V62.25C105.193 62.25 106.353 62.3845 107.466 62.6389L107.912 60.6891ZM107.432 60.6975C101.715 62.2165 97.5 67.4273 97.5 73.625H99.5C99.5 68.3567 103.082 63.9225 107.946 62.6304L107.432 60.6975ZM97.5 73.625V83.25H99.5V73.625H97.5ZM99.2282 110.669L99.5 83.2599L97.5 83.2401L97.2283 110.649L99.2282 110.669ZM89.9338 108.949L97.912 111.608L98.5445 109.711L90.5662 107.051L89.9338 108.949ZM82.3162 111.699L90.5662 108.949L89.9338 107.051L81.6838 109.801L82.3162 111.699ZM73.4338 108.949L81.6838 111.699L82.3162 109.801L74.0662 107.051L73.4338 108.949ZM65.8162 111.699L74.0662 108.949L73.4338 107.051L65.1838 109.801L65.8162 111.699ZM102.5 84.25H119.25V82.25H102.5V84.25ZM101.5 73.625V83.25H103.5V73.625H101.5ZM110.875 64.25C105.697 64.25 101.5 68.4473 101.5 73.625H103.5C103.5 69.5519 106.802 66.25 110.875 66.25V64.25ZM120.25 73.625C120.25 68.4473 116.053 64.25 110.875 64.25V66.25C114.948 66.25 118.25 69.5519 118.25 73.625H120.25ZM120.25 83.25V73.625H118.25V83.25H120.25ZM73.75 69.25C72.0931 69.25 70.75 70.5931 70.75 72.25H72.75C72.75 71.6977 73.1977 71.25 73.75 71.25V69.25ZM90.25 69.25H73.75V71.25H90.25V69.25ZM93.25 72.25C93.25 70.5931 91.9069 69.25 90.25 69.25V71.25C90.8023 71.25 91.25 71.6977 91.25 72.25H93.25ZM90.25 75.25C91.9069 75.25 93.25 73.9069 93.25 72.25H91.25C91.25 72.8023 90.8023 73.25 90.25 73.25V75.25ZM73.75 75.25H90.25V73.25H73.75V75.25ZM70.75 72.25C70.75 73.9069 72.0931 75.25 73.75 75.25V73.25C73.1977 73.25 72.75 72.8023 72.75 72.25H70.75ZM73.75 80.25C72.0931 80.25 70.75 81.5931 70.75 83.25H72.75C72.75 82.6977 73.1977 82.25 73.75 82.25V80.25ZM79.25 80.25H73.75V82.25H79.25V80.25ZM82.25 83.25C82.25 81.5931 80.9069 80.25 79.25 80.25V82.25C79.8023 82.25 80.25 82.6977 80.25 83.25H82.25ZM79.25 86.25C80.9069 86.25 82.25 84.9069 82.25 83.25H80.25C80.25 83.8023 79.8023 84.25 79.25 84.25V86.25ZM73.75 86.25H79.25V84.25H73.75V86.25ZM70.75 83.25C70.75 84.9069 72.0931 86.25 73.75 86.25V84.25C73.1977 84.25 72.75 83.8023 72.75 83.25H70.75ZM73.75 91.25C72.0931 91.25 70.75 92.5931 70.75 94.25H72.75C72.75 93.6977 73.1977 93.25 73.75 93.25V91.25ZM84.75 91.25H73.75V93.25H84.75V91.25ZM87.75 94.25C87.75 92.5931 86.4069 91.25 84.75 91.25V93.25C85.3023 93.25 85.75 93.6977 85.75 94.25H87.75ZM84.75 97.25C86.4069 97.25 87.75 95.9069 87.75 94.25H85.75C85.75 94.8023 85.3023 95.25 84.75 95.25V97.25ZM73.75 97.25H84.75V95.25H73.75V97.25ZM70.75 94.25C70.75 95.9069 72.0931 97.25 73.75 97.25V95.25C73.1977 95.25 72.75 94.8023 72.75 94.25H70.75Z" fill="#3BC873"/>
            <mask id="path-6-outside-1_0_1" maskUnits="userSpaceOnUse" x="116" y="123" width="38" height="38" fill="black">
            <rect fill="white" x="116" y="123" width="38" height="38"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M135 157C143.284 157 150 150.284 150 142C150 133.716 143.284 127 135 127C126.716 127 120 133.716 120 142C120 150.284 126.716 157 135 157ZM134.101 147.639L142.434 137.639L140.898 136.358L133.265 145.517L129.04 141.292L127.625 142.706L132.625 147.706L133.4 148.48L134.101 147.639Z"/>
            </mask>
            <path fillRule="evenodd" clipRule="evenodd" d="M135 157C143.284 157 150 150.284 150 142C150 133.716 143.284 127 135 127C126.716 127 120 133.716 120 142C120 150.284 126.716 157 135 157ZM134.101 147.639L142.434 137.639L140.898 136.358L133.265 145.517L129.04 141.292L127.625 142.706L132.625 147.706L133.4 148.48L134.101 147.639Z" fill="#3BC873"/>
            <path d="M142.434 137.639L145.507 140.2L148.068 137.127L144.995 134.566L142.434 137.639ZM134.101 147.639L137.174 150.2L134.101 147.639ZM140.898 136.358L143.458 133.286L140.385 130.725L137.825 133.798L140.898 136.358ZM133.265 145.517L130.437 148.346L133.534 151.443L136.338 148.078L133.265 145.517ZM129.04 141.292L131.868 138.463L129.04 135.635L126.211 138.463L129.04 141.292ZM127.625 142.706L124.797 139.877L121.968 142.706L124.797 145.534L127.625 142.706ZM132.625 147.706L135.454 144.877L135.454 144.877L132.625 147.706ZM133.4 148.48L130.571 151.308L133.668 154.406L136.473 151.041L133.4 148.48ZM146 142C146 148.075 141.075 153 135 153V161C145.493 161 154 152.493 154 142H146ZM135 131C141.075 131 146 135.925 146 142H154C154 131.507 145.493 123 135 123V131ZM124 142C124 135.925 128.925 131 135 131V123C124.507 123 116 131.507 116 142H124ZM135 153C128.925 153 124 148.075 124 142H116C116 152.493 124.507 161 135 161V153ZM139.361 135.078L131.028 145.078L137.174 150.2L145.507 140.2L139.361 135.078ZM138.337 139.431L139.873 140.712L144.995 134.566L143.458 133.286L138.337 139.431ZM136.338 148.078L143.97 138.919L137.825 133.798L130.192 142.957L136.338 148.078ZM126.211 144.12L130.437 148.346L136.094 142.689L131.868 138.463L126.211 144.12ZM130.454 145.534L131.868 144.12L126.211 138.463L124.797 139.877L130.454 145.534ZM135.454 144.877L130.454 139.877L124.797 145.534L129.797 150.534L135.454 144.877ZM136.228 145.652L135.454 144.877L129.797 150.534L130.571 151.308L136.228 145.652ZM131.028 145.078L130.327 145.919L136.473 151.041L137.174 150.2L131.028 145.078Z" fill="white" mask="url(#path-6-outside-1_0_1)"/>
            </svg>
            <h2 className="">Payment succesful</h2>
            <p className="">Your {props.name} payment of ₦{props.amountPaid} was successful.<br /> Transaction ID: {props.transactionRef}</p>
            {
                props.ifPower && (
                    <Typography variant='h6'>{ props.val?.purchased_code }<br />  A receipt has been sent to your email. ,<br /> Transaction ID: {props.transactionRef}</Typography>
                )
            }
            <button className='red'><Link to='/bills' >Pay more Bills</Link></button> 
            {/* <button className='blue' onClick={handleContinue}>Continue</button> */}
            </Modalbox>
        </ModalContainer>
    );
}