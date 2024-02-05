// Dashboard.js
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import DashboardCars from "./DashboardCars";
import MaintenanceReminders from "./MaintenanceReminders";

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
      <div className="flex flex-row text-center">
        <div className="basis-1/3">01</div>
        <div className="basis-1/3 pt-8">
          <h1 className="font-sixty4 text-4xl">Welcome back {user.username}!</h1>
        </div>
        <div className="basis-1/3">
        </div>
      </div>
      <div className="flex flex-row text-center">
        <div className="basis-1/3">
        <h1 className="text-3xl "> TBD</h1>
        </div>
        <div className="basis-1/3 pt-32">
          <h1 className="text-3xl font-newroman">Your Cars</h1>
          {/* Map through the userCars array and render the Car component for each car */}
          {userCars.map((car) => (
            <DashboardCars key={car.id} car={car} />
          ))}
        </div>
        <div className="basis-1/3">
        <h1 className="text-3xl">Maintenance Reminders</h1>
        {userCars.map((car) => (
            <MaintenanceReminders key={car.id} car={car} />
          ))}
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
