import React from "react";

function MaintenanceReminders({car}){
console.log(car.maintenance_info)

const oilServiceDate = new Date(car.maintenance_info.inputed_oil_service);
const formattedDate = oilServiceDate.toLocaleDateString('en-US'); //

const oilChangeNumber =  car.car_info.mileage - car.maintenance_info.mileage_oil_service;
const milesRemainingUntilOilChange = 5000 - (oilChangeNumber % 5000);

let color = {}; // Initialize color object

  if (milesRemainingUntilOilChange < 500) {
    color = { color: 'red' }; // Set color to orange if milesRemainingUntilOilChange < 2500
  } else if (milesRemainingUntilOilChange < 2500) {
    color = { color: 'orange' }; // Set color to red if milesRemainingUntilOilChange < 500
  }

return (
    <>
 
        <h1 className="font-newroman text-lg pt-2">The Last Oil Service was:</h1>
       <br></br>
        <p className="text-gray-700" >{formattedDate}</p>
        <br></br>
        <p className="text-lg font-newroman mb-2">You are {<p style={color}>{milesRemainingUntilOilChange}</p> } miles away from the next oil change.</p>
    </>
  );
}

export default MaintenanceReminders