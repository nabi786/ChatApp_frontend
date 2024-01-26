
import * as React from 'react';
import {Box,Typography} from "@mui/material"



const Message = ({message, id}) => {
    console.log("message object ", message)
    return (
        <Box sx={{display : "flex", justifyContent : `${message?.user=="Admin"? "center" : (message?.id==id)? "flex-end" : "flex-start"}`}}>
            <Box sx={{
                maxWidth:"50%",
                color : `${message?.user=="Admin"? "black": "white"}`,
                backgroundColor : `${message?.user=="Admin"? "#f5ccd4": "crimson"}`,
                padding : "6px",
                borderRadius : "5px",
               
                display : 'block'}}>
               <Typography sx={{ fontSize : `${message?.user=="Admin"? "12px": "16px"}`,}}>
                    {(message.user != "Admin")? (message.id != id)? `${message.user}:` : "" : "" }  {message.message}
                </Typography>  
            </Box>
        </Box>
    )
}


export default Message
