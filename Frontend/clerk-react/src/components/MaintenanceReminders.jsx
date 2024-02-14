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


  function suggestNextBreakFluidChange(lastMaintenanceDate) {
    // Parse the last maintenance date
    const lastDate = new Date(lastMaintenanceDate);
    // Get the current date
    const currentDate = new Date();
    // Calculate the next maintenance date by adding two years to the last maintenance date
    const nextMaintenanceDate = new Date(lastDate);
    nextMaintenanceDate.setFullYear(lastDate.getFullYear() +  2);
  
    // Check if the current date is past the next maintenance date
    if (currentDate > nextMaintenanceDate) {
      // Suggest a new next maintenance date by adding two years from the current date
      nextMaintenanceDate.setFullYear(currentDate.getFullYear() +  2);
    }
  
    // Format the next maintenance date
    const formattedNextDate = nextMaintenanceDate.toLocaleDateString('en-US');
    return formattedNextDate;
  }
  
  // Usage example:
  const nextBreakFluidChangeDate = suggestNextBreakFluidChange(car.maintenance_info.inputed_break_fluid_service);
  // console.log(nextBreakFluidChangeDate);
return (
    <>
{/*  
        <h1 className="font-newroman text-lg pt-2">The Last Oil Service was:</h1>
       <br></br>
        <p className="text-gray-700" >{formattedDate}</p> */}
        

        <p className="text-lg font-newroman mb-2 pt-2">Miles Until Your Next Oil Change: {<p className="text-lg" style={color}>{milesRemainingUntilOilChange} Miles</p> }</p>
        <p>Recommended Break Fluid Service Date: {nextBreakFluidChangeDate}</p>
    </>
  );
}

export default MaintenanceReminders