import Link from "next/link";
import { RiEditLine } from 'react-icons/ri';
import Layout from '../components/layout'
import { useEffect, useState, Fragment } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {GrFormClose} from 'react-icons/gr'
import AddSlide from "../components/Carousels/AddSlide";
import CarouselLayout from "../components/Carousels/CarouselLayout";
import { Dialog, Transition } from '@headlessui/react'
import { Close } from "../components/common/icons/Close";
import SetSlide from "../components/Carousels/SetSlide";
import FloorModal from "../components/Floor/FloorModal";

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


  const handleClose = () => setIsOpen(false)
  const handleFloorClose = () => setIsFloorOpen(false)

  function handleOpen(num) {
    setActiveScreen(num)
    setIsOpen(true)
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
    setSlides(result.data);
  };




  return (
    <div>
        <div className="flex mt-10 pb-5">
        <div className="bg-gray-50">
          <div className="text-2xl font-bold text-black pl-4">Copenhagen</div>
          <svg width="572" height="594" viewBox="0 0 572 594" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.5 572V28.5H224.5L544 572H27.5Z" stroke="#9CA3AF" stroke-width="10"/>
          <rect onClick={() => handleOpen(screens[0])} x="45" y="124" width="11" height="70" fill="#9CA3AF" className="cursor-pointer"/>
          <rect onClick={() => handleOpen(screens[1])} x="126" y="153" width="11" height="70" transform="rotate(90 126 153)" fill="#9CA3AF" className="cursor-pointer"/>
          <rect onClick={() => handleOpen(screens[2])}  x="329" y="363" width="11" height="70" transform="rotate(90 329 363)" fill="#9CA3AF" className="cursor-pointer"/>
          <rect onClick={() => handleOpen(screens[3])}  x="417" y="484" width="11" height="70" transform="rotate(90 417 484)" fill="#9CA3AF" className="cursor-pointer"/>
          <rect onClick={() => handleOpen(screens[4])}  x="115" y="483" width="11" height="70" transform="rotate(90 115 483)" fill="#9CA3AF" className="cursor-pointer"/>
          <rect  onClick={() => handleFloorOpen(screens[5])}  x="161" y="146" width="62" height="244" fill="#9CA3AF" className="cursor-pointer"/>
          <rect x="375" y="414" width="11" height="70" fill="#9CA3AF" className="cursor-pointer"/>
          <path d="M95 77.5L99.5 82.5L104 97L110 100.5V109.5V125.5L104 130.5L95 133.5L76 130.5L64.5 125.5V116.5V97V82.5L73 77.5L82 74L95 77.5Z" stroke="#9CA3AF" stroke-width="3"/>
          <path d="M293.293 288.014L289.085 293.278L285.002 308.442L279.35 312.161L279.468 321.539L279.679 338.211L285.444 343.349L294.032 346.367L312.038 343.012L322.894 337.664L322.776 328.286L322.518 307.967L322.327 292.857L314.188 287.75L305.594 284.211L293.293 288.014Z" stroke="#9CA3AF" stroke-width="3"/>
          <path d="M125 97H116.5L108.5 92.5L104 81.5L110 75.5L120.5 78L130 89L125 97Z" stroke="#9CA3AF" stroke-width="3"/>
          <path d="M281.418 289.397L283.464 297.801L281.418 306L270.129 316.758L260.739 310.142L261.036 299.074L271.176 286.655L281.418 289.397Z" stroke="#9CA3AF" stroke-width="3"/>
          <rect x="59.5" y="167.5" width="66" height="23" stroke="#9CA3AF" stroke-width="3"/>
          <rect x="260.5" y="377.5" width="66" height="23" stroke="#9CA3AF" stroke-width="3"/>
          <rect x="372.5" y="415.5" width="66" height="23" transform="rotate(90 372.5 415.5)" stroke="#9CA3AF" stroke-width="3"/>
          <path d="M57 531.5L49.5 519.5V508.5L60.5 501L70.5 515V531.5L60.5 536L57 531.5Z" stroke="#9CA3AF" stroke-width="3"/>
          <path d="M87 551L77 541V531.5V513L90.5 507L113.5 508.5L119.5 519.5L109.5 541L102 551H87Z" stroke="#9CA3AF" stroke-width="3"/>
          <circle cx="361" cy="383" r="21.5" stroke="#9CA3AF" stroke-width="3"/>
          </svg>
        </div>
        <div>
          <div className="flex justify-between w-full">
          <div className="text-xl pl-4">Carousel Slides</div>
          <AddSlide/>
          </div>
          <div className="bg-gray-50 text-black drop-shadow-lg w-[40vw] mt-4 rounded-xl p-3">
            <div className="grid grid-cols-3 m-3 gap-3">
            {slides.filter(slide => !slide.type.includes('floor')).map((slide, i) => (
              <div key={i}>
              <CarouselLayout mainSlide={slide}/>
              </div>
            ))}
            </div>
          </div>
        </div>
        </div> 
        <SetSlide isOpen={isOpen} activeId={activeScreen?.id}  activeMapId={activeScreen?.map_id} slides={slides} handleClose={handleClose}/>
        <FloorModal isOpen={isFloorOpen} activeId={activeScreen?.id}  activeMapId={activeScreen?.mapId} slides={slides} handleClose={handleFloorClose}/>
    </div>
  );
}
Copenhagen.getLayout = function getLayout(page) {
    return <Layout meta={{ name: 'copenhagen' }}>{page}</Layout>
  }