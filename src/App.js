import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/Searchbar/searchbar';
import BottomNav from './components/Footer/bottomNav';
import SideNav from './components/SideNav/sidenav';
import {BrowserRouter} from 'react-router-dom';

function App() {
  window.localStorage.removeItem('search-data');
  window.localStorage.removeItem('search');
  return (
    <BrowserRouter>
    <div className="App">
    { /* <SearchAppBar/> */ }
      <SideNav/>
      <BottomNav className="footer"/>
    </div>
    </BrowserRouter>
  );
}

export default App;
