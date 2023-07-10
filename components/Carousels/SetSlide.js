import { Dialog, Transition, FocusTrap } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import CarouselLayout from './CarouselLayout'
import { Close } from '../common/icons/Close'
import { IoIosRadioButtonOff, IoIosCheckmarkCircle } from 'react-icons/io'
import {AiFillInfoCircle, AiOutlineInfoCircle} from 'react-icons/ai'

const SetSlide = ({ slides, activeId, activeMapId, isOpen, handleClose, role }) => {
    const [selectedSlideId, setSelectedSlideId] = useState(null);
    const [info, setInfo] = useState(false)
    const [config, setConfig] = useState(false)

    useEffect(() => {
        const fetchCurrentSlideId = async () => {
            try {
                const response = await fetch(`/api/screens/getScreen?id=${activeId}`);
                const data = await response.json();
                setSelectedSlideId(data.data.slide_4.id);
                setConfig(data.data.config_profile);
            } catch (error) {
                console.log(error);
            }
            };
            fetchCurrentSlideId();
        }, [activeId]);


    const onSelect = async (slide) => {
        setSelectedSlideId(slide)
        try {
            await fetch(`/api/screens/updateScreen`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: activeId, ...{slide_4: slide} }),
            }).then(() => {
                // handleClose()
                //window.location.reload()
                console.log('success!')
            })
            } catch (error) {
            console.log(error)
            }
        }

    const handleInfo = () => setInfo(!info)


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
                        
                        <div className='flex items-center space-x-3'>
                        <h3>Screen {activeMapId}</h3>
                        {role === 'admin' && (
                            info ? (
                                <AiFillInfoCircle className='hover:opacity-50' onClick={handleInfo} />
                            ) : (
                                <AiOutlineInfoCircle className='hover:opacity-50' onClick={handleInfo} />
                            )
                        )}                        
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
                    <div className="mb-1 block text-sm font-medium">Select the relevant brand slide</div>
                    <div className="grid grid-cols-3 p-3 gap-3 border rounded-md">
                    {slides.filter(slide => slide.slide_type === 'brand').map((slide, i) => (
                        <div key={i} className={`cursor-pointer px-2 pt-2 ${selectedSlideId === slide.id && 'bg-white shadow rounded-lg'}`} onClick={() => onSelect(slide.id)}>
                        <CarouselLayout mainSlide={slide}/>
                        <div className="text-center my-1 text-xs flex items-center">{selectedSlideId === slide.id ? <IoIosCheckmarkCircle/> : <IoIosRadioButtonOff/>}<div className='flex-1'>{slide.brand}</div></div>
                        </div>
                    ))}
                    </div>
                    </>
                    }
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