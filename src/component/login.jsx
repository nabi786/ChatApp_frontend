
import { useState, useContext } from 'react'
import { Box, Button, TextField } from '@mui/material'
import {Link} from "react-router-dom"
import contextAPI from '../component/context'

function Login() {

    const context = useContext(contextAPI)

    
    const handleValue = (e)=>{
        context.setUser(e.target.value)
    }



    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: '#2C3A47'
            }}>
            <Box
                sx={{
                    position: "absolute", top: '50%', left: "50%",
                    transform: "translate(-50%,-50%)",

                }}
            >
                <TextField
                    onChange={handleValue}
                    label="username" fullWidth variant="outlined"
                    color="primary"
                    sx={{ background: 'white' }}
                />

                <Link onClick={(event)=> context.user ? null : event.preventDefault()} to="/chat">
                    <Button variant="contained" sx={{ marginTop: "10px", backgroundColor : "crimson" }}>
                        Submit
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}


export default Login