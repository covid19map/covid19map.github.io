import React, { Component, Fragment } from 'react';
import { Link } from "@reach/router"
import './navigation.css';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : {}
}

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
    const { state, handleToggle } = this,
          { isExpanded } = state,
          clsNav = `navigation ${isExpanded ? 'expanded' : ''}`,
          clsToggle = `navigation-toggle ${isExpanded ? 'expanded' : ''}`;
    return(
      <Fragment>
        <div className={clsToggle} onClick={handleToggle}>
          <MenuIcon />
        </div>
        <nav className={clsNav}>
          <div className="navigation__brand">Corona<span>hub</span></div>
          <ul>
            <li><HomeIcon /><Link to="/" getProps={isActive}>Home</Link></li>
            <li><TableIcon /><Link to="/table" getProps={isActive}>Table</Link></li>
            <li><SurveyIcon /><Link to="/survey" getProps={isActive}>Survey</Link></li>
            <li><ContactIcon /><Link to="/contact" getProps={isActive}>Contact</Link></li>
            <li><ImprintIcon /><Link to="/imprint" getProps={isActive}>Imprint</Link></li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
  </svg>
);

const TableIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z" />
  </svg>
);

const SurveyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M7 16h10v1h-10v-1zm0-1h10v-1h-10v1zm15-13v22h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1zm9 1h-4l-2 2h-3.898l-2.102-2h-4v18h16v-18zm-13 9h10v-1h-10v1zm0-2h10v-1h-10v1z" />
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
  </svg>
);

const ImprintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20 12.875v5.068c0 2.754-5.789 4.057-9 4.057-3.052 0-9-1.392-9-4.057v-6.294l9 4.863 9-3.637zm-8.083-10.875l-12.917 5.75 12 6.5 11-4.417v7.167h2v-8.25l-12.083-6.75zm13.083 20h-4c.578-1 1-2.5 1-4h2c0 1.516.391 2.859 1 4z" />
  </svg>
);
