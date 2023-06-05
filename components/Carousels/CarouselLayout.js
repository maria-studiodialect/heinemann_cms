import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';

function CarouselLayout({ mainSlide }) {
    const [slide, setSlide] = useState(mainSlide);
    const [isEditing, setIsEditing] = useState({});
    const [measurements, setMeasurements] = useState(null)


    console.log('slide:' + mainSlide)

    console.log('hi')
    if (!slide) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[url('/water-bg.png')] bg-center bg-cover bg-no-repeat w-full h-[35vh]">
        {/* 
        <div className='flex justify-end mx-40 mb-2'>
        
        <div className='space-x-2'>
            <UpdateProduct  product={mainProduct} />
                <DeleteProduct
                productId={mainProduct.id}
                />
        </div>
        
        </div>
        */}
        <div></div>
        </div>
    );
}

export default CarouselLayout;