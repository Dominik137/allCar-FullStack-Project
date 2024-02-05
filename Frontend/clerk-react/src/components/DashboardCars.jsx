import React from "react";
import {useNavigate} from 'react-router-dom'


function DashboardCars({ car }) {
    // console.log(car)
const navigate = useNavigate()

// onClick={() => navigate(`/edit-workout/${workout.id}`)}
  return (
    <div className="border p-4 mb-4 cursor-pointer transition-all hover:border-black" onClick={() => navigate(`/car-page/${car.saved_car.id}`)}>
        <h1 className="font-sixty4">{car.saved_car.name}</h1>
      <h2 className="text-xl font-newroman ">{car.car_info.make}: {car.car_info.model}</h2>
      <p>Year: {car.car_info.year}</p>
      <p>Mileage: {car.car_info.mileage}</p>
    </div>
  );
}

export default DashboardCars;