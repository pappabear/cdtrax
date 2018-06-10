import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';

//import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { AppAsideToggler, AppNavbarBrand } from '@coreui/react'
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
//import logo from '../../assets/img/brand/logo.svg'
//import sygnet from '../../assets/img/brand/sygnet.svg'
import logo from '../../assets/img/brand/logo.png'

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

    const activeMenuStyle = {
      backgroundColor: '#f86c6b',
      padding: '5px 15px 5px 15px',
      marginTop: '-5px',
      color: 'white'
    }

    return (
      
      <React.Fragment>
        
        <AppNavbarBrand
          full={{ src: logo, width: 120, height: 25, alt: 'CDTrax' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CDTrax' }}
        />

        <Nav pills>
          <NavItem>
            <NavLink href="/" style={this.props.activeMenuShouldBe === "dashboard" ? activeMenuStyle : null } >Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Development Activities</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Organizations Helped</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/base/breadcrumbs">Employees Involved</NavLink>
          </NavItem>
          <Dropdown nav isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1);}} style={ this.props.activeMenuShouldBe === "setup" ? activeMenuStyle : null } >
            <DropdownToggle nav caret>
              Setup
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#/setup/banks">Banks</DropdownItem>
              <DropdownItem href="#/setup/callcodes">Call Codes</DropdownItem>
              <DropdownItem href="#/setup/collateralcodes">Collateral Codes</DropdownItem>
              <DropdownItem href="#/setup/investmenttypes">Investment Types</DropdownItem>
              <DropdownItem href="#/setup/loantypes">Loan Types</DropdownItem>
              <DropdownItem href="#/setup/servicetypes">Service Types</DropdownItem>
              <DropdownItem href="#/setup/disastertypes">Disaster Types</DropdownItem>
              <DropdownItem href="#/setup/declarationtypes">Declaration Types</DropdownItem>
              <DropdownItem href="#/setup/assistancetypes">Assistance Types</DropdownItem>
              <DropdownItem href="#/setup/purposecodes">Purpose Codes</DropdownItem>
              <DropdownItem href="#/setup/assessmentareas">Assessment Areas</DropdownItem>
              <DropdownItem href="#/setup/branches">Branches</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>

        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown notif/>
          <DefaultHeaderDropdown tasks/>
          <DefaultHeaderDropdown mssgs/>
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
