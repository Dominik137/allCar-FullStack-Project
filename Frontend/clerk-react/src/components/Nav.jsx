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
      <div className="w-48 bg-black p-4">
        
        {/* Menu Items */}
        <ul className="space-y-2">
          <li>
          {user ? (
              <>
              <li className="font-sixty4 boarde">
              <div className="border border-white">
                {/* trying to figure ouat clean boarder */}
                <Link className="text-white hover:text-gray-300 block" to="/dashboard">Home</Link>
                </div>
              </li>
              <li className="font-sixty4">
                <Link className="text-white hover:text-gray-300 block" to="/garage">Garage</Link>
              </li>
              <li className="font-sixty4">
                <a href="#"  className="appearance-none text-white hover:text-gray-300 block"><SignOutButton /></a>
              </li>
            </>
            ) : (
            <li>
              
              <a href="#" className="text-white hover:text-gray-300 block"><SignInButton /></a>
            </li>
          )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      
        {/* Your main content goes here */}

     
      
    </div>
    </>
  );
};
  
 
export default Nav