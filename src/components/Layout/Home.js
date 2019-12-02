
import React from 'react';
import  Grid from '../../components/GridList/Grid';
import {withRouter} from 'react-router-dom';

const Home = () => {
    let localStorageState = JSON.parse(window.localStorage.getItem('search'));
    if (localStorageState)
    localStorageState.map(l => {
        l.isFavorite = false;
        l.isUnfavorite = false;
    })
    return (
        <div>
         {   localStorageState && localStorageState.length > 0 ? 
  <Grid searchData={localStorageState}> </Grid>
  : <h4>Welcome to Yoyo Cinema </h4>
         }
        
  </div>
    )
}

export default withRouter(Home);