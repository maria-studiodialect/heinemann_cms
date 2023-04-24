import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from '../ProductForm/Section'
import ThumbnailUpload from '../ProductForm/ThumbnailUpload'

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
      setValue('description', defaultValues.description)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormSection defaultOpen={true} title={'Brand Information'}>
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
          
          <Input
            name="description"
            label="Description"
            type="textarea"
            textarea={true}
            error={errors.description ? errors.description.message : false}
            register={register('description')}
          />
        </FormSection>
      </form>
      <FormSection title={'Brand Logo'}>
        <ThumbnailUpload defaultValue={defaultValues?.logo} setValue={setValue} info='Please upload a white version of the logo in PNG format.' />
      </FormSection>


      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Brand` : 'Submit'}
      </Button>
    </div>
  )
}

export default BrandForm