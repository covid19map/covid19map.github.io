import styled from 'styled-components';
import theme from '../../../theme/theme';
import { flexCentering } from '../../../theme/placeholders';
import { IconButton } from '../../../theme/base-components';

export const Dashboard = styled.div`
  ${flexCentering}
`;

const headerHeight = '100px';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: ${headerHeight};
  padding: 20px calc(2*${theme.lenghts.navigation.offset}) 20px 20px;
  background: rgb(171,205,209);
  background: linear-gradient(90deg, rgba(171,205,209,1) 25%, rgba(39,231,193,0) 75%);
  border: none;
  border-radius: 0 0 0 ${theme.border.radius};
  pointer-events: none;
  z-index: 100;

  * {
    pointer-events: auto;
  }
`;

export const Brand = styled.div`
  display: inline-block;
  font-size: 30px;
  color: ${theme.color.primary};
`;

export const Controls = styled.div`
  ${flexCentering}
  flex-flow: row;
  margin: 0 20px;

  a {
    text-decoration: none;
  }
`;

const widthHeaderButtonMd = '50px';

export const HeaderButton = styled(IconButton)`
  margin: 0 20px;

  @media screen and (max-width: ${theme.breakpoint.md}) {
    width: ${widthHeaderButtonMd};
    height: ${widthHeaderButtonMd};
    min-width: ${widthHeaderButtonMd};
    min-height: ${widthHeaderButtonMd};
    padding: 0;
    border-radius: 50%;
    font-size: 0;

    svg {
      width: calc(${widthHeaderButtonMd} / 3);
      height: calc(${widthHeaderButtonMd} / 3);
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: ${theme.breakpoint.sm}) {
    margin: 10px 10px 0;
  }
`;

export const DashboardContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: ${headerHeight} 0 0 0;
  padding: 25px;
`;

export const DashboardRow = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: ${props => props.centered ? 'center' : 'flex-start'};
  flex-wrap: wrap;
  width: 100%;
  margin: 50px 0;

  &.muted {
    opacity: .4;
    pointer-events: none;
  }
`;

export const DashboardTile = styled.div`
  box-sizing: border-box;
  width: 33%;
  margin: 5px 0 15px;
  padding: 0 10px;

  @media screen and (max-width: ${theme.breakpoint.md}) {
    width: 50%;
  }

  @media screen and (max-width: ${theme.breakpoint.sm}) {
    width: 100%;
  }
`;
