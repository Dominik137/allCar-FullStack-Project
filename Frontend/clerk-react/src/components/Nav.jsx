import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignOutButton, SignInButton } from "@clerk/clerk-react";
import Dashboard from "./Dashboard";
import Home from "./Home";


function Nav({navUser, user}) {
  
  return (
    <>
    <div className="flex h-screen  bg-gray-800">
      {/* Sidebar */}
      <div className="w-48 bg-black p-4 ">
        
        {/* Menu Items */}
        <div className="space-y-2 ">
          
          {user ? (
              <>
            
              <div className="font-sixty4">
                {/* trying to figure ouat clean boarder */}
                <Link className="text-white hover:text-gray-300 block border" to="/dashboard">Home</Link>
                </div>
              <div className="font-sixty4 border">
                <Link className="text-white hover:text-gray-300 block" to="/garage">Garage</Link>
              </div>
              <div className="text-white hover:text-gray-300 block font-sixty4 border">
                < SignOutButton />
              </div>
            </>
            ) : (
           
              
              <a href="#" className="text-white hover:text-gray-300 block font-sixty4 border"><SignInButton /></a>
            
          )}
          
        </div>
      </div>

      {/* Main Content */}
      
        {/* Your main content goes here */}

     
      
    </div>
    </>
  );
};
  
 
export default Nav