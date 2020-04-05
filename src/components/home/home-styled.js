import styled, { keyframes } from 'styled-components';
import theme from '../../theme/theme';
import { Button } from '../../theme/base-components';
import { flexCentering } from '../../theme/placeholders';

const overlayAnimation = keyframes`
  to { opacity: 0; }
`;

export const Container = styled.div`
  ${flexCentering}
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 5%;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${theme.color.dark};
    pointer-events: none;
    z-index: 1001;
    animation: ${overlayAnimation} .2s ease forwards .4s;
  }
`;

const translateAnimation = keyframes`
  to {
    opacity: 1;
    transform: translate(0);
  }
`;

export const Brand = styled.div`
  width: 100%;
  margin: 25px auto;
  font-size: 48px;
  text-align: center;
  opacity: 0;
  transform: translate(-200px);
  animation-name: ${props => props.animated ? translateAnimation : ''};
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
`;

export const IntroButtonContainer = styled.div`
  ${flexCentering}
  width: 100%;

  a {
    text-decoration: none;
  }
`;

export const IntroButton = styled(Button)`
  opacity: 0;
  transform: translate(200px);
  animation-name: ${props => props.animated ? translateAnimation : ''};
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(.6, 0, .4, 1);
  animation-fill-mode: forwards;
  animation-delay: ${props => props.enterAt || '200ms'};
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

export const Graphic = styled.div`
  width: 60%;
  height: auto;
  max-width: 500px;
  max-height: 500px;

  svg {
    width: 100%;
    height: auto;

    #land {
      animation-name: ${props => props.animated ? graphicAnimationLand : ''};
      animation-duration: 3s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;

      * {
        fill: inherit;
      }
    }

    #edges {
      stroke-dasharray: 2500;
      stroke-dashoffset: 2500;
      animation-name: ${props => props.animated ? graphicAnimationEdges : ''};
      animation-duration: 2.5s;
      animation-delay: .5s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }

    [id*='vertex'] {
      transform: scale(0);
      transform-origin: center;
      transform-box: fill-box;
      animation-name: ${props => props.animated ? graphicAnimationVertices : ''};
      animation-duration: .75s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
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
