import * as React from 'react';
import { QRCode } from 'react-qrcode-logo';
// import pageLogo from "../assets/logos/white-full.png";
import pageLogo from "../../assets/logos/white-full.png";


const DynamicQr = ({ qrMessage }) => {
    console.log(qrMessage);
    return (
        <QRCode value={qrMessage} logoImage={pageLogo} size={300} />
    );
};

export default DynamicQr;