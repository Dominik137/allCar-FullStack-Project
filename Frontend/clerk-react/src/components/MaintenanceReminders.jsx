import React from "react";

function MaintenanceReminders({car}){
console.log(car.maintenance_info)

const oilServiceDate = new Date(car.maintenance_info.inputed_oil_service);
const formattedDate = oilServiceDate.toLocaleDateString('en-US'); //

const oilChangeNumber =  car.car_info.mileage - car.maintenance_info.mileage_oil_service;
const milesRemainingUntilOilChange = 5000 - (oilChangeNumber % 5000);

return (
    <>
    <br></br>
    {/* <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden"> */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-sixty4 mb-2">{car.saved_car.name}</h1>
        <h2 className="text-xl font-newroman ">{car.car_info.make}: {car.car_info.model}</h2>
        <h1 className="text-lg font-bold mb-2">The Last Oil Service was:</h1>
        <p className="text-gray-700">{formattedDate}</p>
        <p className="text-lg font-bold mb-2">You are {milesRemainingUntilOilChange} miles away from the next oil change.</p>
      </div>
    {/* </div> */}
    </>
  );
}

export default MaintenanceReminders