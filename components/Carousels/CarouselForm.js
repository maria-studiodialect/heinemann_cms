import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from '../ProductForm/Section';
import MediaUpload from '../ProductForm/MediaUpload';
import MediaUploadCare from '../ProductForm/MediaUploadcare';

const CarouselForm = ({ type, defaultValues = {}, onFormSubmit, ...props }) => {
  const [brands, setBrands] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [slideType, setSlideType] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    if (defaultValues) {
      setValue('type', defaultValues.t)
      setValue('title_logo', defaultValues.title_logo)
      setValue('media', defaultValues.media)
      setValue('product_type', defaultValues.product_type)
      setValue('attributes', defaultValues.attributes)
      setValue('brand', defaultValues.brand?.title)
      setValue('video', defaultValues.video?.title)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    // Replace this URL with the API endpoint to fetch your brands data
    const response = await fetch('/api/brands/getBrands');
    const result = await response.json();
    setBrands(result.data);
  };

  function handleCheck() {
    setIsChecked(!isChecked)
  }

  console.log(slideType)

  
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <div className='mb-2'>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Slide Type</label>
          <select
            {...register('type')}
            name='type'
            className='border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2'
            onChange={(e) => {
              setSlideType(e.target.value);
            }}
          >
            <option disabled value="">Select</option>
            <option value='hero'>Hero Screen</option>
            <option value='intro'>Intro Screen</option>
            <option value='city'>City Partnership Screen</option>
            <option value='brand'>Brand Screen</option>
          </select>
        </div>
        <div className='mb-4'>
        <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Main Logo</label>
        <MediaUploadCare defaultValues={defaultValues?.media} setValue={setValue} />
        </div>
        <Input
            name="title"
            label="Product Title"
            type="text"
            error={errors.title ? errors.title.message : false}
            register={register('title', {
              required: {
                value: true,
                message: 'Add a product title',
              },
            })}
          />
          <div className='grid grid-cols-2 gap-5'>
          <Input
            name="product_type"
            label="Product Type"
            type="textarea"
            error={errors.product_type ? errors.product_type.message : false}
            register={register('product_type', {
              required: {
                value: true,
                message: 'Add at least one product type',
              },
              validate: (value) => value.length > 0 || 'Add at least one product type',
            })}
            attributes={{
              ...register('product_type', {
                required: {
                  value: true,
                  message: 'Add at least one product type',
                },
                validate: (value) => value.length > 0 || 'Add at least one product type',
                setValueAs: (value) => {
                  if (typeof value === 'string') {
                    return value.split(',').map((type) => type.trim())
                  }
                  return []
                },
              }),
              type: 'text',
              placeholder: 'Type 1, Type 2, Type 3',
            }}
          />
          
          </div>
          {!isChecked &&
            <>
            <Input
              name="description"
              label="Description"
              type="textarea"
              textarea={true}
              error={errors.description ? errors.description.message : false}
              register={register('description')}
            />
            <Input
              name="attributes"
              label="Attributes"
              type="text"
              error={errors.attributes ? errors.attributes.message : false}
              info="Separate values with a comma. Ex: 'Sweet & Round, Delicate & Floral'"
              register={register('attributes')}
              attributes={{
                ...register('attributes', {
                  setValueAs: (value) => {
                    if (typeof value === 'string') {
                      return value.split(',').map((type) => type.trim())
                    }
                    return []
                  },
                }),
                type: 'text',
                placeholder: 'Type 1, Type 2, Type 3',
              }}
            />
            </>
          }
      </form>
      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>

  )
}

export default CarouselForm