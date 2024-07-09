import { Backdrop, Box, Button, Drawer, Grid, IconButton,Stack,TextField,Tooltip, Typography } from '@mui/material'
import {bggradient, matBlack, orange} from '../constants/color' 
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon} from '@mui/icons-material'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'

const ConfirmDeleteDialog = lazy(()=> import("../components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog"));

const isAddmember = false;

const Groups = () => {

  
  const chatId = useSearchParams()[0].get("group")

  const navigate = useNavigate();
  
  console.log(chatId)

  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

  const [groupName,setGroupName] = useState("");
  const [groupNameUpdatedValue,setgroupNameUpdatedValue] = useState("")

  const [confirmDeleteDialog,setconfirmDeleteDialog] = useState(false)

  const [isEdit,setisEdit] = useState(false)

  const removeMemberHandler = (id)=>{
    console.log("removeMemberHandler")
  }

  const handleMobile = ()=>{
    setIsMobileMenuOpen((prev)=> !prev)
  }
  const handleMobileClose = ()=>{
    setIsMobileMenuOpen(false);
  }
  const updateGroupName = ()=> {
      setisEdit(false)
      console.log("update group name")
    }

  useEffect(()=>{

   if(chatId)
    {
       
    setGroupName(`Group Name ${chatId}`);
    setgroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return ()=>{
      setGroupName("");
      setgroupNameUpdatedValue("");
      setisEdit(false)
    }


  },[chatId])
  const navigateBack = ()=>{
      navigate(
        "/"
      );
  }
  
  
  
  const openAddMemberHandler= () => {console.log("add member")}
  const openconfirmDeleteHandler = () => {
    setconfirmDeleteDialog(true)
    console.log("delete member")}

 const closeconfirmDeleteHandler = ()=>{
    setconfirmDeleteDialog(false)
  }

const deleteHandler = ()=>{
    console.log("delete handler")
    closeconfirmDeleteHandler();
  }

const ButtonGroup = (
    <Stack direction={{
      xs: "column-reverse",
      sm:"column-reverse"
    }}
    spacing={"1rem"}
    p={{
      xs:"0",
      sm:"1rem",
      md:"1rem 4 rem"
    }}>

      <Button size='large'
      color='error'
      startIcon={<DeleteIcon/>}
      onClick={openconfirmDeleteHandler}>
        Delete Group
      </Button>
      <Button 
      size='large'
      startIcon={<AddIcon/>}
      onClick={openAddMemberHandler}
      variant='contained'

    >
        Add Member
      </Button>
      
    </Stack>
  )


  const IconBtns = (
  <>
  <Box sx ={{
    display:{
      xs:"block",
      sx:"none",
      position:"fixed",
      right:"1rem",
      top:"1rem"
    }
  }}>
  <IconButton onClick={handleMobile}>
    <MenuIcon/>
  </IconButton>

  </Box>
  <Tooltip>
    <IconButton 
     sx = {{
      position:"absolute",
      top:"2rem",
      left:"2rem",
      bgcolor:matBlack,
      color:"white",
      ":hover":{
        bgcolor:"rgba(0,0,0,0.7)"
      },
      
    }} onClick={navigateBack}>
      <KeyboardBackspaceIcon/>
    </IconButton 
   >
  </Tooltip>
  </>
)  

const GroupName = (

   <Stack 
   direction={"row"} 
   alignItems={"center"} 
   justifyContent={"center"}
   spacing={"1rem"}
   padding={"3rem"}>
    {isEdit? (<>
    <TextField value={groupNameUpdatedValue} onChange={(e)=> setgroupNameUpdatedValue(e.target.value)}/>
    <IconButton onClick={updateGroupName}>
      <DoneIcon/>
    </IconButton>
    
    
    </>):(<>
    
    <Typography variant='h4'>{groupName}</Typography>
    <IconButton onClick={()=>setisEdit(true)}>
      <EditIcon/>
    </IconButton>
    </>

    )}
   </Stack>
  )

return (
    <Grid container height={"100vh"}>
      <Grid
      item 
      sx = {{
        display:{
          xs:"none",
          sm:"block",
        }
      }}
      sm = {4}
      bgcolor = {orange}>
        <GroupsList w = {"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid item
      xs = {12}
      sm = {8}
      sx = {{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem" 
         }}>
        {IconBtns}

        {groupName && <>

        {GroupName}

        <Typography margin={"2rem"}
        alignSelf={"flex-start"}
        variant='body1'>Members</Typography>

        <Stack 
        maxWidth={"45rem"}
        width={"100%"}
        bgcolor={"bisque"}
        padding={{
          sm:"1rem",
          xs:"0",
          md:"1rem 4rem"
        }}
        height={"50vh"}
        spacing={"2rem"}
        overflow={"auto"}
        >

{
          sampleUsers.map((i)=>(
            <UserItem user={i} 
            key={i._id}
            isAdded 
            styling={{
              boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
              padding:"1rem 2rem",
              borderRadius:"1rem"
            }} 
            handler={removeMemberHandler} />
          ))
      }

        
        </Stack>

      
        {ButtonGroup}
        </>}
      </Grid> 


      {
        isAddmember && (<Suspense 
        fallback = {<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense> )}

      {confirmDeleteDialog && (<Suspense
      fallback={<Backdrop/>}>
        <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose = {closeconfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>)}

     

<Drawer sx = {{
         display:{
          xs:"block",
          sm:"none",
         },
         }} open = {isMobileMenuOpen} onClose={handleMobileClose}>
          <GroupsList w = {"50vw"} myGroups={sampleChats} chatId={chatId}/>
         </Drawer>

    </Grid>
  )


}
const GroupsList = ({w = "100%",myGroups = [],chatId})=>(
  <Stack width={w}
  sx={{
    backgroundImage:bggradient,
    height:"100vh"
  }}>
    {
      myGroups.length > 0 ? (
        myGroups.map((group)=><GroupListItem group ={group} chatId = {chatId} key={group._id}/>)
      ):(
        <Typography textAlign={"center"} padding="1rem">
          No groups
        </Typography>
      )
    }
  </Stack>
)

const GroupListItem = memo(({group,chatId})=>{
  
  const {name,avatar,_id} = group;

return (
  <Link to = {`?group=${_id}`} 
  onClick={(e)=> {
    if(chatId === _id) e.preventDefault();
  }} >
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
    <AvatarCard avatar={avatar}/>
    <Typography>{name}</Typography>
  </Stack>
  </Link>
)


});

export default Groups