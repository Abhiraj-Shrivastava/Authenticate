import React from 'react'
import { useState, useEffect } from 'react';
import { Card, CircularProgress, Grid, IconButton, InputAdornment, Pagination, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Delete, Search } from '@mui/icons-material';
import { setMoviesData, setMoviesDataLoading, setWatchList } from './redux/slices/movies';
import { useDispatch, useSelector } from 'react-redux';


export const WatchListFile = () => {
  const dispatch = useDispatch()

  const user = window.localStorage.getItem('user')
  const jsonData = window.localStorage.getItem('data');
  const watchList = useSelector((state) => state.moviesReducer.watchList);
  const currentData = jsonData ? JSON.parse(jsonData) : [];
  const foundData = currentData?.filter(d => d.email !== user)

  const handleDelete = (item) => {
    let data = watchList;

    data = data?.filter(m => m?.imdbID !== item?.imdbID)

    window.localStorage.setItem("data", JSON.stringify([...foundData, { "email": user, watchList: [...data] }]))
    dispatch(setWatchList(data))

  }


  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
      <Grid item xs={10} sx={{ height: 150, borderColor: 'red', mt: 5 }}>
        <Typography sx={{
          fontSize: 44 ,
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#EBD8B2", 
            },

            "&.Mui-focused fieldset": {
              borderColor: "#EBD8B2", 
            },
          },

          "& label": {
            paddingLeft: (theme) => theme.spacing(2),
            color: "#D24A61",
            "&.Mui-focused": {
              color: "#EBD8B2", 
            },
          },
          "& input": {
            paddingLeft: (theme) => theme.spacing(0),
            color: "#000000",
            zIndex: 1,
          },

          "& fieldset": {
            paddingLeft: (theme) => theme.spacing(2.5),
            borderRadius: 2,
            backgroundColor: "#fff",
            "&:hover": {
              borderColor: "#EBD8B2",
            },
          },
        }}>
          My <span style={{ color: 'red' }}>WatchList</span>
        </Typography>


      </Grid>
      <Grid xs={12} >

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh', overflowY: 'scroll', scrollbarWidth: 'none', mt: 2 }}>

          {
            watchList?.map((item) => {
              return (
                <Grid item={4} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                  <Card sx={{ width: 160, height: 350 }}>
                    <CardActionArea>
                      <IconButton onClick={() => handleDelete(item)} sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1, color: 'white', background: 'black', "&:hover": { background: 'white', color: 'black', } }}>
                        <Delete />
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
        </Grid>


      </Grid>
    </Grid>
  )
}
