import React, { useEffect, useState } from "react";
import SavedCarCard from "./SavedCarCard";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function Garage({ user }) {
    const apiKey = 't07C/oLDrXGzgVa0X38y/Q==htfF9E6MVnai5NXW';
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [car, setCar] = useState('')

    const [oilDate, setOilDate] = useState(null);
    const [tireRotationDate, setTireRotationDate] = useState(null);
    const [brakeFluidChangeDate, setBrakeFluidChangeDate] = useState(null);

    const [savedCarName, setSavedCarName] = useState('');

    const [userCars, setUserCars] = useState([]);

    const handleNameChange = (event) => {
      setSavedCarName(event.target.value);
    };
  
    useEffect(() => {
      // Fetch data from the API
      fetch(`/api/garage/${user?.id}`)
        .then((response) => response.json())
        .then((data) => setUserCars(data.cars))
        .catch((error) => console.error('Error fetching data:', error));
    }, [user?.id]);
  


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

    async function handleSaveCarInfo(){
        const general_info = {
            city_mpg: car[0]?.city_mpg,
            highway_mpg: car[0]?.highway_mpg,
            combination_mpg: car[0]?.combination_mpg,
            cylinders: car[0]?.cylinders,
            drive: car[0]?.drive,
            class: car[0]?.class
        }
        
        return fetch('/api/car_info',{
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
            return data[0].id
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

  async function save_maintenance_info(){
      const maintenanceData = {
        inputed_oil_service: oilDate,
        inputed_tire_roto: tireRotationDate,
        inputed_break_fluid_service: brakeFluidChangeDate,
    };
   return fetch('/api/maintenance_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceData),
 })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Post successful:', data);
      return data[0].id
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function saveCar() {
  const carInfoId = await handleSaveCarInfo();
  const maintenanceInfoId = await save_maintenance_info();

  return fetch('/api/saved_cars', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          car_info_id: carInfoId,
          maintenance_info_id: maintenanceInfoId,
          name: savedCarName,
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Post successful:', data);
      return data[0].id
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

async function saveToGarage() {
  const savedCarId = await saveCar();
  const userId = user.id; // assuming 'user' has an 'id' property
 
  fetch('/api/garage', {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({
         user_id: userId,
         saved_car_id: savedCarId,
     }),
  })
  .then(response => {
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       return response.json();
  })
  .then(data => {
       console.log('Post successful:', data);
  })
  .catch(error => {
       console.error('Error:', error);
  });
 }
 


const handleSavingCar = () => {
  saveToGarage()
};



    return (
        <>
          <div className="garage-page">
      <h2 className="text-center text-3xl">My Garage</h2>
      <div className="car-list">
        {userCars.map((car, index) => (
          <SavedCarCard key={index} car={car}/>
        ))}
      </div>
    </div>
    <div className="grid">
    
  <details  style={{}}>
    <summary className="text-center">Add A Car!</summary>
      <form onSubmit={handleGetCar}>
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
      </form>
    <div className="text-center">
        <form>
          <h1>
        Input Miantence data!
          </h1>
          <label className="text-black" htmlFor="yearSelect">Last Oil service:</label>
      <DatePicker
        id="yearSelect"
        selected={oilDate}
        onChange={(date) => setOilDate(date)}
        showYearDropdown
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
      />
      <label className="text-black" htmlFor="tireRotationDatePicker">Tire Rotation Date:</label>
      <DatePicker
        id="tireRotationDatePicker"
        selected={tireRotationDate}
        onChange={(date) => setTireRotationDate(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
      />
        <label className="text-black" htmlFor="brakeFluidChangeDatePicker">Brake Fluid Change Date:</label>
      <DatePicker
        id="brakeFluidChangeDatePicker"
        selected={brakeFluidChangeDate}
        onChange={(date) => setBrakeFluidChangeDate(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
      />
        </form>
    </div>
    </details>
    </div>
    <div className="grid">
      <div></div>
      <div className="text-center pt-8 ">
        <h1 className="underline underline-offset-2">Searched Car!</h1>
        <h2>{car[0]?.year} {car[0]?.make} {car[0]?.model}</h2>
        {car ? 
        <article>city mpg: {car[0]?.city_mpg}, highway mpg: {car[0]?.highway_mpg}, 
        combined mpg: {car[0]?.combination_mpg}, cylinders: {car[0]?.cylinders}, drive type: {car[0]?.drive}, class: {car[0]?.class} 
        <label htmlFor="carName">Give your car a name:</label>
        <input type="text" id="carName" value={savedCarName} onChange={handleNameChange} />
        <button onClick={handleSavingCar}>Save car to Garage!</button>
        </article>
        : ""
        }
      </div>
      <div className="text-center">
      </div>
      
    </div>
    
  </>
     );
    }    


export default Garage

