import React from 'react'
import {Helmet} from "react-helmet-async"
const Title = ({title = "chatApp",
    description = "this is the chat app called MERNCHATAPP"

}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name = "description" content = {description}/>
    </Helmet>
    
  )
}

export default Title;