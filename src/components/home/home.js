import React from 'react';
import { Link } from '@reach/router';
import styled, { keyframes } from 'styled-components';
import theme from '../../theme/theme';
import { Button } from '../../theme/base-components';
import { flexCentering } from '../../theme/placeholders';
import BrandLogo from '../brand-logo/brand-logo';
import { ReactComponent as ConnectedWorld } from './connected-world.svg';

const Container = styled.div`
  ${flexCentering}
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 5%;
`;

const translateAnimation = keyframes`
  to {
    opacity: 1;
    transform: translate(0);
  }
`;

const Brand = styled.div`
  width: 100%;
  margin: 25px auto;
  font-size: 48px;
  text-align: center;
  opacity: 0;
  transform: translate(-200px);
  animation: ${translateAnimation} 1s ease forwards;
`;

const HomeButtonContainer = styled.div`
  ${flexCentering}
  width: 100%;

  a {
    text-decoration: none;
  }
`;

const HomeButton = styled(Button)`
  opacity: 0;
  transform: translate(200px);
  animation: ${translateAnimation} 1.5s ease forwards;

  &:first-child {
    animation-delay: 1.5s;
  }

  &:last-child {
    animation-delay: 2s;
  }
`;

const graphicAnimationLand = keyframes`
  from { fill: ${theme.color.tertiary}; }
  to { fill: ${theme.color.dark}; }
`;

const graphicAnimationEdges = keyframes`
  to { stroke-dashoffset: 0; }
`;

const graphicAnimationVertices = keyframes`
  to { transform: scale(1); }
`;

const Graphic = styled.div`
  width: 60%;
  height: auto;
  max-width: 500px;
  max-height: 500px;

  svg {
    width: 100%;
    height: auto;

    #land {
      animation: ${graphicAnimationLand} 3s linear forwards;

      * {
        fill: inherit;
      }
    }

    #edges {
      stroke-dasharray: 2500;
      stroke-dashoffset: 2500;
      animation: ${graphicAnimationEdges} 2.5s ease-in-out .5s forwards;
    }

    [id*='vertex'] {
      transform: scale(0);
      transform-origin: center;
      transform-box: fill-box;
      animation: ${graphicAnimationVertices} .75s ease forwards;
    }

    #vertex-1 {
      animation-delay: .25s;
    }

    #vertex-2 {
      animation-delay: .75s;
    }

    #vertex-3 {
      animation-delay: 8s;
    }

    #vertex-4 {
      animation-delay: .9s;
    }

    #vertex-4 {
      animation-delay: 1.2s;
    }

    #vertex-5 {
      animation-delay: 1.6s;
    }

    #vertex-6 {
      animation-delay: 1.9s;
    }

    #vertex-7 {
      animation-delay: 2s;
    }

    #vertex-8 {
      animation-delay: 2.2s;
    }

    #vertex-9 {
      animation-delay: 2.3s;
    }
  }
`;

function Home() {
  return(
    <Container>
      <Brand><BrandLogo /></Brand>
      <Graphic><ConnectedWorld /></Graphic>
      <HomeButtonContainer>
        <Link to="/dashboard"><HomeButton>Zum Dashboard</HomeButton></Link>
        <Link to="/survey"><HomeButton>Zur Umfrage</HomeButton></Link>
      </HomeButtonContainer>
    </Container>
  );
}

export default Home;
