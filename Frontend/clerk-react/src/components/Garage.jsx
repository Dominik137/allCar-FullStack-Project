import React, { useEffect, useState } from "react";

function Garage({ user }) {
    const apiKey = 't07C/oLDrXGzgVa0X38y/Q==htfF9E6MVnai5NXW';
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [car, setCar] = useState('')

  

    const handleGetCar = async (event) => {
      event.preventDefault();

        const year = event.target.elements.year.value;
        const make = event.target.elements.make.value;
        const model = event.target.elements.model.value;


      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${make}&year=${year}&limit=1&model=${model}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result)
        setCar(result);
      } catch (error) {
        console.error('Error: ', error.message);
      }
    };

    function handleSaveCar(){
        const general_info = {
            city_mpg: car[0]?.city_mpg,
            highway_mpg: car[0]?.highway_mpg,
            combination_mpg: car[0]?.combination_mpg,
            cylinders: car[0]?.cylinders,
            drive: car[0]?.drive,
            class: car[0]?.class
        }
        
        fetch('/api/car_info',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                year: car[0]?.year,
                make: car[0]?.make,
                model: car[0]?.model,
                mileage: 2,
                // ^replace this with own user input
                general_info: JSON.stringify(general_info),
                engine_info: "nothing yet",
                light_info: "nothing yet",
                wheel_info: "nothing yet"
            })
        }) 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Post successful:", data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }




    return (
        <>
    <form className="grid" onSubmit={handleGetCar}>
      <div className="grid">
        <div>1</div>
        <div className="text-center">
            <h1>Select A Car!</h1>
            <label className="text-black" htmlFor="year">Year:</label>
            <input type="text" name="year" placeholder="Year" />
            <label className="text-black" htmlFor="make">Make:</label>
            <input type="text" name="make" placeholder="Make" />
            <label className="text-black" htmlFor="model">Model:</label>
            <input type="text" name="model" placeholder="Model" />
            <button className="color-black" type="submit">Search</button>
            </div>
        <div>3</div>
      </div>
    </form>
    <div className="grid">
      <div>1</div>
      <div className="text-center pt-8 ">
        <h1 className="underline underline-offset-2">Searched Car!</h1>
        <h2>{car[0]?.year} {car[0]?.make} {car[0]?.model}</h2>
        {car ? 
        <article>city mpg: {car[0]?.city_mpg}, highway mpg: {car[0]?.highway_mpg}, 
        combined mpg: {car[0]?.combination_mpg}, cylinders: {car[0]?.cylinders}, drive type: {car[0]?.drive}, class: {car[0]?.class} 
        <button onClick={handleSaveCar}>Save car info to backend!</button>
        </article>
        : ""
        }
      </div>
      <div className="text-center">
        <h2>Input Miantence data!</h2>
      </div>
    </div>
  </>
     );
    }    


export default Garage


