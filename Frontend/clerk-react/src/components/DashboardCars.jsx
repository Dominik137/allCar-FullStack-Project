import React from "react";
import {useNavigate} from 'react-router-dom'


function DashboardCars({ car }) {
    console.log(car)
const navigate = useNavigate()

// onClick={() => navigate(`/edit-workout/${workout.id}`)}
  return (
    <div className="border p-4 mb-4 cursor-pointer transition-all hover:border-black grid" onClick={() => navigate(`/car-page/${car.saved_car.id}`)}>
        <div>
        <h1 className="font-sixty4">{car.saved_car.name}</h1>
        <img src="../src/pics/sedan.png" width={"300px"}/>
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