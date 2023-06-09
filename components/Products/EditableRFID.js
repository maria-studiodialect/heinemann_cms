import { useState } from 'react';

function EditableRFID({ productId, initialRFID = '0', location, onRFIDChange }) {
  const [rfid, setRFID] = useState(initialRFID);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldClick = () => {
    setIsEditing(true);
  };
  

  const handleFieldBlur = async () => {
    // Save changes to Xata
    // Replace this URL with the API endpoint to update your product data
    const fieldName = 'rfid_' + location;
    const requestBody = {
      id: productId,
      [fieldName]: rfid,
    };

    console.log(fieldName)
  
    await fetch(`/api/products/updateProduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });


    setIsEditing(false);
  };

  return (
    <div className="editable-rfid">
      {isEditing ? (
        <input
          autoFocus
          type='number'
          defaultValue={rfid}
          onBlur={handleFieldBlur}
          onChange={(e) => setRFID(parseInt(e.target.value))}
          className="editable-rfid__input w-12 text-center"
        />
      ) : (
        <span onClick={handleFieldClick} className="editable-rfid__value mx-3">
          {rfid}
        </span>
      )}
    </div>
  );
}

export default EditableRFID;
