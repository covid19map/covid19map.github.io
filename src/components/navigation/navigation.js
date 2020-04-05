import React, { Component, Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as DashboardIcon } from '../../icons/dashboard.svg';
import { ReactComponent as TableIcon } from '../../icons/table.svg';
import { ReactComponent as SurveyIcon } from '../../icons/survey.svg';
import { ReactComponent as ContactIcon } from '../../icons/contact.svg';
import { ReactComponent as ImprintIcon } from '../../icons/imprint.svg';
import BrandLogo from '../brand-logo/brand-logo';
import './navigation.css';

const Brand = styled.div`
  font-size: 2rem;
`;

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
    }
  }

  handleToggle = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  handleCollapse = () => {
    this.setState({
      isExpanded: false,
    });
  }

  /*
  componentWillUnmount() {
    const { props, handleCollapse } = this,
          { rootNode } = props;
    rootNode.removeEventListener('click', handleCollapse);
  }

  componentDidMount() {
    const { props, handleCollapse } = this,
          { rootNode } = props;
    rootNode.addEventListener('click', handleCollapse);
  }
  */

  render() {
    const { state, handleToggle, handleCollapse } = this,
          { isExpanded } = state,
          clsNav = `navigation ${isExpanded ? 'expanded' : ''}`,
          clsToggle = `navigation-toggle ${isExpanded ? 'expanded' : ''}`;

    return(
      <Fragment>
        <div className={clsToggle} onClick={handleToggle}>
          <MenuIcon />
        </div>
        <nav className={clsNav}>
          <Brand><BrandLogo /></Brand>
          <NavList onClose={handleCollapse}>
            <NavLink to="/dashboard"><DashboardIcon />Dashboard</NavLink>
            <NavLink to="/table"><TableIcon />Table</NavLink>
            <NavLink to="/survey"><SurveyIcon />Survey</NavLink>
            <NavLink to="/contact"><ContactIcon />Contact</NavLink>
            <NavLink to="/imprint"><ImprintIcon />Imprint</NavLink>
          </NavList>
        </nav>
      </Fragment>
    );
  }
}

const __setActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : {}
}

const NavList = ({ onClose, children }) => {
  return(
    <ul>
      {children.map((c, i) => (
        <Link key={i} to={c.props.to} getProps={__setActive}>
          <li onClick={onClose}>{c.props.children}</li>
        </Link>
      ))}
    </ul>
  );
}

const NavLink = ({ children }) => <Fragment>{children}</Fragment>;
