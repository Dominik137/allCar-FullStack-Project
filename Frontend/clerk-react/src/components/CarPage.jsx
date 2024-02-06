import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import json5 from 'json5'; // Import the json5 library
function CarPage(){
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [selectedDetails, setSelectedDetails] = useState(null);

    const handleWheelsClick = async () => {
        setSelectedDetails(car.car_info.wheel_info);
    };

    const handleLightsClick = async () => {
        setSelectedDetails(car.car_info.light_info);
    };

    const handleEngineClick = async () => {
        // Parse the engine info from JSON string to an object
        const engineInfo = car.car_info.engine_info;
        // console.log(engineInfo)
        const parsedData = JSON.parse(engineInfo);
        // console.log(parsedData)
        // Set the parsed engine info as the selected details
        setSelectedDetails(parsedData);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/saved_cars/${carId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
                // console.log(data);
                setCar(data);
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
    
        fetchData();
    }, [carId]);

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
                 
                 <div className="relative inline-block">
                 <div className=" grid text-center space-x-3s relative " >
                <span className="border-2 border-black font-newroman cursor-pointer relative top-16 left-8 " onClick={handleWheelsClick}> Wheels</span>
                <span className="border-2 border-black  font-newroman cursor-pointer relative left-56 top-28" onClick={handleLightsClick}> Lights</span>
                <span className="border-2 border-black font-newroman cursor-pointer relative right-4 top-16" onClick={handleEngineClick}> Engine</span>
                </div>
                <img src="../src/pics/sedan1.png"   />
                </div>
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
  {car.car_info.year >= 2015 && car.car_info.year <= 2020 ? (
    <article>
      {selectedDetails && selectedDetails.map((engine, index) => (
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
      ))}
    </article>
  ) : (
    <p>Sorry, only cars between 2015 and 2020 have engine info</p>
  )}
</div>
        </>
    )
}

export default CarPage