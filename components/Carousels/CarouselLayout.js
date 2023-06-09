import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';

function CarouselLayout({ mainSlide, click }) {
    const [slide, setSlide] = useState(mainSlide);
    const [isEditing, setIsEditing] = useState({});
    const [measurements, setMeasurements] = useState(null)
    
    if (!slide) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[url('/water-bg.png')] bg-center bg-cover bg-no-repeat w-full h-[30vh] text-white flex flex-col items-center relative">
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
            <div className='mx-3 mt-3 pointer-events-none'><Image src='/banner.png' alt='banner' width={5552} height={231}/></div>
            <div className='mt-5 mb-2'>
                {(slide.type === 'brand' || slide.type === 'city') && <div className='relative h-8 w-20'><Image alt='logo' src={slide.title_logo} sizes="10vw" fill className='object-contain'/></div>}
                {slide.type === 'hero' && <div className='text-xl leading-6 font-light mx-3'>Fluid<br/><span className='ml-4'>Perspectives</span></div>}
                {slide.type === 'intro' && <div className='text-sm mt-3 font-light'>Fluid Perspectives</div>}
            </div>
            <div className='px-3 w-full'>
                <div className={`${slide.type === 'intro' ? 'text-center text-3xs mx-3' : 'text-2xs'} ${slide.type === 'hero' && 'text-center'} ${(slide.type === 'brand' || slide.type === 'city') && 'text-left ml-3'}`}>{slide.line_1}</div>
                <div className={`text-2xs ${slide.type === 'hero' ? 'text-left ml-5' : 'text-center mr-2'}`}>{slide.line_2}</div>
                <div className={`text-2xs ${slide.type === 'hero' ? 'text-right mr-6' : 'text-center ml-3'}`}>{slide.line_3}</div>
                <div className={`text-2xs ml-6`}>{slide.line_4}</div>
                <div className={`text-2xs text-center ml-2`}>{slide.line_5}</div>
                <div className={`text-2xs text-right mr-2`}>{slide.line_6}</div>
                    {slide.type === 'intro' && (
                        <>
                        <div className='flex justify-center space-x-2 mx-auto mt-3'>
                            {slide.partner_logos.slice(0,3).map((logo, i) => (
                                <div key={i} className='w-4 h-3 relative flex items-center justify-center'><Image src={logo} fill alt='logo' className='object-contain'/></div>
                            ))}
                        </div>
                        <div className='flex justify-center space-x-2 mx-auto'>
                            {slide.partner_logos.slice(3,5).map((logo, i) => (
                                <div key={i} className='w-4 h-3 relative flex items-center justify-center'><Image src={logo} fill alt='logo' className='object-contain'/></div>
                            ))}
                        </div>
                        </>
                    )}
            </div>
            <div className='absolute bottom-3 mx-auto w-8'><Image src='/tax_free_heinemann.png' alt='tax-free logo' width={1357} height={368} /></div>
        </div>
    );
}

export default CarouselLayout;   