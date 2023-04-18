import React, { useState, useEffect } from 'react';

function EditableBrand({ brands, brand, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(brand);

  const handleFieldClick = () => {
    setIsEditing(true);
  };

  const handleSelectChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleFieldBlur = () => {
    onUpdate(selectedBrand);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <select value={selectedBrand.id} onChange={handleSelectChange} onBlur={handleFieldBlur}>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      ) : (
        <div onClick={handleFieldClick}>{selectedBrand.name}</div>
      )}
    </div>
  );
}

export default EditableBrand;
