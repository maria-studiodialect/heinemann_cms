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
import Image from "next/image";

export default function Copenhagen(props) {
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
  
  const handleFloorClose = () =>  {
    setIsFloorOpen(false)
    window.location.reload()
  }

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
        const filtered = data.filter(screen => screen.location === 'Copenhagen')
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
    const filteredSlides = result.data.filter(slide => slide.location.id === 'rec_cgukpvk4e8c96vs22t90')
    setSlides(filteredSlides);
  };


  return (
    <div>
        <div className="flex justify-between mt-5 pb-5">
        <div className="bg-gray-50 flex-shrink-0">
          <div className="text-2xl font-bold text-black pl-4 pb-3">Copenhagen</div>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1082 1088.72" className="absolute top-0 left-0 h-[82vh] w-[38vw] max-w-[38vw] max-h-[72vh]">
              <image href="/cph_floorplan.png" width={1082} height={1088.72}/>
              <g id="Layer_11" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleOpen(screens[0])}>
              <rect class="fill-white" x="29.27" y="283.48" width="22.02" height="129.6"/>
              </g>
              <g id="Layer_10" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleOpen(screens[1])}>
              <rect class="fill-white" x="55.53" y="334.31" width="128.75" height="25.41"/>
              </g>
              <g id="Layer_9" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleOpen(screens[2])}>
              <rect class="fill-white" x="423.15" y="489.32" width="131.29" height="32.19"/>
              </g>
              <g id="Layer_8" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleOpen(screens[3])}>
              <rect class="fill-white" x="690.82" y="843.39" width="132.14" height="24.56"/>
              </g>
              <g id="Layer_7" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleOpen(screens[4])}>
              <rect class="fill-white" x="823.96" y="793.95" width="22.87" height="128.93"/>
              </g>
              <g id="Layer_6" class="opacity-10">
              <rect class="fill-white" x="27.57" y="887.43" width="128.75" height="20.33"/>
              </g>
              <g id="Layer_5" class="opacity-10 hover:opacity-60 cursor-pointer" onClick={() => handleFloorOpen(screens[5])}>
              <rect class="fill-white" x="258.82" y="315.67" width="105.04" height="411.67"/>
              </g>
            </svg>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center w-full flex-grow">
          <div className="text-lg pl-4">Carousel Slides</div>
          {role === 'admin' && <AddSlide location='rec_cgukpvk4e8c96vs22t90' />}
          </div>
          <div className="bg-gray-50 text-black drop-shadow-lg w-[37vw] my-2 rounded-xl p-3">
            <div className="grid grid-cols-3 m-3 gap-3">
            {slides.filter(slide => !slide.slide_type.includes('floor') && !slide.slide_type.includes('brand')).map((slide, i) => (
              <div key={i} onClick={() => handleUpdate(slide)} className="cursor-pointer">
              <CarouselLayout mainSlide={slide}/>
              </div>
            ))}
            </div>
            <div className="text-lg pl-4">Brand Slides</div>
            <div className="grid grid-cols-3 m-3 gap-3">
            {slides.filter(slide => slide.slide_type.includes('brand')).map((slide, i) => (
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
        <UpdateSlide product={selectedSlide} updateIsOpen={updateIsOpen} handleClose={closeUpdate} location='rec_cgukpvk4e8c96vs22t90'/>
    </div>
  );
}
Copenhagen.getLayout = function getLayout(page) {
    return <Layout meta={{ name: 'copenhagen' }}>{page}</Layout>
  }