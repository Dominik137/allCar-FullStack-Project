
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
      <div className="relative" key={rerenderKey}>
          {isEditing ? (
              <div>
                  <input
                      type="text"
                      value={newTitle}
                      onChange={handleInputChange}
                      className="font-sixty4 text-2xl border border-black px-2"
                  />
                  <button onClick={handleSaveClick} className="mx-2">
                      Save
                  </button>
              </div>
          ) : (
              <h2
                  onClick={handleEditClick}
                  className="font-sixty4 text-2xl pencil hover:border border-transparent hover:border-black hover:cursor-pointer relative"
              >
                  {newTitle}
                  <span className="font-sixty4 text-2xl hover:border-black ">
                      <RiPencilLine />
                  </span>
              </h2>
          )}
      </div>
  );
};

export default EditableTitle;
