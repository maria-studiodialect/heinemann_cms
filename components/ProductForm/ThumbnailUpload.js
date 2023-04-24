import React, { useState } from 'react'
import Button from '../common/Button'

const ThumbnailUpload = ({ defaultValue, setValue, info }) => {
  const [imageSrc, setImageSrc] = useState(defaultValue)
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState()
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }

  const handleUpload = async (uploadEvent) => {
    uploadEvent.preventDefault()
    setLoading(true)
    const form = uploadEvent.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    )
    try {
      const formData = new FormData()
      // adding upload preset
      formData.append('upload_preset', 'xymxxbez')

      for (const file of fileInput.files) {
        formData.append('file', file)
      }
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/df6qxacko/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      setImageSrc(data.secure_url)
      setValue('logo', data.secure_url)
      setUploadData(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleUpload}>
      <input
        name="file"
        type="file"
        onChange={handleOnChange}
        className="mb-1 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
      />
      <div>
        <img className="aspect-video rounded bg-gray-100 object-contain" src={imageSrc} alt="" />
        {imageSrc && !uploadData && (
          <Button
            type="submit"
            variant="text"
            className="w-full my-2"
            loading={loading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        )}
      </div>
      {info ? <p className="ml-1 text-xs text-gray-500">Please upload a white version of the logo in PNG format.</p> : null}
    </form>
  )
}

export default ThumbnailUpload
