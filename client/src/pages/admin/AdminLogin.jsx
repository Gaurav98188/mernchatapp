import React from 'react'
import { bggradient } from '../../constants/color'
import {Button, Container, Paper, TextField, Typography

} from '@mui/material'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';

const isAdmin = true;

const AdminLogin = () => {
    const secretKey = useInputValidation("")

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("submit")
    }
 
if(isAdmin) return <Navigate to={"/admin/dashboard"}/>
  return (
    <div style={{
        backgroundImage:bggradient
    }}>
    <Container component={"main"} maxWidth="xs" sx ={{
        height:"100vh",
        display:"flex",
        justifyContent:"Center",
        alignItems:"Center",

    }}>
        <Paper
        elevation={3} sx = {{
            padding:4,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
        }}>
        
        
            <Typography variant="h5">Admin Login</Typography>
            <form 
            style={{
                width:"100%",
                marginTop:"1rem",
            }}
            onSubmit={submitHandler}>
              <TextField
              required
              fullWidth
              label="secret key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              />

              <Button
              sx={{
                marginTop:"1rem"
                }}
                variant="contained"
                color = "primary"
                type = "submit"
                fullWidth
                >

                Login
              </Button>
                
            </form>
            

        </Paper>

    </Container>

    </div> 
  )
}

export default AdminLogin