import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { graycolor } from '../constants/color'

const Home = () => {
  return (
    <Box bgcolor = {graycolor} height = {"100% "}>
      <Typography 
      p ={"2rem"} variant = "h5" textAlign={"center"}> 
      Select a Friend to Chat
    </Typography>
    </Box>
  )
}

export default AppLayout()(Home)
/*
export default (props)=>{
  return (
    <div>
      <div>Header</div>
      <Home {...props}/>
      <div>Footer</div>
    </div>
  )
}*/