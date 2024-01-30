import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import Home from './components/Home'
import Login from './components/Login'
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <SignedOut>
          <Login />
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
      </div>
    </>
  )
}

export default App
