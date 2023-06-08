import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from '../ProductForm/Section';
import {IoIosAddCircle} from 'react-icons/io'
import {AiFillDelete} from 'react-icons/ai'
import MediaUpload from '../ProductForm/MediaUpload';

const CarouselForm = ({ type, defaultValues = {}, onFormSubmit, ...props }) => {
  const [brands, setBrands] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

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
  
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormSection defaultOpen={true} title={'Product Information'}>
        <div className="flex items-center justify-center w-full space-x-4">
          <div>Images</div>
            <label htmlFor="video" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="video" checked={isChecked} className="sr-only" {...register('video')} onClick={handleCheck}/>
                <div className="bg block bg-gray-600 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
              </div>
            </label>
            <div>Video</div>
          </div>
          <p className="my-2 text-xs text-gray-500 text-center">Is it a normal product or video-only?</p> 

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
          <div className='mb-2'>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Brand</label>
          <select {...register('brand')} name='brand' defaultValue={defaultValues?.brand?.title} className='border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2'>
            <option disabled value="">Select brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
          </div>
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
            {/*<div>  
          <div className='flex items-center justify-between mb-1'>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-600">Attributes</label>
            <button type="button" onClick={addAttribute} className='text-2xl'>
              <IoIosAddCircle/>
            </button>
          </div>
          {attributes.length > 0 ?
          attributes.map((attribute, index) => (
            <div key={index} className='flex'>
              <input
                {...register(`attributes.${index}`)}
                defaultValue={attribute}
                className='border px-4 py-2 rounded-md mr-2 flex-1 mb-2 border-gray-300'
              />
              <button type="button" onClick={() => removeAttribute(index)} className='mr-0.5 text-xl'>
                <AiFillDelete/>
              </button>
            </div>
          ))
          :
          <div className='bg-gray-100 text-center py-2 rounded-md mb-2'>There are no items.</div>
          }
          </div>
          */}
          
        </FormSection>
      </form>
      <FormSection title={'Product Media'}>
        <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} />
      </FormSection>

      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>

  )
}

export default CarouselForm