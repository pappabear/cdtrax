import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
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
    }

    return (
      <React.Fragment>
        
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CDTrax' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CDTrax' }}
        />

            <Nav pills>
              <NavItem>
                <NavLink href="/" active style={activeMenuStyle}>Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Organizations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/base/breadcrumbs">Employees</NavLink>
              </NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1);}}>
                <DropdownToggle nav caret>
                  Setup
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="http://google.com">Banks</DropdownItem>
                  <DropdownItem>Branches</DropdownItem>
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
