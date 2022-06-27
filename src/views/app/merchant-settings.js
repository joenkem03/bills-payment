import React, {useEffect, useState}  from 'react';
import { Row, NavItem, TabPane, TabContent, NavLink, Nav } from 'reactstrap';
import classnames from "classnames";
// import { Link } from "react-router-dom";
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { GetMerchantProfileService } from 'services/ProtectedService';
import UserListAlt from './user-list-alt';
import MerchantProfile from './merchant-profile';
import MerchantBank from './merchant-banks';
import MerchantApi from './merchant-api';
import MerchantUrls from './merchant-urls';

const MerchantSettings = ({ match }) => {
  const [activeTab, setActiveTab] = useState("first");
  const [merchant, setMerchant] = useState([]);
  
  useEffect(() => {
    // if (option === null) {
      GetMerchantProfileService().then((ret) => {
        // console.log(ret);
        // if(ret.data.length > 0){
        //   ret.data.forEach(element => {
        //     // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
        //       options.push({ value: element.id, label: `${element.name}` });              
        //     // }
        //   });
          setMerchant(ret.data);
        // }
      });
    // }
    // }
}, []);

  

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.settings" match={match} />
          {/* <Separator className="mb-5" /> */}
        </Colxx>
      </Row>
        
      <div>
  <Nav className="nav nav-tabs separator-tabs ml-0 mb-5" role="tablist">
    <NavItem>
      <NavLink id="first-tab" 
                    className={classnames({ active: activeTab === "first" })}
                    // className="app-nav-link"
                    onClick={() => {
                      toggle("first");
                    }}>PROFILE</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="second-tab" 
                    className={classnames({ active: activeTab === "second" })}
                    // className="app-nav-link"
                    onClick={() => {
                      toggle("second");
                    }}>BANK</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="third-tab" 
                    className={classnames({ active: activeTab === "third" })}
                    // className="app-nav-link"
                    onClick={() => {
                      toggle("third");
                    }}>USERS</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="forth-tab" 
                    className={classnames({ active: activeTab === "forth" })}
                    // className="app-nav-link"
                    onClick={() => {
                      toggle("forth");
                    }}>API KEY</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="fifth-tab" 
                    className={classnames({ active: activeTab === "fifth" })}
                    // className="app-nav-link"
                    onClick={() => {
                      toggle("fifth");
                    }}>CALLBACK & NOTIFICATION</NavLink>
    </NavItem>
  </Nav>
  <Separator className="mb-5" />
  <TabContent activeTab={activeTab}>
    <TabPane tabId="first" role="tabpanel" aria-labelledby="first-tab">
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.blank-page" />
          </p> */}
          <MerchantProfile merchant={merchant}/>
        </Colxx>
      </Row>
    </TabPane>
    <TabPane tabId="second" role="tabpanel" aria-labelledby="second-tab">
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            {/* <IntlMessages id="menu.blank-page" />2 */}
            <MerchantBank/>
          </p>
        </Colxx>
      </Row>
    </TabPane>
    <TabPane tabId="third" role="tabpanel" aria-labelledby="third-tab">
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.blank-page" />3
          </p> */}
          <UserListAlt/>
        </Colxx>
      </Row>
    </TabPane>
    <TabPane tabId="forth" role="tabpanel" aria-labelledby="forth-tab">
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.blank-page" />3
          </p> */}
          <MerchantApi merchant={merchant}/>
        </Colxx>
      </Row>
    </TabPane>
    <TabPane tabId="fifth" role="tabpanel" aria-labelledby="fifth-tab">
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.blank-page" />3
          </p> */}
          <MerchantUrls merchant={merchant} />
        </Colxx>
      </Row>
    </TabPane>
  </TabContent>
</div>
    </>
  );
};

export default MerchantSettings;
