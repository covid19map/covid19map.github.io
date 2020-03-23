import React from 'react';
import './loader.css';

const MainLoader = () => {
  return(
    <div className="loader-wrapper">
      <div className="loader-title">CORONA hub</div>
      <div className="loader">
        {[...Array(25).keys()].map((key) => <div key={key}></div>)}
      </div>
	  </div>
  );
}

export const CircularLoader = () => (
  <div className="circular-loader"></div>
);

export default MainLoader;
