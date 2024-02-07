import React from "react";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";


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
    <div className="border p-4 mb-4 cursor-pointer transition-all hover:border-black grid" onClick={() => navigate(`/car-page/${car.saved_car.id}`)}>
        <div>
        <h1 className="font-sixty4">{car.saved_car.name}</h1>
        {carType && (
                <>
                    {carType.startsWith("Truck") && (
                  <img src="../src/pics/truck.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType.startsWith("Sedan") && (
                  <img src="../src/pics/sedan.png" />
              )}
              {carType.startsWith("Hatchback") && (
                  <img src="../src/pics/hatchback.png" style={{ transform: "scaleX(-1)" }} />
              )}
                {carType.startsWith("SUV") && (
                  <img src="../src/pics/suv.png" style={{ transform: "scaleX(-1)" }} />
              )}
               {carType.startsWith("Wagon") && (
                  <img src="../src/pics/wagon.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType.startsWith("Coupe") && (
                  <img src="../src/pics/coupe.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType.startsWith("Convertible") && (
                  <img src="../src/pics/convertible.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType.startsWith("Minivan") && (
                  <img className="pt-4" src="../src/pics/minivan.png" />
              )}
              {carType.startsWith("Passanger") && (
                  <img className="pt-4" src="../src/pics/minivan.png" />
              )}
              {carType.startsWith("Van, Cargo, Ext, ") && (
                  <img src="../src/pics/minivan.png" style={{ transform: "scaleX(-1)" }} />
              )}
                </>
            )}
        </div>
        <div>
      <h2 className="text-xl font-newroman ">{car.car_info.make}: {car.car_info.model}</h2>
      <br></br>
      <p>Year: {car.car_info.year}</p>
      <br></br>
      <p>Mileage: {car.car_info.mileage}</p>
      </div>
    </div>
  );
}

export default DashboardCars;