import React, { Component, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdCreator from './components/AdCreator';

import Header from './components/Header';
import Overview from './components/Overview';
import Footer from './components/Footer';

import './styles.css';

const App = (props) => {
  const [flag, setFlag] = useState(true);
  function handleClick(arg) {
    setFlag(arg);
  }
  return (
    <div className='router'>
      <Header />
      {flag === true ? (
        <>
          <button onClick={() => handleClick(false)}>Hide Saved Ads</button>
          <Overview />
        </>
      ) : (
        <>
          <button onClick={() => handleClick(true)}>Show Saved Ads</button>
        </>
      )}
      <AdCreator />
      <Footer />
    </div>
  );
};

export default App;
