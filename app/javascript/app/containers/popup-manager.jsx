import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SignInPopup from '../containers/sign-in-popup';
import SignUpPopup from '../containers/sign-up-popup';
import { SIGN_IN_POPUP, SIGN_UP_POPUP } from '../constants/popup-manager';

const Background = styled.div`
  display: ${props => (props.isShow ? 'block' : 'none')}
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 10px;
`;

const selectPopup = (show) => {
  switch (show) {
    case SIGN_UP_POPUP:
      return (<SignUpPopup />);
    case SIGN_IN_POPUP:
      return (<SignInPopup />);
    default:
      return null;
  }
};

const PopupManager = ({ popupManager }) => (
  <Background isShow={popupManager !== null}>
    <Container>
      {selectPopup(popupManager)}
    </Container>
  </Background>
);

function mapStateToProps(state) {
  return { popupManager: state.popupManager };
}

const PopupManagerContainer = connect(mapStateToProps)(PopupManager);

PopupManager.propTypes = {
  popupManager: PropTypes.string,
};

PopupManager.defaultProps = {
  popupManager: null,
};

export default PopupManagerContainer;