import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import MovieDetails from '../../containers/MovieDetails';
import './Grid.css';
import { Link, withRouter } from 'react-router-dom';


const Grid = (props) => {
  const [searchData, setSearchData] = React.useState(props.searchData ? props.searchData : []);
  const [favoriteList, setFavoriteList] = React.useState([]);

  let favorites = [];
  let sData = [];

  const addToFavorite = (data) => {
    let storedData = JSON.parse(window.localStorage.getItem('search-data'));
    let s = searchData.find(sd => sd.id === data.id);
    if (s) {
      s['isFavorite'] = !s.isFavorite;
      data.isFavorite = s.isFavorite;
      s.isUnfavorite = false;
      if (storedData) {
        storedData = storedData.filter(sd => sd.id !== s.id);
        storedData.push(s);
      } else {
        storedData = [];
        storedData.push(s);
      }
    } else if (storedData) {
      data.isFavorite = true;
      storedData = storedData.filter(sd => sd.id !== data.id);
      storedData.push(data);
    }
    setSearchData([...searchData]);
    window.localStorage.removeItem('search-data');
    if (storedData)
      window.localStorage.setItem('search-data', JSON.stringify(storedData));
  };

  const addToUnFavorite = (data) => {
  let storedData = JSON.parse(window.localStorage.getItem('search-data'));
    let s = searchData.find(sd => sd.id === data.id);
    if (s) {
      s['isUnfavorite'] = !s.isUnfavorite;
      data.isFavorite = false;
      s.isFavorite = false;
      if (storedData) {
        storedData = storedData.filter(sd => sd.id !== s.id);
        storedData.push(s);
      } else {
        storedData = [];
        storedData.push(s);
      }
    } else if (storedData) {
      data.isUnfavorite = true;
      storedData = storedData.filter(sd => sd.id !== data.id);
      storedData.push(data);
    }
    setSearchData([...searchData]);
    window.localStorage.removeItem('search-data');
    if (storedData)
      window.localStorage.setItem('search-data', JSON.stringify(storedData));
  }

  const checkColor = (data) => {

    return data.isFavorite ? 'gold' : 'white';
  }
  const checkUnFavColor = (data) => {

    return data.isUnfavorite ? 'red' : 'white';
  }

  return (


    <GridList cellHeight={200} cols={4}>

      {props.searchData.map((tile, i) => (
        <GridListTile key={tile.img + i}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>Release: {tile.release_date}<br />

              <span>Avg: {tile.vote_average}/10</span>
              <br />
              <Link style={{color:'white'}} to={'/' + tile.id}>More.. </Link></span>
            }
            actionIcon={
              <div>
                <IconButton style={{ color: checkColor(tile) }} aria-label={`info about ${tile.title}`}
                  onClick={() => addToFavorite(tile)}>
                  <ThumbUp />
                </IconButton>
                <IconButton style={{ color: checkUnFavColor(tile) }}
                  onClick={() => addToUnFavorite(tile)} aria-label={`info about ${tile.title}`} >
                  <ThumbDown />
                </IconButton>
              </div>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  )

}
export default withRouter(Grid);