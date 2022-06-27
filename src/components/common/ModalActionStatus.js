import React from "react";
import {
  Row,
  CardTitle,
  CardText,
  Col,
  Button
} from "reactstrap";
// import { Link } from "react-router-dom";




const ModalActionStatus = ({actionTitle, actionMessage, closeModal}) => {
  // const sessionContext = useContext(SessionContext);
  // const [isLoading, setisLoading] = useState(false);
  // const [isError, setisError] = useState(false);
  // const [message, setMessage] = useState("");
  // const [loaded, setLoaded] = useState(false);

  // const [isNotError, setIsNotError] = useState(false);

  return (
    <>
            <Row className="form-input">
              <Col xxs="12" md="12" sm="12" xs="12">
                <CardTitle className="mt-4">
                <span className="head-text">{actionTitle}</span> 
                </CardTitle>
              </Col>
            </Row>
                    <Row className="form-input">
                <Col>
                  
                <div className="text-center">
                  <img
                    src="/assets/img/tick.png"
                    alt="success icon"
                  />
                </div>
                </Col>
                      <Col sm="12">
                        <CardText className="simple-user-text-center pt-3">
                        <p className="text-muted">{actionMessage}</p>
                        </CardText>
                      </Col>
                    </Row>

                    <hr className="my-4"/>
                    <Row className="user-input-btn">
                      <Col sm="8"/>
                      <Col sm="4">
                        <Button
                          className="btn btn-orange btn-lg btn-shadow user-input-btn-f"
                          style={{ alignSelf: "flex-end" }}
                          // href="#"
                          role="button"
                          onClick={() => closeModal}
                        > Close &gt;&gt;
                        </Button>
                      </Col>
                    </Row>
    </>
  );
};
// npx browserslist@latest --update-db
export default ModalActionStatus;
