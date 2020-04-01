import styled from 'styled-components';
import theme from './theme';
import { flexCentering } from './placeholders';
import { scaleIn } from './animations';

export const Button = styled.button`
  ${flexCentering}
  box-sizing: border-box;
  min-width: 140px;
  height: 50px;
  margin: 25px;
  padding: 0 25px;
  background: ${theme.color.primary};
  color: ${theme.color.light};
  font-weight: 700;
  border: none;
  border-radius: ${theme.border.radius};
  outline: none;
  cursor: pointer;
  transition: background .4s ease;

  &:hover {
    background: ${theme.color.dark};
    color: ${theme.color.light};

    svg {
      animation: ${scaleIn} .2s ease-in;
    }
  }
`;

export const IconButton = styled(Button)`
  svg {
    margin: 0 6px 0 0;
    fill: ${theme.color.light};
  }
`;
