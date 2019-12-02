
import React from 'react';
import  Grid from '../components/GridList/Grid';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const FavoriteContainer = () => {
    let localStorageState = JSON.parse(window.localStorage.getItem('search-data'));
    if (localStorageState)
    localStorageState = localStorageState.filter(l => l.isFavorite);
else localStorageState = [];

    return (
        <div>
            { !localStorageState ?
        <CircularProgress disableShrink />
        :
            localStorageState && localStorageState.length > 0 ? 
  <Grid searchData={localStorageState}> </Grid>
  : <h4>No Favorites Added </h4>
            }
        
  </div>
    )
}

export default withRouter(FavoriteContainer);