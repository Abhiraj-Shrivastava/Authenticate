import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setWatchList } from './redux/slices/movies'

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [emailId, setEmailId] = useState('')
    const jsonData = window.localStorage.getItem('data') ;
    const currentData = jsonData ? JSON.parse(jsonData) : [];
    const [emailError, setEmailError] = useState('');



    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return false
        } else {
            setEmailError('');
            return true
        }
    };




    
    const handleSubmit = () => {
        const validate = validateEmail(emailId);
        if (validate) {
            const foundData =  currentData?.filter(d => d.email === emailId) 
            console.log(foundData)
            if (foundData?.length === 0) {
                const data = [...currentData, { email: emailId, watchList: [] }]
                dispatch(setWatchList([]))
                window.localStorage.setItem('data', JSON.stringify(data))
                window.localStorage.setItem('user', emailId)

            } else {
                dispatch(setWatchList(foundData[0].watchList))
                window.localStorage.setItem('user', emailId)
            }

            navigate('/')
        }
    }

    return (
        <Box sx={{ background: "#001E3C", width: "100vw", height: "100vh", overflowX: "hidden" }}>
            <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "5.5%", pt: "3%" }}>
                <Box sx={{ background: "#ffffff", p: 0, width: { xs: "100vw", md: "80vw" }, borderRadius: { xs: "4%", md: "0%" }, mt: { xs: "22%", lg: "0%" } }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sx={{ p: { xs: "14% 5%", lg: "8% 5%" } }}>
                            <Typography sx={{
                                fontSize: { xs: "1.5em", md: "2.6em", lg: "2.4em" },
                                fontWeight: 700,
                                fontFamily: "OXANIUM",
                                color: "#000000",
                                letterSpacing: "-0.2px",
                                mb: "2.5vh",
                                textAlign: "center"
                            }}>
                               WatchList Login
                            </Typography>
                            <Grid container spacing={2} sx={{ p: "8% 5%" }}>
                                <Grid item xs={12}>
                                    <TextField label="Email" type='email' fullWidth value={emailId} onChange={(event) => setEmailId(event.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        onClick={handleSubmit}
                                        sx={{
                                            background: "#001E3C",
                                            color: "#ffffff",
                                            p: "2% 10%",
                                            fontSize: { xs: "0.8em", md: "1.1em", lg: "1.2em" },
                                            fontWeight: 600,
                                            "&:hover": {
                                                background: "#023569",
                                                color: "#ffffff",
                                            }
                                        }}
                                    >
                                        Log in
                                    </Button>
                                </Grid>
                                {emailError && <Grid item xs={12} style={{ color: 'red' }}>
                                    {emailError}
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>


    )
}
