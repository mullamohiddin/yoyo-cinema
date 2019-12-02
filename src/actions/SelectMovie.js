export const SELECTED_MOVIE= 'Select Movie';

export const SelectedMovie = selectedItem => ({
    type: SELECTED_MOVIE,
    payload: { selectedItem },
});
