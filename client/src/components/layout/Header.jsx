import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy,Suspense, useState } from 'react'
import { orange } from '../../constants/color'
import {Add as AddIcon, Group as GroupIcon, Menu as MenuIcon, Search as SearchIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'

const SearchDialog = lazy(()=> import("../specific/search"))
const NotificationDialog = lazy(()=> import("../specific/Notifications"))
const NewGroupDialog = lazy(()=> import("../specific/NewGroup"))


const Header = () => {

    const navigate = useNavigate();

    const[isMobile,setIsMobile] = useState(false)
    const[isSearch,setIsSearch] = useState(false)
    const[isNewGroup,setIsNewGroup] = useState(false)
    const[isNotification,setIsNotification] = useState(false)

    const handleMobile = ()=>{
        setIsMobile((prev)=>!prev)
    }

    const openSearchDialog=()=>{
        setIsSearch((prev)=> !prev)
    }

    const openNewGroup = ()=>
        {
            setIsNewGroup((prev)=> !prev)
        }
     const openNotification = ()=>{
        setIsNotification((prev)=> !prev)
     }

    
const navigatetoGroup = ()=> navigate("/groups")

const logouthandler = ()=> {
    console.log("logout")
}
  return (
    <>
    <Box sx = {{flexGrow:1}} height = {"4rem"}>
            <AppBar
                position = "static"
                sx = {{
                    bgcolor:orange
                }}>
    
    <Toolbar>
    <Typography
    variant = "h6"
    sx = {{
        display: {xs: "none", sm:"block"},
    }}>
        Chattu
    </Typography>

    <Box sx = {{
        display: {xs: "block", sm:"none"},
    }}>

        <IconButton color = "inherit" onClick = {handleMobile}>
        <MenuIcon/>
        </IconButton>
    </Box>

    <Box 
     sx = {{flexGrow:1,
     }}/>

     <Box>

<IconBtn title = {"Seach"}
icon ={<SearchIcon/>}
onClick = {openSearchDialog}

/>
<IconBtn title = {"Manage Group"}
icon ={<GroupIcon/>}
onClick ={navigatetoGroup}

/>

<IconBtn title = {"New Group"}
icon ={<AddIcon/>}
onClick ={openNewGroup}

/>

<IconBtn title = {"Notification"}
icon ={<NotificationsIcon/>}
onClick = {openNotification}

/>

<IconBtn title = {"Logout"}
icon ={<LogoutIcon/>}
onClick = {logouthandler}

/>


   </Box>

    </Toolbar>
    </AppBar>
    </Box>

    {isSearch && 
    <Suspense fallback = {<Backdrop open/>}>
        <SearchDialog/>
        </Suspense>}

    {isNotification && 
    <Suspense fallback = {<Backdrop open/>}>
    <NotificationDialog/>
    </Suspense>}

    {isNewGroup && 
    <Suspense fallback = {<Backdrop open/>}>
    <NewGroupDialog/>
    </Suspense>}

    
    </>
  )
}


const IconBtn = ({title, icon, onClick})=>{
    return (
        <Tooltip title = {title}>
<IconButton color = "inherit" size = "large" onClick = {onClick}>
        {icon}
        </IconButton>
</Tooltip>

    )
}

export default Header