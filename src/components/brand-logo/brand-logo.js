import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/theme';

const Logo = styled.div`
  font-weight: 1000;
  color: ${theme.color.light};
  color: inherit;
  text-transform: uppercase;
`;

const LogoInner = styled.span`
  font-weight: 200;
  text-transform: lowercase;
`;

const BrandLogo = () => (
  <Logo>Corona<LogoInner>hub</LogoInner></Logo>
);

export default BrandLogo;