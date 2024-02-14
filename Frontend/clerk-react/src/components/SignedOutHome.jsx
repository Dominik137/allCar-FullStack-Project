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
                {/* <div className="">1</div> */}
                <div className="">
                    <h1 className="font-sixty4 text-center pt-8 text-4xl">Welcome To allCar!</h1>
                </div>
                {/* <div className="">3</div> */}
                </div>
            <div className=" grid ">
                <div className=""></div>
                <h1 className="font-newroman text-center pt-20 text-2xl pb-10">Here at all car our mission is to provide a centeral hub for your cars and all the information about them you need!</h1>
                <div className=""></div>
            </div>
            <div className="flex justify-center items-center">
                <div className="border border-black border-2">
                  <img src="../src/pics/HomepageExample.png" alt="Example" height="800px" width="800px" />
                </div>
              </div>
      </div>
      </div>
    </div>
 
       </>
    )
}

export default SignedOutHome