import './chatBox.css'

import { Box, Grid, TextField, Button, Typography } from "@mui/material"

import SendIcon from '@mui/icons-material/Send';
import contextAPI from '../component/context'
import { useContext, useEffect, useState } from "react";
import socketIO from 'socket.io-client'
import { useNavigate } from "react-router-dom";
import ReactScrollToBottom from "react-scroll-to-bottom"
import Message from './Message'
let socket;

function Chat() {
    let navigate = useNavigate()
    const [messages, setMsg] = useState([])
    const [id, setId] = useState("")
    const context = useContext(contextAPI)
    const [inputValue, setInputValue]= useState("")

    useEffect(() => {
        socket = socketIO("http://localhost:3000/", { transports: ["websocket"] })
        socket.on("connect", () => {
            setId(socket.id)
        })
        // join use here
        socket.emit("joined", { user: context.user })

        // get welcome user message
        socket.on("welcome", (data) => {
            console.log("welcome data ", data)
            let stateData = [...messages, data]
            setMsg(stateData)
        })

        // joined new user message
        socket.on("userJoined", (data) => {
            console.log("userJoined data ", data)
            let stateData = [...messages, data]
            setMsg(stateData)
        })



        // when user left message
        socket.on("userLeft", (data) => {
            console.log("userLeft data ", data)
        })
        return () => {
            socket.emit("disconnect")
            socket.off()
        }

    }, [])



    useEffect(() => {
        console.log("messages array here.. ", messages)
        // user messages to an other user
        socket.on("sendMsg", (data) => {
            setMsg([...messages,data])
           console.log("this is message data ", data)
        })

        return ()=>{
            socket.off()
        }
    },[messages])



    const msgValue = (e) => {
        setInputValue(e.target.value)
    }
    const sendMsgfun = () => {
        let message = inputValue
        socket.emit("message", { id, message })
        setInputValue("")
    }



    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#2C3A47",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

        }}>

            <Grid container justifyContent="center" alignItems="center">
                <Grid item sm={12} md={6} lg={6} xs={12} >

                    <Box
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            height: "500px",
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                        <Box
                            sx={{
                                backgroundColor: "crimson",
                                width: "100%",
                                padding: "12px",
                                color: "white"
                            }}>
                            <Typography sx={{ textTransform: "uppercase" }}>
                                RealTime Chat Application
                            </Typography>
                        </Box>
                        

                        <ReactScrollToBottom className="chatBox">
                            
                            {/* messages here */}
                            {messages.map((item,index)=>{
                                // console.log("item is ", item)
                                return (
                                    <Box sx={{margin : "5px"}}>
                                        <Message message={item} id={id}/>
                                    </Box>
                                )
                            })}
                            

                        </ReactScrollToBottom>
                        

                        {/* here is input field and button */}
                        <Box sx={{
                            width: "100%",
                            border: "1px solid #cfcfcf",
                            display: "flex"
                        }}>
                            <textarea onChange={msgValue} value={inputValue} placeholder="message here" style={{
                                flexGrow: "1",
                                padding: "6px",
                                border: "none",
                                resize: "none",
                                outline: 'none',
                                fontSize: "1rem",
                                fontFamily: "sans-serif"
                            }}></textarea>
                            <Button onClick={sendMsgfun}>
                                <SendIcon sx={{ color: "crimson" }} fontSize="small" />
                            </Button>
                        </Box>
                    </Box>



                </Grid>
            </Grid>
        </Box>
    )
}


export default Chat