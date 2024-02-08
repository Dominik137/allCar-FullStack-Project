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
        <h1 className="font-newroman text-lg ">The Last Oil Service was:</h1>
        <br></br>
        <p className="text-gray-700">{formattedDate}</p>
        <p className="text-lg font-newroman mb-2">You are {milesRemainingUntilOilChange} miles away from the next oil change.</p>
    </>
  );
}

export default MaintenanceReminders