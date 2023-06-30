import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from '../ProductForm/Section';
import MediaUpload from '../ProductForm/MediaUpload';
import SingleUploadcare from '../ProductForm/SingleUploadcare';

const CarouselForm = ({ type, location, defaultValues = {}, onFormSubmit, ...props }) => {
  const [brands, setBrands] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [slideType, setSlideType] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm()

  useEffect(() => {
    if (defaultValues) {
      setValue('slide_type', defaultValues.slide_type)
      setValue('title_logo', defaultValues.title_logo)
      setValue('title_text', defaultValues.title_text)
      setValue('partner_logos', defaultValues.partner_logos)
      setValue('line_1', defaultValues.line_1)
      setValue('line_2', defaultValues.line_2)
      setValue('line_3', defaultValues.line_3)
      setValue('line_4', defaultValues.line_4)
      setValue('line_5', defaultValues.line_5)
      setValue('line_6', defaultValues.line_6)
      setValue('brand', defaultValues.brand)
    }
  }, [])  

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })


  let slide_type = watch('slide_type'); 

  
  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <div className='mb-2'>
          <label htmlFor="slide_type" className="mb-1 block text-sm font-medium text-gray-600">Slide Type</label>
          <select
            {...register('slide_type')}
            name='slide_type'
            defaultValue={defaultValues?.slide_type}
            className='border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2'
          >  
            <option disabled value="">Select</option>
            <option value='hero'>Hero Screen</option>
            <option value='intro'>Intro Screen</option>
            <option value='city'>City Partnership Screen</option>
            <option value='brand'>Brand Screen</option>
          </select>
        </div>
        <div>
        {slide_type === 'brand' &&
        <Input
            name="brand"
            label='Brand Name'
            type="text"
            error={errors.brand ? errors.brand.message : false}
            register={register('brand')}
          />
        }
        {slide_type === 'intro' ?
        <Input
          name="title_text"
          label='Title'
          type="text"
          error={errors.title_text ? errors.title_text.message : false}
          register={register('title_text')}
        />   
        :
        <div className='mb-4'>
        <label htmlFor="logo" className="mb-1 block text-sm font-medium text-gray-600">Title Logo</label>
        <SingleUploadcare defaultValues={defaultValues?.title_logo} setValue={setValue} value='title_logo' />
        </div>
        }
        </div>
      

        <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Text</label>
        {slide_type === 'intro' ? 
          <textarea {...register('line_1')} name='line_1' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1 min-h-[15vh]'/>
        :
        <>
          <input {...register('line_1')} name='line_1' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          <input {...register('line_2')} name='line_2' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          <input {...register('line_3')} name='line_3' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          <input {...register('line_4')} name='line_4' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          <input {...register('line_5')} name='line_5' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          <input {...register('line_6')} name='line_6' className='border border-gray-300 rounded-md mb-1 w-full px-2 text-sm py-1'/>
          </>
        }
        <input type='hidden' name='location' {...register('location')} value={location}/>
      </form>
      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Carousel` : 'Submit'}
      </Button>
    </div>

  )
}

export default CarouselForm