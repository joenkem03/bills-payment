import { ButtonDefault } from "./buttonElements";

export default function Button(props) {
    
    return (
        <ButtonDefault onClick={props.click}>
            {props.text}
        </ButtonDefault>
    );
}