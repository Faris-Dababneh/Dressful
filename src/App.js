import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Dress from './pages/Dress';
import Contact from './pages/Contact';
import About from './pages/About';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-57XJFRL2'
}

function App() {
  TagManager.initialize(tagManagerArgs)
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/dress' Component={Dress}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/about' Component={About}/>
      </Routes>
    </Router>
  );
}

export default App;
