import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';

function CarouselLayout({ mainSlide }) {
    const [slide, setSlide] = useState(mainSlide);
    const [isEditing, setIsEditing] = useState({});
    const [measurements, setMeasurements] = useState(null)

    console.log(measurements)
    console.log(mainSlide)

    if (!slide) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[url('/water-bg.png')] bg-center bg-cover bg-no-repeat w-full h-[35vh] text-white">
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
        
        <div><Image alt='logo' src={slide.title_logo} width={537} height={324} onLoadingComplete={e => setMeasurements(e)}  className="w-full h-auto object-contain"/></div>

        <div>{slide.line_1}</div>
        </div>
    );
}

export default CarouselLayout;   