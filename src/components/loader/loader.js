import React from 'react';
import './loader.css';

const MainLoader = () => {
  return(
    <div className="loader-wrapper">
      <div className="loader-title">CORONAhub</div>
      <div className="loader">
        {[...Array(25).keys()].map((key) => <div key={key}></div>)}
      </div>
	  </div>
  );
}

export const CircularLoader = () => {
  return(
    <div className="circular-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default MainLoader;
