import React, { useEffect, useState } from "react";
import SavedCarCard from "./SavedCarCard";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

function Garage({ user }) {

  const apiKey = import.meta.env.VITE_API_KEY;


    const [modelForEng, setModelForEng] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [car, setCar] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [oilDate, setOilDate] = useState(null);
    const [tireRotationDate, setTireRotationDate] = useState(null);
    const [brakeFluidChangeDate, setBrakeFluidChangeDate] = useState(null);
    const [oilChangeMileage, setOilChangeMileage] = useState('');
    const [rotationDate, setRotationDate] = useState('');

    const [savedCarName, setSavedCarName] = useState('');
    const [savedCarMileage, setSavedCarMileage] = useState('')

    const [userCars, setUserCars] = useState([]);

    const handleOilMileageChange = (event) => {
      setOilChangeMileage(event.target.value);
    };

    const handleNameChange = (event) => {
      setSavedCarName(event.target.value);
    };

    const handleCarMileage = (event) =>{
      setSavedCarMileage(event.target.value)
    }
  
    const handleDeleteCar = (carId) => {
      // Filter out the deleted car from the userCars state
      setUserCars((prevCars) => prevCars.filter((car) => car.saved_car.id !== carId));
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
    
      setModelForEng(model)
     
      
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
        console.log(result);
    
        if (result.length > 0) {
          setCar(result);
         
        } else {
          // Display an alert if the result is an empty array
          alert('Enter a valid car');
        }
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
            class: car[0]?.class,    
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
                modelForEng: modelForEng,
                mileage: savedCarMileage,
                // ^replace this with own user input
                general_info: JSON.stringify(general_info),
                engine_info: "nothing yet",
                body_info: "nothing yet",
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
            return data.id
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
        mileage_oil_service: oilChangeMileage
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
  setIsLoading(true);
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

  const response = await fetch(`/api/saved_cars/${savedCarId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch the saved car with ID ${savedCarId}`);
  }
  const savedCar = await response.json();

  setUserCars((prevCars) => [...prevCars, savedCar]);
  setIsLoading(false)

   // Reset form after saving
   setCar('');
   setOilDate(null);
   setTireRotationDate(null);
   setBrakeFluidChangeDate(null);
   setOilChangeMileage('');
   setSavedCarName('');
   setSavedCarMileage('');
 }
 


const handleSavingCar = () => {
  saveToGarage()
  setCar('')
};



    return (
        <> 
           
        <h2 className="text-center text-4xl font-sixty4 pb-3 pt-3" >My Garage</h2>
          <div className="grid">
            
            <div className="grid grid-cols-2 grid-rows-2 gap-4 pl-8 pt-2">
              
        {userCars.map((car, index) => (
          <SavedCarCard key={index} setSavedCarName={setSavedCarName} car={car}   onDelete={handleDeleteCar} isLoading={isLoading}/>
        ))} 
         
      </div > 
     
    <div className="grid grid-rows-2 pt-2 pl-16 pr-12 justify-center" >
    <div>
  <details   >
  
    <summary  style={{color: "white" ,textAlign: "center",backgroundColor: 'Black', }}  className="text-center font-sixty4 pt-2 pb-2" >
      Add A Car!
      </summary>
      
      <form onSubmit={handleGetCar}>
        {!car ?
        <div className="text-center">
            <h1 className="underline font-newroman text-lg">Select A Car!</h1>
            <label className="text-black" htmlFor="year">Year:</label>
            <input className="rounded-none" type="text" name="year" placeholder="Year" />
            <label className="text-black" htmlFor="make">Make:</label>
            <input className="rounded-none" type="text" name="make" placeholder="Make" />
            <label className="text-black" htmlFor="model">Model:</label>
            <input className="rounded-none" type="text" name="model" placeholder="Model" />
            <div className="pl-32 pr-32">
            <button className="border-2 border-black font-newroman cursor-pointer  py-2 rounded-none hover:bg-black hover:text-white" type="submit">Search</button>
            </div>
            </div>
            : ""}
      </form>
      {car ?
      
    <div className="text-center ">
      <span className="material-symbols-outlined text-2xl cursor-pointer border-2 border-black hover:bg-green-800 hover:text-white" onClick={()=>setCar('')}>
                arrow_back
            </span>
        <form>
          <h1 className="pb-3 underline text-xl">
        Input Miantence data!
          </h1>
          <div class='grid' >
            <div>
          <label className="text-black" htmlFor="yearSelect">Last Oil service:</label>
      <DatePicker
        id="yearSelect"
        selected={oilDate}
        onChange={(date) => setOilDate(date)}
        showYearDropdown
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        className="rounded-none"
      />
      </div>
      <div>
      <label className="text-black" htmlFor="mileageInput">Mileage for oil service:</label>
      <input
        id="mileageInput"
        placeholder="Input Mileage"
        style={{ width: '260px' }}
        type="number"
        value={oilChangeMileage}
        onChange={handleOilMileageChange}
        className="rounded-none"
      />
      </div>
      </div>
      <div className="grid">
        <div>
      <label className="text-black"  htmlFor="tireRotationDatePicker">Last Tire rotation:</label>
      <DatePicker
        id="tireRotationDatePicker"
        selected={tireRotationDate}
        onChange={(date) => setTireRotationDate(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        className="rounded-none"
      />
      </div>
      <div>
        <label className="text-black" htmlFor="brakeFluidChangeDatePicker">Last Brake fluid:</label>
      <DatePicker
        id="brakeFluidChangeDatePicker"
        selected={brakeFluidChangeDate}
        onChange={(date) => setBrakeFluidChangeDate(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        className="rounded-none"
      />
      </div>
      </div>
        </form>
        
    </div>
    : ""}
    
    
    
    {car ?
      <div className="text-center  ">
        
        <article>
        <h1 className="font-sixty4">Searched Car!</h1>
        <h2 className="pb-2 pt-2 font-newroman text-2xl underline underline-offset-2 ">{car[0]?.year} {car[0]?.make} {car[0]?.model}</h2>
        <label className="" htmlFor="carName">Give your car a name:</label>
        <input className="rounded-none" type="text" id="carName" value={savedCarName} onChange={handleNameChange} />
        <label className="" htmlFor="carMileage">Enter Cars Mileage:</label>
        <input className="rounded-none" type="text" id="carMileage" value={savedCarMileage} onChange={handleCarMileage} />
        <button  className="border-2 border-black font-newroman cursor-pointer  py-2 rounded-none  hover:bg-black hover:text-white" onClick={handleSavingCar}>Save Car to Garage!</button>
        </article>
        
        
      </div>
      
      : ''
      }
      
      </details>
      <div className="text-center">
      {isLoading ? 
    <p>Loading...</p>
    : ""}
      </div>
      </div>
     
    </div>
    
    </div> 

    
  </>
     );
    }    


export default Garage


