import React, {useEffect, useState} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Document, Page, pdfjs} from 'react-pdf';
import {getCurrentUser} from '../../helpers/Utils';
import {VIEW_DOCUMENT} from '../../constants/defaultValues';

const ViewFile = ({ match }) => {
  const [numPages, setNumPages] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const currentUser = getCurrentUser();

  // let size;
  useEffect(() => {
    // document.body.classList.add("background");
    // document.body.classList.add("no-footer");

    const url = window.location.pathname;
    const file = url.replace('/app/', '');
    setPdfFile(file);
  }, []);

  const onDocumentLoadSuccess = ({ numPagesAll }) => {
    setNumPages(numPagesAll);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.blank-page" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.blank-page" />
          </p> */}

          <div className="container mb-5" style={{ width: 'max-content' }}>
            <div>
              {/* <h3 className="parcel-welcome">Complete Your Order</h3>
                <p className="parcel-welcome-sub">
                  Confirm the parcel details and find a Pranzit store closest to
                  your location for pick up
                </p> */}
            </div>
            <Row>
              <Col>
                <Card style={{ width: 'max-content' }}>
                  <CardBody>
                    <Document
                      // file="http://localhost:51882/Uploads/4/CAC/qbNGsY.pdf" http://localhost:51882/api/Admin/document?FileName=${pdfFile}
                      file={{
                        url: `${VIEW_DOCUMENT}?FileName=${pdfFile}`,
                        httpHeaders: { Authorization: `Bearer ${currentUser.token}` },
                        withCredentials: false,
                      }}
                      // options={{ workerSrc: "/pdf.worker.js" }}

                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={console.error}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                    <div>
                      <div className="pagec">
                        Page {pageNumber || (numPages ? 1 : '--')} of{' '}
                        {numPages || '--'}
                      </div>
                      <div className="buttonc">
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="Pre"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className="btn btn-orange btn-lg btn-shadow"
                  // href="#"
                  type="button"
                  onClick={() => window.close()}
                >
                  {' '}
                  Close
                </button>
              </Col>
            </Row>
          </div>
        </Colxx>
      </Row>
    </>
  );
};

export default ViewFile;
