import { ModalContainer,Modalbox,Paywith } from './../bills/billsElements';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import Skeleton from 'react-loading-skeleton';
import { Typography } from "@mui/material";

export default function PaymentModal(props){
    // const navigate = useNavigate();
    const handleContinue = ()=>{
        props.close();
    }
    
    return (
        <ModalContainer show={props.show}>
            <Modalbox>
                {
                    props.sendQr && (
                        <>
                        <div style={{ background: 'white', padding: '16px', marginBottom:'30px' }}>
                            {
                                props.qrvalue ? <QRCode value={props.qrvalue} /> : <Skeleton width={250} height={250}/>
                            }
                        </div>
                            {/* <Paywith onClick={props.back}> Pay with QR</Paywith> */}
                            <button className='blue' onClick={props.back} >back</button> 
                        </>
                    )
                }
                {
                    !props.sendQr && (
                        <>
                            <Paywith disabled={true} onClick={props.handleQr}>
                                Pay with QR
                                <Typography variant="caption">Pay With Qr Unavailable at the Moment</Typography>
                            </Paywith>
                            <Paywith disabled={false} onClick={props.handleOther}>Other Payment Options</Paywith>
                        </>
                    )
                }
                <button className='red' onClick={handleContinue} >Close</button> 
            </Modalbox>
        </ModalContainer>
    );
}