
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, CardTitle, FormGroup, Label, Card, CardBody } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import { GetMerchantProfileService } from 'services/ProtectedService';
import { Colxx } from 'components/common/CustomBootstrap';
// import AlertNotice from 'components/common/alert';
// import ModalActionStatus from 'components/common/ModalActionStatus';

const MerchantApi = ({merchant}) => {
  // const [modalRight, setModalRight] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [message, setMessage] = useState('');
//   const [merchant, setMerchant] = useState([]);
  
  
//   useEffect(() => {
//     // if (option === null) {
//       GetMerchantProfileService().then((ret) => {
//         // console.log(ret);
//         // if(ret.data.length > 0){
//         //   ret.data.forEach(element => {
//         //     // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
//         //       options.push({ value: element.id, label: `${element.name}` });              
//         //     // }
//         //   });
//           setMerchant(ret.data);
//         // }
//       });
//     // }
//     // }
// }, []);

    

const registerScheme = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  // individualOrNon: Yup.string().required("Required"),
  email: Yup.string().required('Required').email('Invalid email'),
  // address: Yup.string().required(),
  phone: Yup.string().required('Required'),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
};


  // const handleSubmit = async (inputData) => {
  const handleSubmit = async () => {
    // setIsLoading(true);

    // try {
    //   const req = {
    //     firstName: inputData.firstName,
    //     lastName: inputData.lastName,
    //     phone: inputData.phone,
    //     email: inputData.email,
    //   };
    //   console.log('signing up');
    //   console.log(req);

    //   NewSubAccount(req).then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       setIsSuccess(true);
    //       setIsLoading(false);
    //     }
    //     if (response.status === 400) {
    //       setIsLoading(false);
    //       setIsError(true);
    //       setMessage(response.data.data);
    //     } else {
    //       setIsLoading(false);
    //       setIsError(true);
    //       console.log(response);
    //       setMessage(
    //         'Error occured! Kindly check that email and phone number are not previously registered'
    //       );
    //     }
    //   }).catch ((et) => {
    //     console.log('error');
    //     console.log(et);
    //     setIsLoading(false);
    //     setIsError(true);
    //     setMessage(et.data);
    //   });
    // } catch (e) {
    //   console.log('error');
    //   console.log(e);
    //   setIsLoading(false);
    //   setIsError(true);
    //   setMessage(e.data);
    // }
  };

  
  
  return (
    <>
      <Row className="pb-1">
      <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
      <Card>
        <CardBody>
          <CardTitle className="d-block d-md-inline-block pt-1">
            {/* <IntlMessages id="table.divided" /> */}
            {/* <h1>{pagetitle}</h1> */}
            <h3>Test API Key</h3>
          </CardTitle>
        <Colxx xxs="12">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={registerScheme}
              >
                {() => (
          <Form>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Public Key
                    </Label>
                    <Field
                      className="form-control"
                      // name="firstName"
                      value={merchant.testPublicKey}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Private Key
                    </Label>
                    <Field
                      className="form-control"
                      // name="firstName"
                      value={merchant.testPrivateKey}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
          </Form>
                )}
              </Formik>
        </Colxx>
        </CardBody>
        </Card>
        </Colxx>
      </Row>
      
      <Row className="pt-1">
      <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
      <Card>
        <CardBody>
          <CardTitle className="d-block d-md-inline-block pt-1">
            {/* <IntlMessages id="table.divided" /> */}
            {/* <h1>{pagetitle}</h1> */}
            <h3>Live API Key</h3>
          </CardTitle>
        <Colxx xxs="12">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={registerScheme}
              >
                {() => (
          <Form>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Public Key
                    </Label>
                    <Field
                      className="form-control"
                      // name="firstName"
                      value={merchant.productionPublicKey}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Private Key
                    </Label>
                    <Field
                      className="form-control"
                      // name="firstName"
                      value={merchant.productionPrivateKey}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
          </Form>
                )}
              </Formik>
        </Colxx>
        </CardBody>
        </Card>
        </Colxx>
      </Row>


    </>
  );
};

export default MerchantApi;
