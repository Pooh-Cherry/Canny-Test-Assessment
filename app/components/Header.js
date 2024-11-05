import React from 'react';

import { connect } from 'react-redux';

import Logo from '../img/logo.svg';

import './css/_Header.css';

const Header = ({ votes }) => {
  return (
    <div className="header">
      <img src={Logo} alt="Canny" className="logo" />
      <div className="spacer" />
      <div>Total Votes: {votes}</div>
    </div>
  );
};

export default connect(({ posts }) => ({ votes: posts.votes }))(Header);
