import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import FormSection from './Section';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import MediaUpload from './MediaUpload';
import MediaUploadCare from './MediaUploadcare';

const ProductForm = ({ type, defaultValues = {}, onFormSubmit, ...props }) => {
  const [brands, setBrands] = useState([]);
  const [isChecked, setIsChecked] = useState(defaultValues?.video);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    // Replace this URL with the API endpoint to fetch your brands data
    const response = await fetch('/api/brands/getBrands');
    const result = await response.json();
    setBrands(result.data);
  };
  useEffect(() => {
    if (defaultValues) {
      setValue('title', defaultValues.title);
      setValue('description', defaultValues.description);
      setValue('media', defaultValues.media);
      setValue('product_type', defaultValues.product_type);
      if (defaultValues.attributes) {
        const attributesString = defaultValues.attributes.join(', ');
        setValue('attributes', attributesString);
      }
      setValue('brand', defaultValues.brand?.id);
      setValue('video', defaultValues.video);
    }
  }, [defaultValues, setValue, setIsChecked]);



  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  }

  const onSubmit = handleSubmit(async (data) => {
    const attributesArray = data.attributes?.split(',').map((value) => value.trim());

    // Update the data object with the converted attributes array
    const updatedData = { ...data, attributes: attributesArray };

    // Call the onFormSubmit function with the updated data
    await onFormSubmit(updatedData);
  });
  

  return (
    <div {...props} className="flex flex-col space-y-4">
      <div>
        <div className="flex items-center justify-center w-full space-x-4">
          <div>Images</div>
          <label htmlFor="video" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="video"
                checked={isChecked}
                className="sr-only"
                {...register('video')}
                onChange={handleCheck}
              />
              <div className="bg block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
          </label>
          <div>Video</div>
        </div>
        <p className="my-2 text-xs text-gray-500 text-center">Is it a normal product or video-only?</p>
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
        <div className="grid grid-cols-2 gap-5">
        <Input
          name="product_type"
          label="Product Range"
          type="text"
          error={errors.product_type ? errors.product_type.message : false}
          register={register('product_type', {
            required: {
              value: true,
              message: 'Add a product range',
            },
          })}
        />
        {(brands && defaultValues) && 
          <div className="mb-2">
            <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">
              Brand
            </label>
            <select
              {...register('brand')}
              name="brand"
              defaultValue={defaultValues?.brand?.id}
              className="border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2"
            >
              <option disabled value="">
                Select brand
              </option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
          </div>
          }
        </div>
        {!isChecked && (
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
          />

          


          </>
        )}
      <div>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">
              Product Media
          </label>
          <div className='border border-gray-200 rounded-md px-4 py-2'>
        <MediaUploadCare defaultValues={defaultValues?.media} setValue={setValue} value='media' />
        </div>
        {/* <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} /> */}
        </div>
      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>
  );
};

export default ProductForm;
