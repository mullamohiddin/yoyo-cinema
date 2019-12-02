import React from 'react';

import SearchAppBar from '../../components/Searchbar/searchbar';
import BottomNav from '../../components/Footer/bottomNav';
import SideNav from '../../components/SideNav/sidenav';
import {BrowserRouter} from 'react-router-dom';
function App() {
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
