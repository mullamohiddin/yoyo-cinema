
import { SELECTED_MOVIE } from '../actions/SelectMovie';


const MovieReducer = (state, action) => {
  switch (action.type) {
    case SELECTED_MOVIE: {
        const items = state.searchData.map(item => {
            if (item.id === action.payload.id) {
              const newItem = { ...item };
              newItem.isFavorite = !newItem.isFavorite;
              return newItem;
            }
    
            return item;
          });
          return { ...state, items };
    }



    default: {
      return state;
    }
  }
};

export default MovieReducer;
