import React, { useState } from 'react';
import Button from '../common/Button';

const MediaUpload = ({ defaultValues = [], setValue }) => {
  const [mediaSrc, setMediaSrc] = useState([...defaultValues]);
  const [loading, setLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState(false);

  const handleOnChange = (changeEvent) => {
    const selectedFiles = [];
    const targetFiles = changeEvent.target.files;
    const targetFilesObject = [...targetFiles];

    targetFilesObject.map((file) => {
      if (file.type.startsWith('image/')) {
        selectedFiles.push({
          type: 'image',
          src: URL.createObjectURL(file),
        });
      } else if (file.type.startsWith('video/')) {
        selectedFiles.push({
          type: 'video',
          src: URL.createObjectURL(file),
        });
      }
    });

    setMediaSrc(selectedFiles);
  };

  const handleUpload = async (uploadEvent) => {
  uploadEvent.preventDefault();
  setLoading(true);

  const form = uploadEvent.currentTarget;
  const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

  try {
    const files = Array.from(fileInput.files);
    const mediaData = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();

        formData.append('upload_preset', 'xymxxbez');
        formData.append('file', file);

        let uploadUrl;
        if (file.type.startsWith('image/')) {
          uploadUrl = 'https://api.cloudinary.com/v1_1/df6qxacko/image/upload';
        } else if (file.type.startsWith('video/')) {
          uploadUrl = 'https://api.cloudinary.com/v1_1/df6qxacko/video/upload';
        } else {
          throw new Error('Invalid file type');
        }

        const res = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        return data.secure_url
      })
    );

    setMediaSrc(mediaData);
    setValue('media', mediaData);
    setUploadedData(true);
  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};


  return (
    <form onSubmit={handleUpload}>
      <label htmlFor="file" className="mb-1 block text-sm text-gray-600">
        Upload multiple files
      </label>
      <input
        name="file"
        type="file"
        multiple
        onChange={handleOnChange}
        className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
      />
      <div>
        <div className="mb-2 grid max-w-full grid-cols-3 gap-2 overflow-hidden">
          {mediaSrc.map((media, idx) => (
            <div key={idx}>
              {media.type === 'image' && (
                <img
                  className="aspect-video max-h-40 flex-1 overflow-hidden rounded object-cover"
                  src={media.src}
                  alt=""
                />
              )}
              {media.type === 'video' && (
                <video
                  className="aspect-video max-h-40 flex-1 overflow-hidden rounded object-cover"
                  src={media.src}
                  controls
                />
              )}
            </div>
          ))}
        </div>
        {mediaSrc.length > 0 && !uploadedData && (
          <Button
            type="submit"
            variant="text"
            className="w-full"
            loading={loading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        )}
      </div>
    </form>
  );
};

export default MediaUpload;