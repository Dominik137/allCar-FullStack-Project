// SavedCarCard.js
import React from "react";
import EditableTitle from "./EditableTitle"; // Import the EditableTitle component

function SavedCarCard({ car, setSavedCar }) {
 const { saved_car, car_info, maintenance_info } = car;

 const handleTitleSave = async (newTitle) => {
    try {
      const response = await fetch(`/api/saved_cars/${saved_car.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to update car name');
      }

      // Update the saved_car state with the new title
      setSavedCar((prevState) => ({ ...prevState, name: newTitle }));

      console.log('Car name updated successfully');
    } catch (error) {
      console.error('Error updating car name:', error.message);
    }
 };

 return (
    <div className="text-center">
      <article style={{}}>
        <EditableTitle saved_car={saved_car} onSave={handleTitleSave} />
        <br></br>
        <p>Make: {car_info.make}</p>
        <p>Model: {car_info.model}</p>
        <p>Year: {car_info.year}</p>
        <br></br>
        <details style={{ border: '1px solid #000000', }}>
          <summary>general info: </summary>
          <p>{car_info.general_info}</p>
        </details>
        <details style={{ border: '1px solid #000000', }}>
          <summary>Maintenance Info: </summary>
          <p>Latest oil change: {maintenance_info.inputed_oil_service}</p>
          <p>Latest tire rotation: {maintenance_info.inputed_tire_roto}</p>
          <p>Latest brake fluid change: {maintenance_info.inputed_break_fluid_service}</p>
        </details>
        {/* Add more details as needed */}
      </article>
    </div>
 );

};

export default SavedCarCard;
