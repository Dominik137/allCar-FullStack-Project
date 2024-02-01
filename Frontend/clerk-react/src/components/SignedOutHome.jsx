import React from "react";
import {SignInButton} from "@clerk/clerk-react"
import Nav from "./Nav";

function SignedOutHome(){
    return     (   
       <>
    <div className="flex flex-col h-screen">
      <header className="bg-black w-full">
        <h1 className="text-white text-2xl p-4 font-sixty4">allCar</h1>
      </header>
      <div className="flex h-full">
        <Nav />
        <div className="flex-grow overflow-auto">
            <div className="grid" >
                <div className="border-solid border-2 border-indigo-600">1</div>
                <div className="border-solid border-2 border-indigo-600">
                    <h1 className="font-sixty4 text-center pt-8 text-4xl">Welcome To allCar!</h1>
                </div>
                <div className="border-solid border-2 border-indigo-600">3</div>
                </div>
            <div className=" grid border-solid border-2 border-indigo-600">
                <div className="border-solid border-2 border-indigo-600"></div>
                <h1 className="font-newroman text-center pt-20 text-2xl">Here at all car our mission is to provide a centeral hub for your cars and all their needs!</h1>
                <div className="border-solid border-2 border-indigo-600"></div>
            </div>
        
            <div className="border-solid border-2 border-indigo-600"><img src="../../example.png"/></div>

        </div>
      </div>
    </div>
 
       </>
    )
}

export default SignedOutHome