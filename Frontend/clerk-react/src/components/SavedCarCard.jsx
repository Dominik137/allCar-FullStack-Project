// SavedCarCard.js
import React from "react";
import EditMileage from './EditMileage';
import EditableTitle from "./EditableTitle"; // Import the EditableTitle component
import { RiPencilLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function SavedCarCard({ car, setSavedCarName, onDelete }) {
 const { saved_car, car_info, maintenance_info } = car;
 const [carType, setCarType] = useState(null)

 const navigate = useNavigate()

useEffect(()=>{
 const bodyInfo = car?.car_info.body_info;
 const parsedData = JSON.parse(bodyInfo);
 const latestBodyType = parsedData.length > 0 ? parsedData[parsedData.length - 1].type : null;
 setCarType(latestBodyType)
 console.log(carType)
})
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
  <div className="text-center">
  <div class="border border-black p-4 mb-2 cursor-pointer transition-all ring-0 hover:ring-2 ring-green-800">
    <EditableTitle saved_car={saved_car} onSave={handleTitleSave} />
    <br />
    <div className="grid">
    <p className="font-newroman text-lg">{car_info.year} {car_info.make} {car_info.model}</p>
    {(!carType || carType.trim() === "") && (
    <img src="../src/pics/sedan.png" style={{ width: '150px', height: '90px' }} />
)}
{carType && carType.startsWith("Truck") && (
    <img src="../src/pics/truck.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Sedan") && (
    <img src="../src/pics/sedan.png" style={{ width: '150px', height: '90px' }} />
)}
{carType && carType.startsWith("Hatchback") && (
    <img src="../src/pics/hatchback.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("SUV") && (
    <img src="../src/pics/suv.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Wagon") && (
    <img src="../src/pics/wagon.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Coupe") && (
    <img src="../src/pics/coupe.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Convertible") && (
    <img src="../src/pics/convertible.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}
{carType && carType.startsWith("Minivan") && (
    <img className="pt-4" src="../src/pics/minivan.png" style={{ width: '150px', height: '90px' }} />
)}
{carType && carType.startsWith("Passanger") && (
    <img className="pt-4" src="../src/pics/minivan.png" style={{ width: '150px', height: '90px' }} />
)}
{carType && carType.startsWith("Van, Cargo, Ext, ") && (
    <img src="../src/pics/minivan.png" style={{ width: '150px', height: '90px', transform: "scaleX(-1)" }} />
)}

</div>
    <EditMileage initialMileage={car_info.mileage} onSave={handleMileageSave} />
    <br />
    <details style={{ border: '1px solid #000000' }}>
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
    <details style={{ border: '1px solid #000000' }}>
      <summary>Maintenance Info: </summary>
      <p>Latest oil change: {formatMaintenanceDate(maintenance_info.inputed_oil_service)}</p>
      <p>Latest tire rotation: {formatMaintenanceDate(maintenance_info.inputed_tire_roto)}</p>
      <p>Latest brake fluid change: {formatMaintenanceDate(maintenance_info.inputed_break_fluid_service)}</p>
    </details>
    <div className="space-x-1.5">
    <button onClick={handleDelete} className="material-symbols-outlined contrast hover:bg-green-800 hover:text-white" style={{ width: '50px' }}>delete</button>
    <button onClick={() => navigate(`/car-page/${car.saved_car.id}`)} className="material-symbols-outlined contrast hover:bg-green-800 hover:text-white" style={{ width: '50px' }}>arrow_forward</button>
    </div>
  </div>
</div>
 );

};

export default SavedCarCard;
