import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import { AppAsideToggler, AppNavbarBrand } from '@coreui/react'
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
//import logo from '../../assets/img/brand/logo.svg'
//import sygnet from '../../assets/img/brand/sygnet.svg'
import logo from '../../assets/img/brand/logo.png'
import customerLogo from '../../assets/img/brand/customer-logo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: [false, false],
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      
      <React.Fragment>
        
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo, width: 120, height: 25, alt: 'CDTrax' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CDTrax' }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />
        
        <img src={customerLogo} height="50" alt="marquis"/>

        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown accnt/>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
