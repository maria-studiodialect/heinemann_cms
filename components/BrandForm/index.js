import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from '../ProductForm/Section'
import ThumbnailUpload from '../ProductForm/ThumbnailUpload'
import SingleUploadCare from '../ProductForm/SingleUploadcare';

const BrandForm = ({ type, defaultValues = {}, onFormSubmit, ...props }) => {
  const [brands, setBrands] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    if (defaultValues) {
      setValue('title', defaultValues.title)
      setValue('logo', defaultValues.logo)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
  })
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <Input
            name="title"
            label="Brand Name"
            type="text"
            error={errors.title ? errors.title.message : false}
            register={register('title', {
              required: {
                value: true,
                message: "Add the brand's name",
              },
            })}
          />
          <div>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">
            Brand Logo
          </label>
          <div className='border border-gray-300 rounded-md px-4 py-2'>
          <SingleUploadCare defaultValue={defaultValues?.logo} setValue={setValue} value='logo' />
          
        </div>
        <p className="mt-2 text-xs text-gray-500">Please upload a white version of the logo in PNG format.</p>
        {/* <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} /> */}
        </div>
        

      </form>


      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Brand` : 'Submit'}
      </Button>
    </div>
  )
}

export default BrandForm