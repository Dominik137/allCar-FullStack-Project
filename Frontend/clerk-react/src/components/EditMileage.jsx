import React, { useState, useEffect } from 'react';
import { RiPencilLine } from 'react-icons/ri';

const EditMileage = ({ initialMileage, onSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [newMileage, setNewMileage] = useState(initialMileage);
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    setNewMileage(initialMileage);
  }, [initialMileage]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(newMileage);
    setEditing(false);
    setRerenderKey((prevKey) => prevKey + 1); // Increment the rerenderKey
  };

  const handleInputChange = (e) => {
    setNewMileage(e.target.value);
  };

  return (
    <div className="relative" key={rerenderKey}>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={newMileage}
            onChange={handleInputChange}
            className=" text-xl rounded-none border border-black px-2"
          />
          <span className='border-2 border-black cursor-pointer font-sixty4 underline-offset-0 text-2xl pt-1' onClick={handleSaveClick} >
            Save
          </span>
        </div>
      ) : (
        <p
          onClick={handleEditClick}
          className=" pencil hover:border border-transparent hover:border-black hover:cursor-pointer relative text-xl"
        >
          <RiPencilLine style={{ marginRight: '5px' }} />
          Mileage: {newMileage}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              border: '1px solid transparent',
              pointerEvents: 'none',
              transition: 'border 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.border = '1px solid #000')}
            onMouseOut={(e) => (e.target.style.border = '1px solid transparent')}
          ></div>
        </p>
      )}
    </div>
  );
};

export default EditMileage;
