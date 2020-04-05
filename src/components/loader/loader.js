import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../../theme/theme';
import { flexCentering } from '../../theme/placeholders';
import BrandLogo from '../brand-logo/brand-logo';
import './loader.css';

const Container = styled.div`
  ${flexCentering}
  flex-flow: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.color.dark};
  z-index: 1001;
`;

const widthTitle = '200px';

const Title = styled.div`
  $width: ${widthTitle};
  width: ${widthTitle};
  font-size: 14px;
  color: #ddd;
  text-align: center;
`;

const animateNotification = keyframes`
  0% { transform: scale(1, 0); }
  100% { transform: scale(1, 1); }
`;

const Notification = styled.div`
  box-sizing: border-box;
  margin: 0 12px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: ${theme.color.light};
  color: ${theme.color.dark};
  animation: ${animateNotification} .4s ease-in;
`;

function MainLoader() {
  const [reload, setReload] = useState(false);

  setTimeout(() => {
    setReload(true);
  }, 9000);

  return(
    <Container>
      <Title>
        <BrandLogo />
      </Title>
      <DnaLoader />
      {reload &&
        <Notification>
          Etwas scheint schief gelaufen zu sein.
          Versuchen Sie die Seite erneut zu laden.
        </Notification>
      }
	  </Container>
  );
}

export default MainLoader;

function DnaLoader() {
  return(
    <div className="dna-loader">
      {[...Array(25).keys()].map((key) => <div key={key}></div>)}
    </div>
  );
}

export function CircularLoader() {
  return(
    <div className="circular-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export function EllipticLoader() {
  return(
    <div className="elliptic-loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
