// import Image from "next/image";
import { ImageContainer, HeaderImage } from "./imgElement";

export default function Img(props){
    return (
        <ImageContainer>
            <HeaderImage
                src='/img/pic1.png'
                alt={props.alt}
                width={'150px'}
                height={'150px'}
                bottom={`160px`}
                left={`15px`}
                mwidth={'80px'}
                mheight={'80px'}
                mbottom={`50px`}
                mleft={`0px`}
            />
            <HeaderImage
                src='/img/pic4.png'
                // src={props.src}
                alt={props.alt}
                width={'250px'}
                height={'400px'}
                bottom={`100px`}
                left={`38%`}
                mwidth={'131px'}
                mheight={'221px'}
                mbottom={`-20px`}
                mleft={`26%`}
            />
            <HeaderImage
                src='/img/pic2.png'
                // src={props.src}
                alt={props.alt}
                width={'150px'}
                height={'150px'}
                bottom={`410px`}
                left={`95%`}
                mwidth={'87px'}
                mheight={'88px'}
                mbottom={`180px`}
                mleft={`70%`}
            />
            <HeaderImage
                src='/img/pic3.png'
                // src={props.src}
                alt={props.alt}
                width={'200px'}
                height={'300px'}
                bottom={`90px`}
                left={`95%`}
                mwidth={'111px'}
                mheight={'168px'}
                mbottom={`0px`}
                mleft={`70%`}
            />
            
        </ImageContainer>
    );
}