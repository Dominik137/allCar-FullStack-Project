import { useState } from 'react'
import viteLogo from '/vite.svg'
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import Home from './components/Home'
import SignedOutHome from './components/signedOutHome'

import Nav from './components/Nav'

function App() {
  


  return (
   
        
        <div>
          <SignedIn>
            <Home />
          </SignedIn>
          <SignedOut>
            <SignedOutHome />
          </SignedOut>
        </div>
      
  );
};


export default App
