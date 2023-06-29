import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UpdateProduct from '../Product/UpdateProduct';
import DeleteProduct from '../Product/DeleteProduct';

function FloorLayout({ mainSlide }) {
    const [slide, setSlide] = useState(mainSlide);
    const [isEditing, setIsEditing] = useState({});

    const handleFieldClick = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };
    
    const handleFieldBlur = async (field, value) => {
        setSlide({ ...slide, [field]: value });
    
        // Save changes to Xata
        // Replace this URL with the API endpoint to update your slide data
        await fetch(`/api/carousels/updateSlide`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: mainSlide.id, [field]: value }),
        });
    
        setIsEditing({ ...isEditing, [field]: false });
    };
    if (!slide) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[url('/water-bg.png')] bg-center bg-cover bg-no-repeat w-full aspect-[16/4] text-white flex flex-col items-center relative">
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
            <div className='mt-6 mb-3'>
                {slide.slide_type === 'floor_hero' && <div className='text-4xl font-light mt-3 mr-28'>Fluid Perspectives</div>}
            </div>
            <div className='px-3 w-full'>
                {slide.slide_type === 'floor_hero' &&
                <div className='flex justify-end mr-14'>
                    {isEditing.line_1 ? (
                    <input
                        autoFocus
                        defaultValue={slide.line_1}
                        onBlur={(e) => handleFieldBlur('line_1', e.target.value)}
                        className='bg-transparent text-white text-sm font-light min-w-[9vw]'
                        />
                    ) : (
                        <span onClick={() => handleFieldClick('line_1')} className='text-sm font-light min-w-[9vw]'>
                        {slide.line_1}
                        </span>
                    )}
                    {isEditing.line_2 ? (
                    <input
                        autoFocus
                        defaultValue={slide.line_2}
                        onBlur={(e) => handleFieldBlur('line_2', e.target.value)}
                        className='bg-transparent text-white text-sm font-light min-w-[9vw]'
                        />
                    ) : (
                        <span onClick={() => handleFieldClick('line_2')} className='text-sm font-light min-w-[9vw]'>
                        {slide.line_2}
                        </span>
                    )}
                    <div className='text-sm font-light'>
                        {isEditing.line_3 ? (
                            <input
                            autoFocus
                            defaultValue={slide.line_3}
                            onBlur={(e) => handleFieldBlur('line_3', e.target.value)}
                            className='bg-transparent text-white text-sm font-light max-w-[5vw]'
                            />
                        ) : (
                            <span onClick={() => handleFieldClick('line_3')}>
                            {slide.line_3}
                            </span>
                        )}
                    </div>
                </div>
                }
                {slide.slide_type === 'floor_intro' && (
                    <div className='flex items-center justify-between'>
                        <div className='relative w-28 h-full mx-4'>
                        <Image alt='logo' src='/tax_free_heinemann.png' width={1357} height={368} className='object-contain' />
                        </div>
                        <div className='mr-4'>
                        <div>
                            {isEditing.line_1 ? (
                            <input
                                autoFocus
                                defaultValue={slide.line_1}
                                onBlur={(e) => handleFieldBlur('line_1', e.target.value)}
                                className='bg-transparent text-white text-sm font-light w-full'
                            />
                            ) : (
                            <span onClick={() => handleFieldClick('line_1')} className='text-sm font-light ml-12 mr-5'>
                                {slide.line_1}
                            </span>
                            )}
                        </div>
                        <div className='text-sm font-light'>
                            {isEditing.line_2 ? (
                            <input
                                autoFocus
                                defaultValue={slide.line_2}
                                onBlur={(e) => handleFieldBlur('line_2', e.target.value)}
                                className='bg-transparent text-white text-sm font-light w-full'
                            />
                            ) : (
                            <span onClick={() => handleFieldClick('line_2')}>
                                {slide.line_2}
                            </span>
                            )}
                        </div>
                        <div className='text-sm font-light text-right'>
                            {isEditing.line_3 ? (
                            <input
                                autoFocus
                                defaultValue={slide.line_3}
                                onBlur={(e) => handleFieldBlur('line_3', e.target.value)}
                                className='bg-transparent text-white text-sm font-light text-right w-full'
                            />
                            ) : (
                            <span onClick={() => handleFieldClick('line_3')}>
                                {slide.line_3}
                            </span>
                            )}
                        </div>
                        <div className='text-sm font-light text-center'>
                            {isEditing.line_4 ? (
                            <input
                                autoFocus
                                defaultValue={slide.line_4}
                                onBlur={(e) => handleFieldBlur('line_4', e.target.value)}
                                className='bg-transparent text-white text-sm font-light text-center w-full'
                            />
                            ) : (
                            <span onClick={() => handleFieldClick('line_4')}>
                                {slide.line_4}
                            </span>
                            )}
                        </div>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    );
}

export default FloorLayout;   