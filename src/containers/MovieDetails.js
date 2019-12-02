import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Favorite from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
const  IMG_PATH ='https://image.tmdb.org/t/p/original';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
  },
});
const MovieDetails = (props) => {
    let [searchData, setSearchData] = React.useState([]);
    let [showSpin, setShowSpin]=React.useState(true);
    useEffect(() => {
      if (props.match.path === '/:id')
        handleServiceCall(props.match.params);
      }, []);

    const  handleServiceCall =  () => {
      setShowSpin(true);
        axios.get(`https://api.themoviedb.org/3/movie/`+props.match.params.id+`?api_key=4cb1eeab94f45affe2536f2c684a5c9e`)
        .then(res => {
          setShowSpin(false);
          const persons = res.data;
          if (persons) {
            persons['img']=IMG_PATH+persons.poster_path;
          }
          setSearchData(persons);
         
        })
 };

console.log("Propd:"+props);




    const classes = useStyles();
    
      return ( <div> { showSpin ?
        <CircularProgress disableShrink />
        :
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={searchData.original_title}
            height="200"
            width="100"
            src={searchData.img}
              title={searchData.original_title}
            />
            
        <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {searchData.original_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               {searchData.overview}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
            <span style={{float: 'left'}}> Genre :  {searchData.genres ? searchData.genres[0].name: ''} </span> <br/>
     <span style={{float: 'left'}}>  Running Time :{searchData.runtime} min </span>  <br/>
     <span style={{float: 'left'}}> Release Date :   {searchData.release_date} </span> <br/>
     <span style={{float: 'left'}}> 
     <Favorite style={{color: 'red',float: 'left'}}/> : {searchData.vote_count}
     </span>
    

              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        }
        </div>
      );
   
   
}
 export default withRouter(MovieDetails);