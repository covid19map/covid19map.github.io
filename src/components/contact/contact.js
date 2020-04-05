import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme/theme';
import { ReactComponent as MailIcon } from '../../icons/mail.svg';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';
import { ReactComponent as TwitterIcon } from '../../icons/twitter.svg';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 60%;
  min-height: 500px;
  margin: 100px auto;
  padding: 50px;
  border: none;
  border-radius: ${theme.border.radius};
  background: ${theme.color.secondary};
  color: #222;

  @media screen and (max-width: ${theme.breakpoint.sm}) {
    width: 90%;
  }
`;

const Title = styled.h2`
  width: 100%;
  margin: 24px 0;
`;

const rowFlex = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Row = styled.div`
  ${rowFlex}
  width: 100%;
  margin: ${props => props.margin ? props.margin : '8px 0'};
  color: inherit;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};

  a {
    ${rowFlex}
    box-sizing: border-box;
    margin: 0 0 0 3px;
    padding: 0;
    color: inherit;
    text-decoration: none;
    transition: all .4s ease;

    &:hover {
      padding: 3px;
      background: ${theme.color.dark};
      color: ${theme.color.light};
    }
  }

  svg {
    margin: 0 6px 0 0;
  }
`;

function Contact() {
  return(
    <Container>
      <Title>Kontakt</Title>
      <Row margin="10px 0 30px">
        Wir sind aktiv auf den folgenden Medien.
        Hinterlassen Sie uns dort gerne eine Nachricht.
      </Row>
      <Row bold>
        <MailIcon /> ruben.giannotti@gmx.net
      </Row>
      <Row bold>
        <GithubIcon />/ <a href="#">(handle)</a>
      </Row>
      <Row bold>
        <TwitterIcon />/ <a href="#">(handle)</a>
      </Row>
    </Container>
  );
}

export default Contact;
