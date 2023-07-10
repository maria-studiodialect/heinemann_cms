import { Dialog, Transition, FocusTrap } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'
import { Close } from '../common/icons/Close'
import CarouselLayout from '../Carousels/CarouselLayout'
import FloorLayout from './FloorLayout'
import {FiInfo} from 'react-icons/fi'


const FloorModal = ({ slides, activeId, activeMapId, isOpen, handleClose, role }) => {
    const [floorOne, setFloorOne] = useState(null);
    const [floorTwo, setFloorTwo] = useState(null);
    const [config, setConfig] = useState(false)
    const [info, setInfo] = useState(false)


    
    useEffect(() => {
        const fetchCurrentSlideId = async () => {
            try {
                const response = await fetch(`/api/screens/getScreen?id=${activeId}`);
                const data = await response.json();
                setConfig(data.data.config_profile);
            } catch (error) {
                console.log(error);
            }
            };
            fetchCurrentSlideId();
        }, [activeId]);


        useEffect(() => {
            const floor_1 = slides.find(slide => slide.slide_type === 'floor_hero')
            const floor_2 = slides.find(slide => slide.slide_type === 'floor_intro')
            setFloorOne(floor_1);
            setFloorTwo(floor_2);
        }, [slides])
        
        const handleInfo = () => setInfo(!info)

        console.log(config)
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
                        <div className='flex items-center space-x-3'>
                        <h3>Floor</h3>
                        {role === 'admin' && <FiInfo className='hover:opacity-50' onClick={handleInfo}/>}
                        </div>
                        <Close onClick={handleClose} />
                    </Dialog.Title>
                    {info ? 
                    <div>
                        <div className="mb-1 block text-sm font-medium">Config Profile</div>
                        <div className='border rounded-md p-3'>
                            <div><span className='font-medium text-gray-400'>Location:</span> {config.location.name}</div>
                            <div><span className='font-medium text-gray-400'>Map Position:</span> {config.map_position_id}</div>
                            <div><span className='font-medium text-gray-400'>IP Address:</span> {config.ip}</div>
                            <div><span className='font-medium text-gray-400'>Server IP Address:</span> {config.server_ip}</div>
                            <div><span className='font-medium text-gray-400'>Screen Type:</span> {config.screen_type.type}</div>
                            <div><span className='font-medium text-gray-400'>Connection Type:</span> {config.connection_type}</div>
                        </div>
                    </div>
                    :
                    <>
                    <div className="mb-1 block text-sm font-medium text-gray-600">Screen 1</div>
                    <div className="p-3 border rounded-md">
                            <FloorLayout mainSlide={floorOne}/>
                    </div>
                    <div className="mb-1 block text-sm font-medium text-gray-600">Screen 2</div>
                    <div className="p-3 border rounded-md">
                            <FloorLayout mainSlide={floorTwo}/>
                    </div>
                    </>}
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