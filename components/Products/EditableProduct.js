import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';
import { AuthContext } from '../../stores/authContext';
import EditableRFID from './EditableRFID';

function EditableProduct({ mainProduct }) {
  const [product, setProduct] = useState(mainProduct);
  const [isEditing, setIsEditing] = useState({});
  const [measurements, setMeasurements] = useState(null)
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)
  const [selection, setSelection] = useState('copenhagen')
  const [RFID, setRFID] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

  useEffect(() => {
    // Update RFID value and location when selection changes
    const updatedRFID = mainProduct[`rfid_${selection}`];
    setRFID(updatedRFID);
  }, [selection]);


  const handleFieldClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleFieldBlur = async (field, value) => {
    // Update the product data locally
    const fieldValue = field === 'rfid_copenhagen' ? parseInt(value, 10) : value;

    setProduct({ ...product, [field]: value });

    // Save changes to Xata
    // Replace this URL with the API endpoint to update your product data
    await fetch(`/api/products/updateProduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: mainProduct.id, [field]: fieldValue }),
    });

    setIsEditing({ ...isEditing, [field]: false });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex justify-center'>
      <div className='mx-2'>
      {role === 'admin' &&
      <div className='mt-2'>
      <div>
      <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Select location</label>
        <select className='px-2 py-2 rounded-xl' value={selection} onChange={(e) => setSelection(e.target.value)}>
          <option value='' disabled>Select</option>
          <option value='copenhagen'>Copenhagen</option>
          <option value='infrastor'>Infrastor</option>
          <option value='istanbul'>Istanbul</option>
          <option value='frankfurt'>Frankfurt</option>
        </select>
      </div>
      {selection !== '' &&
      <div className='bg-gray-100 rounded-lg pt-1 pb-2 my-2 text-center'>
        <div className='text-sm'>RFID</div>
        <EditableRFID key={RFID} productId={mainProduct.id} initialRFID={RFID} location={selection} />
      </div>
      }
      {/* 
      <div className='bg-gray-100 rounded-t-xl py-1'>
        <div className='text-sm text-center'>IST</div>
        <EditableRFID productId={mainProduct.id} initialRFID={mainProduct.rfid_istanbul} location='istanbul' />
      </div>
      <div className='bg-gray-100 rounded-t-xl py-1'>
        <div className='text-sm text-center'>SYD</div>
        <EditableRFID productId={mainProduct.id} initialRFID={mainProduct.rfid_sydney} location='sydney' />
      </div>
      */}
    </div>
      }
      </div>
      <div className={`flex ${product.video ? 'justify-center' : 'justify-between'} items-start bg-[url('/${selection}.webp')] bg-center bg-cover bg-no-repeat text-white pb-10 pt-14 rounded-xl mb-5 aspect-[9/16] max-h-[90vh]`}>
        {product.video === false &&
        <div className='mt-[7vh]'>
                {product.media?.map((item, i) => (
                    <div key={i} className="relative w-[7vw] h-[8vh]">
                        <Image src={item} fill className="object-cover" alt='product image'/>
                    </div>
                ))}
        </div>
        }
        <div className="max-w-lg text-center"> 
            <div className="relative mb-8 w-[10vw] mx-auto">
                  <Image src={product.brand.logo} width={537} height={324} onLoadingComplete={e => setMeasurements(e)} className="w-full h-auto object-contain max-h-[20vh]"/>
            </div>
            {product.video && product.media &&
              <video autoPlay muted loop className='mb-5'>
                <source src={product.media[0]} />
              </video>
            }
            <div className="uppercase text-2xs tracking-wide mb-2">{product.product_type}</div>
            <div className='text-xxs'>
              {isEditing.title ? (
                  <input
                    autoFocus
                    defaultValue={product.title}
                    onBlur={(e) => handleFieldBlur('title', e.target.value)}
                    className='bg-transparent text-center'
                  />
                ) : (
                  <span onClick={() => handleFieldClick('title')}>{product.title}</span>
                )}
            </div>
            <div className="my-10 mx-5 text-xxs leading-tight">{product.description}</div>
            {!product.video && <div className="uppercase text-2xs tracking-wide mb-2">Attributes</div>}
            <div className="mb-10 flex justify-center">
              
                {product.attributes?.map((item, i) => (
                    <div key={i} className='text-xxs'>
                        {item}
                        <span className="mx-2">{i !== product.attributes.length - 1 && "◦"}</span>
                    </div>
                ))}
            </div>
        </div>
        {!product.video && <div className="w-48"></div>}
      </div>
      <div className='mb-0 mx-2'>
      {role === 'admin' &&
      <div className='flex flex-col space-y-2'>
        <UpdateProduct  product={mainProduct} />
            <DeleteProduct
              disabled={
                mainProduct?.id === 'rec_ce0bsgt8oiq6e92pa810' ||
                mainProduct?.id === 'rec_ce0btqp99gj1h1lgvno0'
              }
              productId={mainProduct.id}
            />
      </div>
      }
      </div>
    </div>
  );
}

export default EditableProduct;
