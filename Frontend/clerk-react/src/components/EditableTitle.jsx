
import React, { useState, useEffect } from "react";
import { RiPencilLine } from 'react-icons/ri';

const EditableTitle = ({ saved_car, onSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(saved_car.name);
  const [rerenderKey, setRerenderKey] = useState(0);
  
  useEffect(() => {
    setNewTitle(saved_car.name);
 }, [saved_car]);

  const handleEditClick = () => {
      setEditing(true);
  };

  const handleSaveClick = () => {
      onSave(newTitle);
      setEditing(false);
      setRerenderKey((prevKey) => prevKey + 1); // Increment the rerenderKey
  };

  const handleInputChange = (e) => {
      setNewTitle(e.target.value);
  };
  return (
      <div className="" key={rerenderKey}>
          {isEditing ? (
              <div>
                  <input
                      type="text"
                      value={newTitle}
                      onChange={handleInputChange}
                      className="font-sixty4 text-2xl border border-black px-2"
                  />
                  <span className='border-2 border-black cursor-pointer font-sixty4 underline-offset-0 text-2xl' onClick={handleSaveClick} >
            Save
          </span>
              </div>
          ) : (
              <h2
                  onClick={handleEditClick}
                  className="font-sixty4 text-4xl pencil hover:border border-transparent hover:border-black hover:cursor-pointer relative"
              ><div className="text-sm ">
                   <RiPencilLine style={{  }} /></div>
          {newTitle}
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
              </h2>
          )}
      </div>
  );
};

export default EditableTitle;
