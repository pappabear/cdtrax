import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marquis from '../../assets/img/brand/MQ-OFFICIAL-LOGO.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span className="ml-auto">Powered by <img src={marquis} alt="marquis"/></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes
DefaultFooter.defaultProps = defaultProps

export default DefaultFooter
