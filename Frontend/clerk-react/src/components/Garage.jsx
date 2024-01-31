import React, { useEffect, useState } from "react";

function Garage({ user }) {
    const apiKey = 't07C/oLDrXGzgVa0X38y/Q==htfF9E6MVnai5NXW';
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [car, setCar] = useState('')

    const handleModelChange = (event) => {
      setModel(event.target.value);
    };

    const handleYearChange = (event) => {
      setYear(event.target.value);
    };

    const handleMakeChange = (event) => {
      setMake(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

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
    return (
        <>
    <form className="grid" onSubmit={handleSubmit}>
      <div className="grid">
        <div>1</div>
        <div className="text-center">
            <h1>Select A Car!</h1>
            <label className="text-black" htmlFor="year">Year:</label>
            <input className="border border-black" type="text" id="year" value={year} onChange={handleYearChange} />
            <label className="text-black" htmlFor="make">Make:</label>
            <input className="border border-black" type="text" id="make" value={make} onChange={handleMakeChange} />
            <label className="text-black" htmlFor="model">Model:</label>
            <input className="border border-black" type="text" id="model" value={model} onChange={handleModelChange} />
            <button className="color-black" type="submit">Search</button>
            </div>
        <div>3</div>
      </div>
    </form>
    <div className="grid">
      <div>1</div>
      <div className="text-center pt-8 ">
        <h1>Searched Car!</h1>
        <h2>{year}, {make}, {model}</h2>
        <h2>Car Details!</h2>
        <h2>city mpg: {car[0]?.city_mpg}, highway mpg: {car[0]?.highway_mpg}, 
        combined mpg: {car[0]?.combination_mpg}, cylinders: {car[0]?.cylinders}, drive type: {car[0]?.drive}, class {car[0]?.class}  </h2>
      </div>
      <div>3</div>
    </div>
  </>
     );
    }    


export default Garage


