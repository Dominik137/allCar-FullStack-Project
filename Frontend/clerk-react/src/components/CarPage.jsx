import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
function CarPage(){
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate()

    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/saved_cars/${carId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
                console.log(data);
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
                <div className=" grid text-center space-x-3" >
                <span className="border-2 border-black font-newroman cursor-pointer "> Wheels</span>
                <span className="border-2 border-black font-newroman cursor-pointer"> Lights</span>
                <span className="border-2 border-black font-newroman cursor-pointer"> Engine</span>
                </div>
                <p className="font-newroman text-2xl underline pt-8">{car.car_info.year}: {car.car_info.make} {car.car_info.model}
                <br></br>
                Mileage: {car.car_info.mileage}
                 </p>
                <img src="../src/pics/sedan1.png"   />
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
        </>
    )
}

export default CarPage