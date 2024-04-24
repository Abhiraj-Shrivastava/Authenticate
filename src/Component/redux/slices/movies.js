import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    moviesData:[],
    moviesDataLoading:false,
    watchList:[]    
};


const MoviesSlice = createSlice({
    name:'movies',
    initialState,
    reducers:{
        reset: () => initialState,
        setMoviesData: (state, action) => {
            state.moviesData = action.payload;
        },
        setWatchList: (state, action) => {
            state.watchList = action.payload;
        },
        setMoviesDataLoading: (state, action) => {
            state.moviesDataLoading = action.payload;
        },
    }
})


export const {
    setMoviesData,
    setMoviesDataLoading,
    setWatchList
} = MoviesSlice.actions;

export default MoviesSlice.reducer




