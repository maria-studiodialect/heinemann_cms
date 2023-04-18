import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from './Section'
import MediaUpload from './MediaUpload'
import ThumbnailUpload from './ThumbnailUpload'
import {IoIosAddCircle} from 'react-icons/io'
import {AiFillDelete} from 'react-icons/ai'

const ProductForm = ({ type, defaultValues = {}, onFormSubmit, ...props }) => {

  const [attributes, setAttributes] = useState(defaultValues.attributes || []);
  const [brands, setBrands] = useState([]);


  useEffect(() => {
    setAttributes(defaultValues.attributes || []);
  }, [defaultValues.attributes]);

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
      setValue('RFID', defaultValues.RFID)
      setValue('images', defaultValues.images)
      setValue('product_type', defaultValues.product_type)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })

  const addAttribute = () => {
    setAttributes([...attributes, '']);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    // Replace this URL with the API endpoint to fetch your brands data
    const response = await fetch('/api/brands/getBrands');
    const result = await response.json();
    setBrands(result.data);
  };

  console.log(brands)
  
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormSection defaultOpen={true} title={'Product Information'}>
          
          <div className='grid grid-cols-2 gap-5'>
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
          <div className='mb-2'>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Brand</label>
          <select {...register('brand')} className='border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2'>
            {brands.map((brand, index) => (
              <option key={index} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
          </div>
          </div>
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
          <Input
            name="description"
            label="Description"
            type="textarea"
            error={errors.description ? errors.description.message : false}
            register={register('description')}
          />
          
          <div>  
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

          <div className="flex flex-col items-center md:flex-row md:space-x-2">
            <Input
              className=""
              name="RFID"
              label="RFID "
              type="number"
              multiline
              error={errors.RFID ? errors.RFID.message : false}
              register={register('RFID', {
                required: {
                  value: true,
                  message: 'You must add the RFID of your product.',
                },
                setValueAs: (v) => parseFloat(v),
              })}
            />
            {/* 
            <Input
              className=""
              name="stock"
              label="Stock"
              placeholder="1000"
              type="number"
              multiline
              error={errors.stock ? errors.stock.message : false}
              register={register('stock', {
                required: {
                  value: true,
                  message: 'You must add the price of your product.',
                },
                setValueAs: (v) => parseInt(v),
              })}
              
            />
            */}
          </div>
        </FormSection>
      </form>
      <FormSection title={'Product Images'}>
        <MediaUpload defaultValues={defaultValues?.images} setValue={setValue} />
      </FormSection>

      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>
  )
}

export default ProductForm
