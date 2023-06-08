import { Dialog, Transition, FocusTrap } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'
import { Close } from '../common/icons/Close'
import CarouselLayout from '../Carousels/CarouselLayout'
import FloorLayout from './FloorLayout'

const FloorModal = ({ slides, activeId, activeMapId, isOpen, handleClose }) => {
    const [selectedSlideId, setSelectedSlideId] = useState(null);
    const [floorOne, setFloorOne] = useState(null);
    const [floorTwo, setFloorTwo] = useState(null);


    const onSelect = async () => {
        try {
            await fetch(`/api/screens/updateScreen`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: activeId, ...{slide_4: selectedSlideId} }),
            }).then(() => {
                handleClose()
                // window.location.reload()
            })
            } catch (error) {
            console.log(error)
            }
        }
        useEffect(() => {
            const floor_1 = slides.find(slide => slide.type === 'floor_hero')
            const floor_2 = slides.find(slide => slide.type === 'floor_intro')
            setFloorOne(floor_1);
            setFloorTwo(floor_2);
        }, [slides])
        
    
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-y-auto rounded-xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                    <FocusTrap>
                    <Dialog.Title
                        as="div"
                        className="mb-4 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800 pb-2 border-b"
                    >
                        <h3>Floor</h3>
                        <Close onClick={handleClose} />
                    </Dialog.Title>
                    <div className="mb-1 block text-sm font-medium text-gray-600">Screen 1</div>
                    <div className="p-3 border rounded-md">
                            <FloorLayout mainSlide={floorOne}/>
                    </div>
                    <div className="mb-1 block text-sm font-medium text-gray-600">Screen 2</div>
                    <div className="p-3 border rounded-md">
                            <FloorLayout mainSlide={floorTwo}/>
                    </div>
                    </FocusTrap>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    )
}

export default FloorModal