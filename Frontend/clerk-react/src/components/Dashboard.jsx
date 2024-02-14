// Dashboard.js
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import DashboardCars from "./DashboardCars";
import MaintenanceReminders from "./MaintenanceReminders"
import GPT from "./GPT";
import GoogleMaps from "./GoogleMaps";

function Dashboard({ user }) {
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`/api/garage/${user?.id}`)
      .then((response) => response.json())
      .then((data) => setUserCars(data.cars))
      .catch((error) => console.error("Error fetching data:", error));
  }, [user?.id]);

  return (
    <div>
      <div className="grid text-center">
       
        <div className=" pt-8 text-center pb-3">
          <h1 className="font-sixty4 text-4xl">Welcome back {user.username}!</h1>
        </div>
       
      </div>
      <div className="flex flex-row pl-2  ">
        <div className="basis-2/3 p-2 pr-60 ">
        <h1 className="text-3xl pb-2 font-newroman"> Your cars!</h1>
         {/* Map through the userCars array and render the Car component for each car */}
         {userCars.map((car) => (
            <DashboardCars key={car.id} car={car} />
            
          ))}
        
        {/* Edit Matience boar */}
        <div className="max-w-sm mx-auto bg-white shadow-lg  overflow-hidden">
          </div>
          
        </div>
        <div className="basis-1/3 pr-12 pt-2">
          <div>
        <h1 className="text-3xl pb-2 font-newroman">Chat Gpt</h1>
        <GPT />
          </div>
          <div className="pt-8 pb-32">

            <GoogleMaps />
          </div>
        </div>
      </div>
      <div className="flex flex-row text-center">
        <div className="basis-1/3">01</div>
        <div className="basis-1/3 pt-32">
        </div>
        <div className="basis-1/3">03</div>
      </div>
    </div>
  );
}

export default Dashboard;
