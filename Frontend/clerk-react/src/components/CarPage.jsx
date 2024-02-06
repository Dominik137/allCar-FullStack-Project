import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import json5 from 'json5'; // Import the json5 library
function CarPage(){
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [selectedEngineDetails, setSelectedEngineDetails] = useState(null);
    const [selectedBodyDetails, setSelectedBodyDetails] = useState(null)
    const [engineDisplay, setEngineDisplay] = useState(false)
    const [bodyDisplay, setBodyDisplay] = useState(false)
    const [carType, setCarType] = useState(null)
    
    const handleWheelsClick = async () => {
        // setSelectedDetails(car.car_info.wheel_info);
    };

    const handleBodyClick = async () => {
        const bodyInfo = car.car_info.body_info;
        // console.log(engineInfo)
        const parsedData = JSON.parse(bodyInfo);
        console.log(parsedData)
        
        setSelectedBodyDetails(parsedData);
        setBodyDisplay(!bodyDisplay)
        setEngineDisplay(false)
    };

    const handleEngineClick = async () => {
        // Parse the engine info from JSON string to an object
        const engineInfo = car.car_info.engine_info;
        // console.log(engineInfo)
        const parsedData = JSON.parse(engineInfo);
        // console.log(parsedData)
        // Set the parsed engine info as the selected details
        setSelectedEngineDetails(parsedData);
        setEngineDisplay(!engineDisplay)
        setBodyDisplay(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/saved_cars/${carId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
                setCar(data);
    
                // Set carType directly to the latest type
                const bodyInfo = data?.car_info.body_info;
                const parsedData = JSON.parse(bodyInfo);
                const latestBodyType = parsedData.length > 0 ? parsedData[parsedData.length - 1].type : null;
                setCarType(latestBodyType); // Set carType to the latest body type or null if no body types exist
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
    
        fetchData();
    }, [carId]);
    
    // Then, you can access carType in your component
    console.log(carType); // T
    const formatMaintenanceDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };
     

    if (!car) {
        // Render loading state or return null
        return <></>;
    }




    return(
        <>
            <span className="material-symbols-outlined text-3xl cursor-pointer border-2 border-black " onClick={() => navigate(-1)}>
                arrow_back
            </span>
            <div className="grid">
                <div className="grid place-items-center">
                    <h1 className="pt-16 font-newroman text-3xl">Maintence info</h1>
                </div>
                <div className="grid place-items-center">
                    <h1 className="pt-10  font-sixty4 text-5xl">{car.saved_car.name}</h1>
                </div>
                <div className="grid place-items-center">
                <h1 className="pt-16 font-newroman text-3xl">Car Info</h1>
                </div>
            </div>
            <div className="grid pt-4">
            <div className="grid place-items-center">
                <div className="text-center border-4 border-black pl-2 pr-2">
                <p className="font-newroman text-2xl">Latest oil change: <br></br>{formatMaintenanceDate(car.maintenance_info.inputed_oil_service)}</p>
                <p className="font-newroman text-2xl">Latest tire rotation: <br></br>{formatMaintenanceDate(car.maintenance_info.inputed_tire_roto)}</p>
                <p className="font-newroman text-2xl">Latest brake fluid change:  <br></br>{formatMaintenanceDate(car.maintenance_info.inputed_break_fluid_service)}</p>
                </div>
            </div>
            <div className=" place-items-center pt-10 text-center">
                
                <p className="font-newroman text-2xl underline pb-12">{car.car_info.year}: {car.car_info.make} {car.car_info.model}
                <br></br>
                Mileage: {car.car_info.mileage}
                 </p>
                 
                
                 <div className=" grid text-center space-x-3s relative " >
                <span className="border-2 border-black font-newroman cursor-pointer  " onClick={handleWheelsClick}> Wheels</span>
                <span className="border-2 border-black  font-newroman cursor-pointer " onClick={handleBodyClick}> Body</span>
                <span className="border-2 border-black font-newroman cursor-pointer " onClick={handleEngineClick}> Engine</span>
                </div>
                {/* make some type of statement that sorts to what kind of type of car it is a render picture based on it */}
                <img src="../src/pics/sedan.png"   />
               
            </div>
            <div className="grid place-items-center">
            <div className="text-center border-4 border-black pl-2 pr-2">
                {Object.entries(JSON.parse(car.car_info.general_info)).map(([key, value]) => (
                    <p className="font-newroman text-2xl" key={key}>
                    <strong>{key}:</strong> {value}
                    </p>
                ))}
                </div>
            </div>
            </div>
            <div className="grid place-items-center">
            {engineDisplay ? (
  car.car_info.year >= 2015 && car.car_info.year <= 2020 ? (
    <article>
        <h2 className="font-sixty4 underline">Engine Details</h2>
      {selectedEngineDetails && selectedEngineDetails.length > 0 ? (
        selectedEngineDetails.map((engine, index) => (
          <div key={index}>
            <p>Engine Type: {engine.engine_type}</p>
            <p>Fuel Type: {engine.fuel_type}</p>
            <p>Cylinders: {engine.cylinders}</p>
            <p>Size: {engine.size}</p>
            <p>Horsepower: {engine.horsepower_hp} HP</p>
            <p>Torque: {engine.torque_ft_lbs} ft-lbs</p>
            <p>Valves: {engine.valves}</p>
            <p>Valve Timing: {engine.valve_timing}</p>
            <p>Cam Type: {engine.cam_type}</p>
            <p>Drive Type: {engine.drive_type}</p>
            <p>Transmission: {engine.transmission}</p>
          </div>
        ))
      ) : (
        <p>No engine info available</p>
      )}
    </article>
  ) : (
    <p>Sorry, only cars between 2015 and 2020 have engine info</p>
  )
) : (
  ''
)}
</div>
<div className="grid place-items-center">
  {bodyDisplay ? (
    car.car_info.year >= 2015 && car.car_info.year <= 2020 ? (
      <article>
        <h2 className="font-sixty4 underline">Body Details</h2>
        {selectedBodyDetails && selectedBodyDetails.length > 0 ? (
          selectedBodyDetails.map((bodyDetail, index) => (
            <div key={index}>
              {bodyDetail.cargo_capacity && <p>Cargo Capacity: {bodyDetail.cargo_capacity}</p>}
              {bodyDetail.curb_weight && <p>Curb Weight: {bodyDetail.curb_weight}</p>}
              {bodyDetail.doors && <p>Doors: {bodyDetail.doors}</p>}
              {bodyDetail.front_track && <p>Front Track: {bodyDetail.front_track}</p>}
              {bodyDetail.gross_weight && <p>Gross Weight: {bodyDetail.gross_weight}</p>}
              {bodyDetail.ground_clearance && <p>Ground Clearance: {bodyDetail.ground_clearance}</p>}
              {bodyDetail.height && <p>Height: {bodyDetail.height}</p>}
              {bodyDetail.length && <p>Length: {bodyDetail.length}</p>}
              {bodyDetail.max_cargo_capacity && <p>Max Cargo Capacity: {bodyDetail.max_cargo_capacity}</p>}
              {bodyDetail.max_payload && <p>Max Payload: {bodyDetail.max_payload}</p>}
              {bodyDetail.max_towing_capacity && <p>Max Towing Capacity: {bodyDetail.max_towing_capacity}</p>}
              {bodyDetail.rear_track && <p>Rear Track: {bodyDetail.rear_track}</p>}
              {bodyDetail.seats && <p>Seats: {bodyDetail.seats}</p>}
              {bodyDetail.type && <p>Type: {bodyDetail.type}</p>}
              {bodyDetail.wheel_base && <p>Wheel Base: {bodyDetail.wheel_base}</p>}
              {bodyDetail.width && <p>Width: {bodyDetail.width}</p>}
            </div>
          ))
        ) : (
          <p>No body info available</p>
        )}
      </article>
    ) : (
      <p>Sorry, only cars between 2015 and 2020 have body info</p>
    )
  ) : (
    ''
  )}
</div>

        </>
    )
}

export default CarPage