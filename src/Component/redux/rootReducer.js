import { combineReducers } from "redux";
import MoviesReducer from './slices/movies'


const appReducer = combineReducers({
    moviesReducer:MoviesReducer
})


const rootReducer = (state, action) => {
    if (action.type === 'RESET_ALL_STATE') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;