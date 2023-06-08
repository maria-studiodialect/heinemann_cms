import { Dialog, Transition, FocusTrap } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import CarouselLayout from './CarouselLayout'
import { Close } from '../common/icons/Close'

const SetSlide = ({ slides, activeId, activeMapId, isOpen, handleClose }) => {
    const [selectedSlideId, setSelectedSlideId] = useState(null);

    console.log(selectedSlideId);
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
                    <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                    <FocusTrap>
                    <Dialog.Title
                        as="div"
                        className="mb-4 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800 pb-2 border-b"
                    >
                        <h3>Screen {activeMapId}</h3>
                        <Close onClick={handleClose} />
                    </Dialog.Title>
                    <div className="mb-1 block text-sm font-medium text-gray-600">Select the relevant brand slide</div>
                    <div className="grid grid-cols-3 p-3 gap-3 border rounded-md">
                    {slides.filter(slide => slide.type === 'brand').map((slide, i) => (
                        <div key={i} className={`cursor-pointer ${selectedSlideId === slide.id && 'bg-white'}`} onClick={() => setSelectedSlideId(slide.id)}>
                        <CarouselLayout mainSlide={slide}/>
                        <div className="text-center my-1 text-xs">{slide.brand}</div>
                        </div>
                    ))}
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

export default SetSlide