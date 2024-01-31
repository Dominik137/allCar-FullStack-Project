import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import SignedOutHome from "./signedOutHome";
import Dashboard from "./Dashboard";
import Garage from "./Garage";

function Layout({ user }) {
 return (
    <div className="flex flex-col h-screen">
      <header className="bg-black w-full">
        <h1 className="text-white text-xl p-4">allCar</h1>
      </header>
      <div className="flex h-full">
        <Nav user={user} />
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/signedOutHome" element={<SignedOutHome />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/garage" element={<Garage user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
 );
}

export default Layout;
