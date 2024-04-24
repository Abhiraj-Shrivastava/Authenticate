import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Button, Card, CircularProgress, Grid, IconButton, InputAdornment, Pagination, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Search } from '@mui/icons-material';
import { setMoviesData, setMoviesDataLoading, setWatchList } from './redux/slices/movies';
import { useDispatch, useSelector } from 'react-redux';


export const Home = () => {
    const dispatch = useDispatch()
    const movieData = useSelector((state) => state.moviesReducer.moviesData);
    const user = window.localStorage.getItem('user')
    const jsonData = window.localStorage.getItem('data');
    const watchList = useSelector((state) => state.moviesReducer.watchList);
    const currentData = jsonData ? JSON.parse(jsonData) : [];
    const foundData = currentData?.filter(d => d.email !== user)
    const movieDataLoading = useSelector((state) => state.moviesReducer.moviesDataLoading);
    const [searchText, setSearchText] = useState("");
    const [pageCount, setPageCount] = useState(0);




    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setMoviesDataLoading(true))
                const response = await fetch('http://www.omdbapi.com/?apikey=3251da0d&s=movie');
                if (!response.ok) {
                    dispatch(setMoviesDataLoading(false))
                    throw new Error('Failed to fetch movie data');
                }
                const data = await response.json();
                console.log(setMoviesData)
                dispatch(setMoviesData(data?.Search))
                setPageCount(Math.ceil(data?.totalResults / 10));
                dispatch(setMoviesDataLoading(false))

            } catch (error) {
                dispatch(setMoviesDataLoading(false))
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const handleSearch = async () => {
        try {
            dispatch(setMoviesDataLoading(true))
            const response = await fetch(`http://www.omdbapi.com/?apikey=3251da0d&s=${searchText}&page=1`);
            if (!response.ok) {
                dispatch(setMoviesDataLoading(false))
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json();
            dispatch(setMoviesData(data?.Search))
            setPageCount(Math.ceil(data?.totalResults / 10));
            dispatch(setMoviesDataLoading(false))
            console.log(data)
        } catch (error) {
            dispatch(setMoviesDataLoading(false))
            console.error(error);
        }
    }

    const handlePage = async (e, p) => {
        try {
            dispatch(setMoviesDataLoading(true))
            const response = await fetch(`http://www.omdbapi.com/?apikey=3251da0d&s=${searchText || "movie"}&page=${p}`);
            if (!response.ok) {
                dispatch(setMoviesDataLoading(false))
                throw new Error('Failed to fetch movie data');
            }
            const data = await response.json();
            dispatch(setMoviesData(data?.Search))
            setPageCount(Math.ceil(data?.totalResults / 10));
            console.log(data)
            dispatch(setMoviesDataLoading(false))
        } catch (error) {
            dispatch(setMoviesDataLoading(false))
            console.error(error);
        }
    }



    const handleAdd = (item) => {
        const currentData = watchList

        const data = [...currentData, item]
        window.localStorage.setItem("data", JSON.stringify([...foundData, { "email": user, watchList: [...data] }]))
        dispatch(setWatchList(data))


    }

    return (
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
            <Grid item xs={10} sx={{ border: 1, borderRadius: 1, height: 150, borderColor: 'red', mt: 5, mb: 3 }}>
                <Typography sx={{ fontSize: 32 }}>
                    Welcome to <span style={{ color: 'red' }}>WatchList</span>
                </Typography>

                <Typography sx={{ fontSize: 16 }}>
                    Browse movie, add them to watchlists and share them with friends.
                </Typography>
                <Typography sx={{ fontSize: 16 }}>
                    Just click the &nbsp;
                    <AddIcon sx={{ borderRadius: 5, color: 'white', background: 'black', "&:hover": { background: 'black', color: 'white', } }} />
                    &nbsp;  to add the movie, the poster to see details
                </Typography>


            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', mb: 5 }}>
                <TextField sx={{
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: "#000",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#000",
                        },
                    },

                    "& label": {
                        paddingLeft: (theme) => theme.spacing(2),
                        color: "#000",
                        "&.Mui-focused": {
                            color: "#0000",
                        },
                    },
                    "& input": {
                        paddingLeft: (theme) => theme.spacing(0),
                        color: "#000",
                        zIndex: 1,
                    },


                }}
                    placeholder="Search" fullWidth
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <IconButton
                                    variant="contained"
                                    style={{

                                        borderRadius: 20,
                                        color: "#000",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleSearch}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Button sx={{ backgroundColor: 'red', "&:hover": { background: 'red', color: 'white', } }} variant='contained' onClick={handleSearch}>Search</Button>


                            </InputAdornment>
                        ),
                    }}

                />
            </Grid>
            <Grid xs={12} sx={{ mt: 2, }}>
                {movieDataLoading ?
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', }} my={5}>
                        <CircularProgress disableShrink />
                    </Box>
                    :
                    <Grid container spacing={5} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>

                        {
                            movieData?.map((item) => {
                                return (
                                    <Grid item={4} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                        <Card sx={{ width: 160, height: 350 }}>
                                            <CardActionArea>
                                                <IconButton onClick={() => handleAdd(item)} sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1, color: 'white', background: 'black', "&:hover": { background: 'white', color: 'black', } }}>
                                                    <AddIcon />
                                                </IconButton>
                                                <CardMedia
                                                    component="img"
                                                    height="190"
                                                    image={item?.Poster}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom component="div">
                                                        {item?.Title}

                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {item?.Type}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {item?.Year}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }


                    </Grid>}

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Pagination count={pageCount} size="large" onChange={(e, p) => handlePage(e, p)} />
                </Grid>
            </Grid>
        </Grid>
    )
}
