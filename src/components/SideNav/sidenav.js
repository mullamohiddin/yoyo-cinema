import React, {useEffect} from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Favorite from '@material-ui/icons/Favorite';
import Movie from '@material-ui/icons/Movie';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '../../components/GridList/Grid';
import axios from 'axios';
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import MovieDetails from '../../containers/MovieDetails';
import  Home  from "../../components/Layout/Home";
import FavoriteContainer from "../../containers/FavoriteContainer";
import UnfavoriteContainer from "../../containers/UnfavoriteContainer";


const drawerWidth = 240;
const  IMG_PATH ='https://image.tmdb.org/t/p/original';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    marginRight: theme.spacing(30),
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
  },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 7),
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: 120,
  //     '&:focus': {
  //       width: 200,
  //     },
  //   },
  // },
}));

const SideNav = (props) => {
  const formItemPropTypes = {
    searchData: [],
    handleItemSelection: false
  };
  const classes = useStyles();
  let searchKey='';
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  let [searchData, setSearchData] = React.useState([]);
const currentPath = props.location;
console.log(currentPath+':::');
  const state = {
    persons: []
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const changeInput = (event) => {
    setText(event.target.value);
  }
 const searchMovie = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4cb1eeab94f45affe2536f2c684a5c9e&query=`+text)
    .then(res => {
      const persons = res.data.results;
      if ( persons.length > 0 ) {
      persons.map(p => {p['img']=IMG_PATH+p.poster_path;
      p['isFavorite'] = false;
      p['isUnfavorite']= false;
    } );
    }
      setSearchData(persons);
      window.localStorage.removeItem('search');
      window.localStorage.setItem('search', JSON.stringify(searchData));
    })
   
  }

  const navigateRoute = (route) => {
 if (route === 'Movies')
 return '';
  if(route ==='Favorites')
  return '/favorites'
  if(route === 'Unfavorite')
  return '/unfavorites'
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
          <img src="yoyo.PNG"/>
         </Typography>
         
         <div className={classes.search}>
        
         <IconButton
            color="inherit"
            onClick={() => searchMovie()}
            edge="start"
           
          >
            <SearchIcon />
          </IconButton> 
          {/* <div className={classes.searchIcon} onClick={() => searchMovie()}>
              <SearchIcon />
            </div> */}
      
           <InputBase
             placeholder="Search…"
             onChange={changeInput}
             classes={{
               root: classes.inputRoot,
               input: classes.inputInput,
             }}
             inputProps={{ 'aria-label': 'search' }}
           />
          
         </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Movies', 'Favorites', 'Unfavorite'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index === 0 ? <Movie /> : index === 1 ? <Favorite />
              : <FavoriteBorder/>}</ListItemIcon>
              <Link to={()=>navigateRoute(text)}>
              <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['TV Shows', 'Documentaries', 'Yoyo Originals'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><Movie /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {
            searchData.length === 0 ?
            <Typography variant="h5">
            Welcome to yoyo Cinema. Please Search Movie  
         </Typography>

            : 
      
        
          currentPath.pathname === '/' || currentPath === '/home' ?
          <Grid searchData={searchData}/> : ''
        }
         
           <Switch>
      <Route path="/favorites"  component={FavoriteContainer} />
      <Route path="/unfavorites" component={UnfavoriteContainer}/>
      {/* <Route path=""  component={Home}/> */}
      <Route path="/:id" exact component={MovieDetails}/>
      </Switch>
     
 
      </main>
     
    </div>
  );
}
export default withRouter(SideNav);