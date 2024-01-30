import React, { useState, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

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
    <>
      {/* Include the sign-out button */}
      <SignOutButton />
      {/* You can also render user-related information here */}
      <div>
        <p>User ID: {user.id}</p>
        <p>User Email: {user.email}</p>
      </div>
    </>
  );
}

export default Home;
