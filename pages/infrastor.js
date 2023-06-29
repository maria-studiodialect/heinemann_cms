import Link from "next/link";
import { RiEditLine } from 'react-icons/ri';
import Layout from '../components/layout'
import { useEffect, useState, Fragment, useContext } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {GrFormClose} from 'react-icons/gr'
import AddSlide from "../components/Carousels/AddSlide";
import CarouselLayout from "../components/Carousels/CarouselLayout";
import { Dialog, Transition } from '@headlessui/react'
import { Close } from "../components/common/icons/Close";
import SetSlide from "../components/Carousels/SetSlide";
import FloorModal from "../components/Floor/FloorModal";
import { AuthContext } from "../stores/authContext";
import UpdateSlide from "../components/Carousels/UpdateSlide";

export default function Infrastor(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [screens, setScreens] = useState()
  const [activeScreen, setActiveScreen] = useState(null)
  const [slides, setSlides] = useState([]);
  const [brand, setBrand] = useState(null);
  const [showAddBrand, setShowAddBrand] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isFloorOpen, setIsFloorOpen] = useState(false)
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)
  let [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState(null)



  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])


  const handleClose = () => setIsOpen(false)
  const handleFloorClose = () => setIsFloorOpen(false)

  function handleOpen(num) {
    setActiveScreen(num)
    setIsOpen(true)
  }


  function handleUpdate(id) {
    setSelectedSlide(id)
    setUpdateIsOpen(true)
  }

  function closeUpdate() {
    setUpdateIsOpen(false)
  }

  function handleFloorOpen(num) {
    setActiveScreen(num)
    setIsFloorOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/screens/getScreens`)
        const { data } = await res.json()
        const filtered = data.filter(screen => screen.location === 'Infrastor')
        setScreens(filtered)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])


  useEffect(() => {
    fetchSlides();
  }, []);


  const fetchSlides = async () => {
    // Replace this URL with the API endpoint to fetch your Slides data
    const response = await fetch('/api/carousels/getSlides');
    const result = await response.json();
    const filteredSlides = result.data.filter(slide => slide.location.id === 'rec_cidglo21vg9gsv775ibg')
    setSlides(filteredSlides);
  };

  return (
    <div>
        <div className="flex justify-between mt-10 pb-5">
        <div className="bg-gray-50 flex-shrink-0">
          <div className="text-2xl font-bold text-black pl-4">Infrastor</div>
          <div className="bg-gray-50 mt-4 p-3 drop-shadow-lg rounded-xl ml-4">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 786.9 495.3" className="h-[40vh] w-[32vw] max-w-[35vw] max-h-[72vh]">
          <a onClick={() => handleOpen(screens[0])} className="hover:cursor-pointer">
            <rect x="52" y="61" fill='#9CA3AF' width="14.1" height="145.2" className="hover:fill-gray-500"/>
          </a>
          <rect onClick={() => handleOpen(screens[3])} x="82.8" y="344.5" fill='#9CA3AF' width="145.2" height="22.8" className="hover:fill-gray-500 cursor-pointer"/>
          <rect x="90.1" y="374.6" fill='transparent' stroke='#9CA3AF' stroke-width='4' width="136.9" height="47.7"/>
          <path fill='transparent' stroke='#9CA3AF' stroke-width='4' d="M107.2,181.2l-3.8-13.8l5.1-31.8l-8.1-12.3l8.5-17.1L124,75.8l16.1-3.8l19.9,2.8l33.3,23.6l17.2,20.4l-8.5,17.1
            l-18.4,37.1l-13.7,27.6L149,202l-20.4-1.8L107.2,181.2z"/>
          <rect x="365.8" y="61" stroke='#9CA3AF' fill='transparent' stroke-width='4' width="368.6" height="368.6"/>
          <rect onClick={() => handleFloorOpen(screens[4])} x="490" y="185.5" fill='#9CA3AF' width="243" height="122" className="hover:fill-gray-500 cursor-pointer"/>
          <a onClick={() => handleOpen(screens[1])} className="hover:cursor-pointer">
            <rect x="70" y="61" fill='#9CA3AF' width="14.1" height="145.2" className="hover:fill-gray-500"/>
          </a>
          <a onClick={() => handleOpen(screens[2])} className="hover:cursor-pointer">
            <rect x="51" y="279.1" fill='#9CA3AF' width="14.1" height="145.2" className="hover:fill-gray-500"/>
          </a>
          <a>
            <rect x="69" y="279.1" fill='#9CA3AF' width="14.1" height="145.2" />
          </a>
          </svg>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center w-full flex-grow">
          <div className="text-xl pl-4">Carousel Slides</div>
          {role === 'admin' && <AddSlide location='rec_cidglo21vg9gsv775ibg' />}
          </div>
          <div className="bg-gray-50 text-black drop-shadow-lg w-[37vw] mt-4 rounded-xl p-3">
            <div className="grid grid-cols-3 m-3 gap-3">
            {slides.filter(slide => !slide.slide_type.includes('floor')).map((slide, i) => (
              <div key={i} onClick={() => handleUpdate(slide)} className="cursor-pointer">
                <CarouselLayout mainSlide={slide}/>
              </div>
            ))}
            </div>
          </div>
        </div>
        </div> 
        <SetSlide isOpen={isOpen} activeId={activeScreen?.id}  activeMapId={activeScreen?.map_id} slides={slides} handleClose={handleClose}/>
        <FloorModal isOpen={isFloorOpen} activeId={activeScreen?.id}  activeMapId={activeScreen?.mapId} slides={slides} handleClose={handleFloorClose}/>
        <UpdateSlide product={selectedSlide} updateIsOpen={updateIsOpen} handleClose={closeUpdate}/>
    </div>
  );
}
Infrastor.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'copenhagen' }}>{page}</Layout>
}