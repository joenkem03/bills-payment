

                  <Card>
                  <CardBody>
                    <Formik
                      initialValues={{ name: '', email: '', message: '' }}
                      onSubmit={() => console.log('submit')}
                      // validationSchema={registerScheme}
                    >
                      {() => (
                        <Form>
                          <Row>
                            <Colxx xxs="6">
                              <FormGroup className="form-group has-float-label  mb-4">
                                <Label>
                                  {/* <IntlMessages id="user.first-name" /> */}
                                  Full Name
                                </Label>
                                <Field
                                  className="form-control"
                                  name="name"
                                  placeholder="Full Name"
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx xxs="6">
                              <FormGroup className="form-group has-float-label mb-4">
                                <Label>
                                  {/* <IntlMessages id="user.email" /> */}
                                  Email
                                </Label>
                                <Field
                                  className="form-control"
                                  name="email"
                                  placeholder="Email"
                                />
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx xxs="12">
                              <FormGroup className="form-group has-float-label mb-4">
                                <Label>
                                  {/* <IntlMessages id="user.first-name" /> */}
                                  Message
                                </Label>
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  name="message"
                                  placeholder="Message"
                                />
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx xxs="12">
                              <div className="text-center mb-3">
                                <a
                                  className="btn btn-secondary btn-xl"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  // href="{buyUrl}"
                                  href="#"
                                >
                                  SUBMIT
                                </a>
                              </div>
                            </Colxx>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>