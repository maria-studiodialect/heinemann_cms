import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import { Widget, uploadcare} from '@uploadcare/react-widget';


const MediaUploadCare = ({ defaultValues, setValue }) => {
    const [existingImages, setExistingImages] = useState(null);

    // Simulated retrieval of existing image URLs for the product from your CMS or database
    useEffect(() => {
      if (defaultValues) {
        setExistingImages(defaultValues);
      }
    }, [defaultValues]);
  

  return (
    <Widget
        publicKey="d1bca3d0aa1a701e05e2"
        value={existingImages}
        previewStep
        multiple
        onFileSelect={async (group) => {
          const files = await Promise.all(group.files());
          const urls = files.map((file) => file.cdnUrl);
          setValue('media', urls);
          console.log(urls)
        }}
        // Additional widget configuration options can be specified here
      />
  );
};

export default MediaUploadCare;