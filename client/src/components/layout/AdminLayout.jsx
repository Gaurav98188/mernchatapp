
import { Close as CloseIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon} from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Dashboard as DashboardIcon } from '@mui/icons-material'
import {Link as LinkComponent} from "react-router-dom"
import { matBlack } from '../../constants/color'


const Link = styled(LinkComponent)`
text-decoration:none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover{
color: rgba(0,0,0,0.54)}

`

const adminTabs = [

{

  name:"Dashboard",
  path:"/admin/dashboard",
  icon:<DashboardIcon/>

},

{

  name:"Users",
  path:"/admin/users",
  icon:<ManageAccountsIcon/>

},
{

  name:"Chats",
  path:"/admin/chats",
  icon:<GroupsIcon/>




},
{

  name:"Messages",
  path:"/admin/messages",
  icon:<MessageIcon/>

},]

const logouthandler =()=>{
  console.log(logout);
}
const Sidebar =({w="100"}) =>{

  const location = useLocation();
  return <Stack width={w} direction={"column"} p = {"3rem"} spacing={"3rem"}>
   <Typography variant = "h5" textTransform={"uppercase"}>
    Chattu
   </Typography>

   <Stack spacing={"1rem"}>

    {
      adminTabs.map((tab)=>(
        <Link key = {tab.path} to={tab.path}  
        sx={
          location.pathname === tab.path && {
            bgcolor:matBlack,
            color:"white",
            ":hover":{
              color:"white"
            }
          }
        }
        >
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
            {tab.icon}
            <Typography>{tab.name}</Typography>
          </Stack>
        </Link>
      ))
    }

        <Link  onClick={logouthandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
            <ExitToAppIcon/>
            <Typography>Logout</Typography>
          </Stack>
        </Link>

   </Stack>

  </Stack>
}

const isAdmin = true;
const AdminLayout = ({children}) => {

  const [isMobile,setIsMobile] = useState(false);

  const handleMobile = ()=>{
    setIsMobile(!isMobile)
  }

  const handleClose =()=>{
    setIsMobile(false);
  }
  
  if(!isAdmin) return <Navigate to={"/admin"}/> 

  return (
    <Grid container minHeight={"100vh"}>

    <Box sx = {{
      display: {xs:"block", md:"none"},
      position:"fixed",
      right:"1rem",
      top:"1rem"
    }}>
    <IconButton onClick={handleMobile}>
      {
        isMobile? <CloseIcon/> : <MenuIcon/>
      }
    </IconButton>

    </Box>
      <Grid item md = {4} lg = {3} sx = {{
        display:{
          xs:"none" , md: "block"
        }
      }}>
      <Sidebar/>
      </Grid>
      <Grid
      item
      xs = {12}
      md = {8}
      lg = {9}
      sx = {{
        bgcolor:"#f5f5f5"
      }}>
        {children}
      
      </Grid>

      <Drawer open = {isMobile} onClose={handleClose}>
        <Sidebar w = "50vw"/>
      </Drawer>

    </Grid>
  )
}

export default AdminLayout