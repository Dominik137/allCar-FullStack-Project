import React from "react";

function DashboardCars({ car }) {
    console.log(car)
  return (
    <div className="border p-4 mb-4">
        <h1 className="font-sixty4">{car.saved_car.name}</h1>
      <h2 className="text-xl font-newroman ">{car.car_info.make}: {car.car_info.model}</h2>
      <p>Year: {car.car_info.year}</p>
      {/* Add more details if needed */}
    </div>
  );
}

export default DashboardCars;