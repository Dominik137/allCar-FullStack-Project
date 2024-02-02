// SavedCarCard.js
import React from "react";
import EditMileage from './EditMileage';
import EditableTitle from "./EditableTitle"; // Import the EditableTitle component
import { RiPencilLine } from 'react-icons/ri';

function SavedCarCard({ car, setSavedCarName, onDelete }) {
 const { saved_car, car_info, maintenance_info } = car;

 const handleDelete = async () => {
    try {
       const response = await fetch(`/api/saved_cars/${saved_car.id}`, {
         method: 'DELETE',
       });
   
       if (!response.ok) {
         throw new Error('Failed to delete car');
       }
       onDelete(saved_car.id);
   
       console.log('Car deleted successfully');
    } catch (error) {
       console.error('Error deleting car:', error.message);
    }
   };

 const formatMaintenanceDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
 

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
      setSavedCarName((prevState) => ({ ...prevState, name: newTitle }));

      console.log('Car name updated successfully');
    } catch (error) {
      console.error('Error updating car name:', error.message);
    }
 };

 const handleMileageSave = async (newMileage) => {
  try {
    const response = await fetch(`/api/car_info/${car.car_info.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mileage: newMileage }),
    });

    if (!response.ok) {
      throw new Error('Failed to update mileage');
    }

    console.log('Mileage updated successfully');
    // You might want to update the state or perform other actions here if needed.
  } catch (error) {
    console.error('Error updating mileage:', error.message);
  }
};


 return (
    <div className="grid">
    <div className="text-center">
    <article style={{ width: 'auto', height: 'auto',  }}>
        <EditableTitle saved_car={saved_car} onSave={handleTitleSave} />
        <br></br>
        <p>Make: {car_info.make}</p>
        <p>Model: {car_info.model}</p>
        <p>Year: {car_info.year}</p>
          <EditMileage initialMileage={car_info.mileage} onSave={handleMileageSave}  />
        <br></br>
        <details style={{ border: '1px solid #000000', }}>
  <summary>General Info: </summary>
  {car_info.general_info && (
    <ul>
      {Object.entries(JSON.parse(car_info.general_info)).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {value}
        </li>
      ))}
    </ul>
  )}
</details>
        <details style={{ border: '1px solid #000000', }}>
          <summary>Maintenance Info: </summary>
          <p>Latest oil change: {formatMaintenanceDate(maintenance_info.inputed_oil_service)}</p>
          <p>Latest tire rotation: {formatMaintenanceDate(maintenance_info.inputed_tire_roto)}</p>
          <p>Latest brake fluid change: {formatMaintenanceDate(maintenance_info.inputed_break_fluid_service)}</p>
        </details>
        <button onClick={handleDelete} class="material-symbols-outlined contrast" style={{'width': '50px'}}>delete</button>
      </article>
    </div>
    </div>
 );

};

export default SavedCarCard;
