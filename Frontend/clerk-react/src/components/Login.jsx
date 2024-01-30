import React from "react";
import {SignInButton} from "@clerk/clerk-react"

function Login(){
    return     (   
        <div id="login-div-background">
        <SignInButton />

        {/* HOME PAGE FOR WHEN USER IS NOT LOGGED IN */}
        </div>)
    
}

export default Login