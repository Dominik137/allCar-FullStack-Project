import React from "react";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import MaintenanceReminders from "./MaintenanceReminders";

function DashboardCars({ car }) {
    console.log(car)
const navigate = useNavigate()

const [carType, setCarType] = useState(null)
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await fetch(`/api/saved_cars/${car.saved_car.id}`);
          
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }

          const data = await response.json();
          ;

          // Set carType directly to the latest type
          const bodyInfo = data?.car_info.body_info;
          const parsedData = JSON.parse(bodyInfo);
          const latestBodyType = parsedData.length > 0 ? parsedData[parsedData.length - 1].type : null;
          setCarType(latestBodyType); // Set carType to the latest body type or null if no body types exist
      } catch (error) {
          console.error('Error during fetch:', error);
      }
  };

  fetchData();
}, [car.saved_car.id]);


// onClick={() => navigate(`/edit-workout/${workout.id}`)}
  return (
    <>
    <div className="border border-black pl-4  cursor-pointer transition-all hover:border-green-800 grid mb-4 " onClick={() => navigate(`/car-page/${car.saved_car.id}`)}>
        <div>
        <h1 className="font-sixty4">{car.saved_car.name}</h1>
        <h2 className="text-xl font-newroman pt-2">{car.car_info.make}: {car.car_info.model}</h2>
      
      <p>Year: {car.car_info.year}</p>
    
      <p>Mileage: {car.car_info.mileage}</p>
      {carType && carType.startsWith("***") && (
    <img src="../src/pics/sedan.png" style={{ width: '250px', height: 'auto' }} />
)}
{carType && carType.startsWith("Truck") && (
    <img src="../src/pics/truck.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Sedan") && (
    <img src="../src/pics/sedan.png" style={{ width: '250px', height: 'auto' }} />
)}
{carType && carType.startsWith("Hatchback") && (
    <img src="../src/pics/hatchback.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("SUV") && (
    <img src="../src/pics/suv.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Wagon") && (
    <img src="../src/pics/wagon.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Coupe") && (
    <img src="../src/pics/coupe.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Convertible") && (
    <img src="../src/pics/convertible.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Minivan") && (
    <img className="pt-4" src="../src/pics/minivan.png" style={{ width: '250px', height: 'auto' }} />
)}
{carType && carType.startsWith("Passanger") && (
    <img className="pt-4" src="../src/pics/minivan.png" style={{ width: '250px', height: 'auto' }} />
)}
{carType && carType.startsWith("Van, Cargo, Ext, ") && (
    <img src="../src/pics/minivan.png" style={{ width: '250px', height: 'auto', transform: "scaleX(-1)" }} />
)}
        </div>
        <div>
        
      <h1 className="text-sm font-sixty4">Maintenance Reminders</h1>
        <MaintenanceReminders key={car.id} car={car} />
        
      </div>
    
    </div>
     {/* <hr className="border-t-2 border-black h-20 "></hr> */}
     </>
  );
}

export default DashboardCars;