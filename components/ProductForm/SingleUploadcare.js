import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import { Widget, uploadcare} from '@uploadcare/react-widget';


const SingleUploadCare = ({ defaultValues, setValue, value }) => {
    const [existingImages, setExistingImages] = useState(null);

    // Simulated retrieval of existing image URLs for the product from your CMS or database
    useEffect(() => {
      if (defaultValues) {
        setExistingImages(defaultValues);
      }
    }, [defaultValues]);
  
  console.log(defaultValues)
  return (
    <Widget
      publicKey="d1bca3d0aa1a701e05e2"
      value={existingImages}
      onFileSelect={(e) => {
        e.done((file) => setValue(value, file.cdnUrl));
      }}
      // Additional widget configuration options can be specified here
    />
  );
};

export default SingleUploadCare;