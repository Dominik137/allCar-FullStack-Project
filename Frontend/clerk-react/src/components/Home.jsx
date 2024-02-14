import React, { useState, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import Nav from "./Nav";
import SignedOutHome from "./signedOutHome";
import Dashboard from "./Dashboard";
import Layout from "./layout";
import {
    createBrowserRouter,
    BrowserRouter,
    RouterProvider,
    Routes,
    Route,
    Router,
    Link
  } from "react-router-dom";

function Home(){

    const [user, setUser] = React.useState({})
    
    const currentUser = useUser()
    useEffect(()=>{
        fetch("/api/users")
        .then(response => response.json()) // Get the raw response text
        .then(data => {
            console.log(data);
            userCheck(data);
        })
    }, []);
    
        function userCheck(users){
            const userCheck = users.filter((u)=>u.email===currentUser.user.emailAddresses[0].emailAddress)
            if(userCheck.length===0){
                console.log("user not found, adding user")
                fetch("/api/users",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email:currentUser.user.emailAddresses[0].emailAddress,
                        username:currentUser.user.username,
                        id : currentUser.user.id
                    })
                })
                .then(r=>r.json())
                .then(data=>setUser(data))
                
            }
            else{
                setUser(userCheck[0])
                
            }
    
        }
    
  return (
    <BrowserRouter>
      <Layout user={user} />
    </BrowserRouter>
 );
}



export default Home;
