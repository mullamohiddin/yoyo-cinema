import reduceReducers from 'reduce-reducers';

import initialState from './initialState';
import MovieReducer from './MovieReducer';


const AppReducer = reduceReducers(initialState, MovieReducer);

export default AppReducer;
