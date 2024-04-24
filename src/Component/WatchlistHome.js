import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Divider, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Home } from './Home';
import { WatchListFile } from './WatchListFile';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchList } from './redux/slices/movies';

const WatchlistHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = window.localStorage.getItem('user')
    const jsonData = window.localStorage.getItem('data');
    const watchList = useSelector((state) => state.moviesReducer.watchList);
    const currentData = jsonData ? JSON.parse(jsonData) : [];
    const data = currentData?.filter(d => d.email !== user)
    const foundData = currentData?.filter(d => d.email === user)
    const [tab, setTab] = useState('Home')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogin = () => {
        navigate('/login')

    }

    useEffect(() => {

        if (watchList?.length === 0 && foundData?.length > 0) {
            dispatch(setWatchList(foundData[0].watchList))
        }

    }, [])

    const handleLogout = () => {
        window.localStorage.setItem("data", JSON.stringify([...data, { "email": user, watchList: [...watchList] }]))
        window.localStorage.removeItem("user")
        navigate('/login')

    }

    return (

        <Grid container sx={{ mt: 1, overflowX: 'hidden', overflowY: 'hidden' }}>
            <Grid item xs={3} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', fontSize: 35, ml: 3, mb: 1 }}>Watchlists</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
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
                            placeholder="Search" InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IconButton

                                            sx={{
                                                border: 0,
                                                borderRadius: 20,
                                                color: "#000",
                                                cursor: "pointer",


                                            }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                    </Grid>

                    <Grid item xs={12} columnSpacing={2} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
                        <Button sx={{ backgroundColor: 'red', mb: 1, width: '220px', "&:hover": { background: 'red', color: 'white', } }} variant='contained' onClick={() => setTab('Home')} startIcon={<HomeIcon />}>Home</Button>
                        <Divider sx={{ width: '90%' }} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 22, }}>My Lists</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                        <Button sx={{ backgroundColor: 'red', mb: 1, width: '220px', "&:hover": { background: 'red', color: 'white', } }} variant='contained' onClick={() => setTab('WatchList')}>WatchList</Button>


                        <Typography sx={{ width: '220px', mt: 50, display: 'flex', justifyContent: 'space-between', border: 1, p: 1, alignItems: 'center' }}>
                            {user?.slice(0, 20) || "Guest"}
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        width: '20ch',
                                    },
                                }}
                            >

                                {!user && <MenuItem onClick={handleLogin}>
                                    Login
                                </MenuItem>}
                                {user && <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>}

                            </Menu>
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={0.1}>
                <Divider orientation='vertical' sx={{ width: "100%", height: '100%' }} />
            </Grid>


            <Grid item xs={8} sx={{ height: "100%" }}>

                {tab === "Home" && <Home />}
                {tab !== "Home" && <WatchListFile />}


            </Grid>

        </Grid>


    )
}

export default WatchlistHome;