import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
  } from "react-router-dom";
import Register from "../pags/auth/register";
import GuestRequire from "../middlewares/guest_require";
import Login from "../pags/auth/login";
import Chat from "../pags/main/chat";
import AuthRequired from "../middlewares/auth_require";



const user = localStorage.getItem('user')
let url = ""
let ws = null
if(user){
    url = "ws://localhost:8000/ws/" + user;
    ws = new WebSocket(url);
}



export default function Routes(){
        useEffect(()=>{


            if(user){
                ws.onopen = (event) => {
                    ws.send("");
                };
            }
            
           
        },[])
    
        return(
            <Router>

                    <Switch>
                    <Route path="/register" element={
                    <GuestRequire>

                    <Register />
                    </GuestRequire>
                    
                    } />


                    <Route path="/login" element={
                    <GuestRequire>

                    <Login />
                    </GuestRequire>
                    
                    } />



                    <Route path="/chat" element={
                    <AuthRequired>

                    <Chat ws={ws}/>
                    </AuthRequired>}/>


                    
                    </Switch>
            </Router>
            )

    }


