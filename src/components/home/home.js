import React from 'react';
import { Link } from '@reach/router';
import { usePromiseTracker } from 'react-promise-tracker';
import BrandLogo from '../brand-logo/brand-logo';
import * as Styled from './home-styled.js';
import { ReactComponent as ConnectedWorld } from './connected-world.svg';

function Home() {
  const { promiseInProgress } = usePromiseTracker(),
        animated = { animated: !promiseInProgress };

  return(
    <Styled.Container>
      <Styled.Brand {...animated}>
        <BrandLogo />
      </Styled.Brand>
      <Styled.Graphic {...animated}>
        <ConnectedWorld />
      </Styled.Graphic>
      <Styled.IntroButtonContainer>
        <Link to="/dashboard">
          <Styled.IntroButton enterAt="2.25s" {...animated}>
            Zum Dashboard
          </Styled.IntroButton>
        </Link>
        <Link to="/survey">
          <Styled.IntroButton enterAt="2.75s" {...animated}>
            Zur Umfrage
          </Styled.IntroButton>
        </Link>
      </Styled.IntroButtonContainer>
    </Styled.Container>
  );
}

export default Home;
