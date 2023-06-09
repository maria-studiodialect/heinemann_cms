import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';
import { AuthContext } from '../../stores/authContext';

function EditableProduct({ mainProduct }) {
  const [product, setProduct] = useState(mainProduct);
  const [isEditing, setIsEditing] = useState({});
  const [measurements, setMeasurements] = useState(null)
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

  console.log(measurements)

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
    <div>
      <div className='flex justify-end mx-40 mb-2'>
      {role === 'admin' &&
      <div className='space-x-2'>
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
      <div className={`mx-40 flex ${product.video ? 'justify-center' : 'justify-between'} items-center bg-black text-white py-10 rounded-xl mb-5`}>
        {product.video === false &&
        <div>
                {product.media?.map((item, i) => (
                    <div key={i} className="relative w-52 h-32">
                        <Image src={item} fill className="object-cover" alt='product image'/>
                    </div>
                ))}
        </div>
        }
        <div className="max-w-lg text-center"> 
            <div className="relative mb-8 w-[20vw] mx-auto">
                  <Image src={product.brand.logo} width={537} height={324} onLoadingComplete={e => setMeasurements(e)} className="w-full h-auto object-contain max-h-[20vh]"/>
            </div>
            {product.video &&
              <video autoPlay muted loop className='mb-5'>
                <source src={product.media[0]} />
              </video>
            }
            <div className="uppercase text-xxs tracking-wide mb-2">{product.product_type}</div>
            <div>
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
            <div className="my-10 mx-10">{product.description}</div>
            {product.attributes && <div className="uppercase text-xxs tracking-wide mb-2">Attributes</div>}
            <div className="mb-10 flex justify-center">
              
                {product.attributes?.map((item, i) => (
                    <div key={i}>
                        {item}
                        <span className="mx-2">{i !== product.attributes.length - 1 && "◦"}</span>
                    </div>
                ))}
            </div>
        </div>
        {!product.video && <div className="w-48"></div>}
      </div>
    </div>
  );
}

export default EditableProduct;
