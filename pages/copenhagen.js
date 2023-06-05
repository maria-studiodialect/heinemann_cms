import Link from "next/link";
import { RiEditLine } from 'react-icons/ri';
import Layout from '../components/layout'
import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {GrFormClose} from 'react-icons/gr'
import AddSlide from "../components/Carousels/addSlide";
import CarouselLayout from "../components/Carousels/CarouselLayout";


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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/screens/getScreens`)
        const { data } = await res.json()
        setScreens(data)
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
      <div className="flex mt-10 pb-5">
      <div className="bg-gray-50">
        <div className="text-2xl font-bold text-black pl-4">Copenhagen</div>
        <img src="/floor-md.jpg" usemap="#image-map" className="mix-blend-multiply"/>
        <map name="image-map">
        <area target="" alt="Screen 1" title="Screen 1" onClick={() => setActiveScreen('Screen 1')} coords="62,165,139,190" shape="rect" />
        <area target="" alt="Screen 2" title="Screen 2" onClick={() => setActiveScreen('Screen 2')} coords="33,142,62,221" shape="rect" />
        <area target="" alt="Screen 3 " title="Screen 3 " onClick={() => setActiveScreen('Screen 3')} coords="274,391,352,418" shape="rect" />
        <area target="" alt="Screen 4" title="Screen 4" href="/copenhagen/screen_4"  coords="403,462,428,536" shape="rect" />
        <area target="" alt="Screen 5" title="Screen 5" href="/copenhagen/screen_5"  coords="371,536,452,560" shape="rect" />
        <area target="" alt="Screen 6" title="Screen 6" href="/copenhagen/screen_6" coords="45,531,123,555" shape="rect" />
        </map>
      </div>
      <div>
        <div className="flex justify-between w-full">
        <div className="text-xl pl-4">Carousel Slides</div>
        <AddSlide/>
        </div>
        <div className="bg-gray-50 text-black drop-shadow-lg w-[40vw] mt-4 rounded-xl p-3">
          <div className="grid grid-cols-3 m-3 gap-3">
          {slides.map((slide, i) => (
            <div key={i}>
            <CarouselLayout mainSlide={slide}/>
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
  );
}
Copenhagen.getLayout = function getLayout(page) {
    return <Layout meta={{ name: 'copenhagen' }}>{page}</Layout>
  }