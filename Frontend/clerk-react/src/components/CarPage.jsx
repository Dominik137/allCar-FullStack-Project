import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import json5 from 'json5'; // Import the json5 library
import EditMileage from "./EditMileage";
import EditableTitle from "./EditableTitle";

function CarPage(){
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [selectedEngineDetails, setSelectedEngineDetails] = useState(null);
    const [selectedBodyDetails, setSelectedBodyDetails] = useState(null)
    const [selectedWheelDetails, setSelectedWheelDetails] = useState(null)
    const [engineDisplay, setEngineDisplay] = useState(false)
    const [bodyDisplay, setBodyDisplay] = useState(false)
    const [wheelDisplay, setWheelDisplay] = useState(false)
    const [carType, setCarType] = useState(null)
    const [savedCarName, setSavedCarName] = useState('');
    
    const handleNameChange = (event) => {
      setSavedCarName(event.target.value);
    };

    const handleWheelsClick = async () => {
       console.log(car.car_info.wheel_info)
       const wheelInfo = car.car_info.wheel_info;
        // console.log(engineInfo)
        const parsedData = JSON.parse(wheelInfo);
        console.log(parsedData)
        setSelectedWheelDetails([parsedData])
        setWheelDisplay(!wheelDisplay)
        setEngineDisplay(false)
        setBodyDisplay(false)
        
    };

    const handleBodyClick = async () => {
        const bodyInfo = car.car_info.body_info;
        // console.log(engineInfo)
        const parsedData = JSON.parse(bodyInfo);
        console.log(parsedData)
        
        setSelectedBodyDetails(parsedData);
        setBodyDisplay(!bodyDisplay)
        setEngineDisplay(false)
        setWheelDisplay(false)
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
        setWheelDisplay(false)
    };

    const handleMileageSave = async (newMileage) => {
      try {
        const response = await fetch(`/api/car_info/${car?.car_info.id}`, {
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
    }

    const handleTitleSave = async (newTitle) => {
      try {
        const response = await fetch(`/api/saved_cars/${car.saved_car.id}`, {
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

  //  const handleDelete = async () => {
  //   alert('Are you sure you want to delete this car from your garage?' )
  //   try {
  //      const response = await fetch(`/api/saved_cars/${car.saved_car.id}`, {
  //        method: 'DELETE',
  //      });
   
  //      if (!response.ok) {
  //        throw new Error('Failed to delete car');
  //      }
  //      onDelete(saved_car.id);
   
  //      console.log('Car deleted successfully');
  //   } catch (error) {
  //      console.error('Error deleting car:', error.message);
  //   }
  //  };
  // add delete monday!!!


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
    // console.log(carType); // T
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
            <span className="material-symbols-outlined text-3xl cursor-pointer border-2 border-black hover:bg-green-800 hover:text-white" onClick={() => navigate(-1)}>
                arrow_back
            </span>
            <div className="grid">
                <div className="grid place-items-center">
                    <h1 className="pt-16 font-newroman text-3xl">Maintence info</h1>
                </div>
                <div className="grid place-items-center">
                    <h1 className="pt-10  font-sixty4 text-5xl">{<EditableTitle saved_car={car.saved_car} onSave={handleTitleSave} />} </h1>
                    
                {/* <button onClick={handleDelete} className="material-symbols-outlined contrast hover:bg-green-800 hover:text-white" style={{ width: '50px' }}>delete</button> */}
                {/* delete button */}
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
                {<EditMileage initialMileage={car.car_info.mileage} onSave={handleMileageSave}  />}
                 </p>
                 
                
                 <div className=" grid text-center space-x-3s relative " >
                <span className="border-2 border-black font-newroman cursor-pointer hover:bg-green-800 hover:text-white " onClick={handleWheelsClick}> Wheels</span>
                <span className="border-2 border-black  font-newroman cursor-pointer hover:bg-green-800 hover:text-white" onClick={handleBodyClick}> Body</span>
                <span className="border-2 border-black font-newroman cursor-pointer hover:bg-green-800 hover:text-white" onClick={handleEngineClick}> Engine</span>
                </div>
                {/* make some type of statement that sorts to what kind of type of car it is a render picture based on it */}
              
                {(!carType || carType.trim() === "") && (
                  <img src="../src/pics/sedan.png" />
              )}
              {carType && carType.startsWith("Truck") && (
                  <img src="../src/pics/truck.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("Sedan") && (
                  <img src="../src/pics/sedan.png" />
              )}
              {carType && carType.startsWith("Hatchback") && (
                  <img src="../src/pics/hatchback.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("SUV") && (
                  <img src="../src/pics/suv.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("Wagon") && (
                  <img src="../src/pics/wagon.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("Coupe") && (
                  <img src="../src/pics/coupe.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("Convertible") && (
                  <img src="../src/pics/convertible.png" style={{ transform: "scaleX(-1)" }} />
              )}
              {carType && carType.startsWith("Minivan") && (
                  <img className="pt-4" src="../src/pics/minivan.png" />
              )}
              {carType && carType.startsWith("Passanger") && (
                  <img className="pt-4" src="../src/pics/minivan.png" />
              )}
              {carType && carType.startsWith("Van, Cargo, Ext, ") && (
                  <img src="../src/pics/minivan.png" style={{ transform: "scaleX(-1)" }} />
              )}

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
           {engine && engine.engine_type && (<p>Engine Type: {engine.engine_type}</p>)}
            {engine && engine.fuel_type && (<p>Fuel Type: {engine.fuel_type}</p>)}
            {engine && engine.cylinders && (<p>Cylinders: {engine.cylinders}</p>)}
            {engine && engine.size && (<p>Size: {engine.size}</p>)}
            {engine && engine.horsepower_hp && (<p>Horsepower: {engine.horsepower_hp} HP</p>)}
            {engine && engine.torque_ft_lbs && (<p>Torque: {engine.torque_ft_lbs} ft-lbs</p>)}
            {engine && engine.valves && (<p>Valves: {engine.valves}</p>)}
            {engine && engine.valve_timing && (<p>Valve Timing: {engine.valve_timing}</p>)}
            {engine && engine.cam_type && (<p>Cam Type: {engine.cam_type}</p>)}
            {engine && engine.drive_type && (<p>Drive Type: {engine.drive_type}</p>)}
            {engine && engine.transmission && (<p>Transmission: {engine.transmission}</p>)}
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
  <div className="grid place-items-center">
  {wheelDisplay ? (
    <article>
      <h2 className="font-sixty4 underline">Wheel Details</h2>
      {selectedWheelDetails && selectedWheelDetails.length > 0? (
        selectedWheelDetails.map((wheelDetail, index) => (
          <div key={index}>
            <h1 className="underline">Tech Dets:</h1>
            {wheelDetail && wheelDetail.technical ? (
              <>
                {wheelDetail.technical.bolt_pattern && <p>Bolt Pattern: {wheelDetail.technical.bolt_pattern}</p>}
                {wheelDetail.technical.centre_bore && <p>Centre Bore: {wheelDetail.technical.centre_bore}</p>}
                {wheelDetail.technical.pcd && <p>PCD: {wheelDetail.technical.pcd}</p>}
                {wheelDetail.technical.rear_axis_centre_bore && <p>Rear Axis Centre Bore: {wheelDetail.technical.rear_axis_centre_bore}</p>}
                {wheelDetail.technical.rear_axis_pcd && <p>Rear Axis PCD: {wheelDetail.technical.rear_axis_pcd}</p>}
                {wheelDetail.technical.rear_axis_stud_holes && <p>Rear Axis Stud Holes: {wheelDetail.technical.rear_axis_stud_holes}</p>}
                {wheelDetail.technical.stud_holes && <p>Stud Holes: {wheelDetail.technical.stud_holes}</p>}
                {wheelDetail.technical.wheel_fasteners && wheelDetail.technical.wheel_fasteners.thread_size && <p>Thread Size: {wheelDetail.technical.wheel_fasteners.thread_size}</p>}
                {wheelDetail.technical.wheel_fasteners && wheelDetail.technical.wheel_fasteners.type && <p>Type: {wheelDetail.technical.wheel_fasteners.type}</p>}
                {wheelDetail.technical.wheel_tightening_torque && <p>Wheel Tightening Torque: {wheelDetail.technical.wheel_tightening_torque}</p>}
              </>
            ) : (
              <p>No wheel info available</p>
            )}
            {wheelDetail && wheelDetail.wheels && wheelDetail.wheels.front ? (
              <div>
                <h3 className="underline">Wheels:</h3>
                <p>Load Index: {wheelDetail.wheels.front.load_index}</p>
                <p>Rim: {wheelDetail.wheels.front.rim}</p>
                <p>Rim Diameter: {wheelDetail.wheels.front.rim_diameter}</p>
                <p>Rim Offset: {wheelDetail.wheels.front.rim_offset}</p>
                <p>Rim Width: {wheelDetail.wheels.front.rim_width}</p>
                <p>Speed Index: {wheelDetail.wheels.front.speed_index}</p>
                <p>Tire: {wheelDetail.wheels.front.tire}</p>
                <p>Tire Aspect Ratio: {wheelDetail.wheels.front.tire_aspect_ratio}</p>
                <p>Tire Construction: {wheelDetail.wheels.front.tire_construction}</p>
                <p>Tire Diameter: {wheelDetail.wheels.front.tire_diameter || 'N/A'}</p>
                <p>Tire Pressure: {wheelDetail.wheels.front.tire_pressure.psi} psi / {wheelDetail.wheels.front.tire_pressure.bar} bar</p>
                <p>Tire Sizing System: {wheelDetail.wheels.front.tire_sizing_system}</p>
                <p>Tire Width: {wheelDetail.wheels.front.tire_width}</p>
              </div>
            ) : (
              <p>No front wheel info available</p>
            )}
          </div>
        ))
      ) : (
        <p>No wheel info available</p>
      )}
    </article>
  ) : (
    ''
  )}
  
</div>


        </>
    )
}

export default CarPage