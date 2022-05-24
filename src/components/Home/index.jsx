import Footer from "../footer/Footer";
import Header from "../header/Header";
import Collection from "./Collection";
import Features from "./Features";
import Getstarted from "./Getstarted";
import Services from './Services';


export default function Homepage(){
    return (
        <>
            <Header/>
            <Getstarted/>
            <Features/>
            <Collection/>
            <Services/>
            <Footer/>
        </>
    );
}
