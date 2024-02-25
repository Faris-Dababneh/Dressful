// https://me.meshcapade.com/

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Dress from './pages/Dress';
import Dresser from './pages/Dresser';
import Contact from './pages/Contact';
import NoItem from './pages/NoItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/dress' Component={Dress}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/,' Component={NoItem}/>
      </Routes>
    </Router>
  );
}

export default App;
