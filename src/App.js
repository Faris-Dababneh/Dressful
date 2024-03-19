import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Dress from './pages/Dress';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/dress' Component={Dress}/>
        <Route path='/contact' Component={Contact}/>
      </Routes>
    </Router>
  );
}

export default App;
