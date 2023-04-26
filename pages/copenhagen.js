import Link from "next/link";
import { RiEditLine } from 'react-icons/ri';
import Layout from '../components/layout'
import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {GrFormClose} from 'react-icons/gr'


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
  const [brands, setBrands] = useState([]);
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
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    // Replace this URL with the API endpoint to fetch your brands data
    const response = await fetch('/api/brands/getBrands');
    const result = await response.json();
    setBrands(result.data);
  };

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    const brand = brands.find((brand) => brand.id === parseInt(brandId));
    setBrand(brand);
  };

  const handleAddBrandClick = () => {
    setShowAddBrand(true);
  };

  return (
      <div className="flex">
      <div className="bg-gray-50">
        <div className="text-2xl font-bold text-black pl-4">CPH Screens</div>
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
        {screens &&
        screens.filter(screen => screen.location === 'Copenhagen' && screen.title === activeScreen).map((screen, i) => (
          <div className="bg-white shadow-lg h-fit p-4 rounded-xl my-2 w-[15vw]" key={i}>
  <div className="font-bold border-b pb-1 mb-5 flex justify-between items-center"><span>{screen.title}</span><span className="cursor-pointer hover:opacity-70" onClick={() => setActiveScreen(null)}><GrFormClose/></span></div>
  <div className="mb-2">
      <label htmlFor="brand" className="mb-1 block text-xs font-medium text-gray-600">Screen Type</label>
      <span className="block">{screen.screen_type}</span>
    </div>
  {screen.brand ? (
    <div className="mb-2">
      <label htmlFor="brand" className="mb-1 block text-xs font-medium text-gray-600">Brand</label>
      <select
        {...register('brand')} className="border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2"
      >
        <option value=''>Select brand</option>
        {brands.map((brand, index) => (
          brand.id === screen.brand.id ? 
          <option key={index} selected value={brand.id} >
            {brand.title}
          </option> :
          <option key={index} value={brand.id} >
            {brand.title}
          </option>
        ))}
      </select>
    </div>
  ) : (
    screen.screen_type === 'RFID' &&
    <div className="mb-2">
      <label htmlFor="brand" className="mb-1 block text-sm font-medium text-gray-600">Brand</label>
      <select
        {...register('brand')}
        className="border border-gray-300 border-solid px-4 py-2.5 rounded-md w-full focus:ring-2"
        onChange={handleSubmit(async (data) => {
          try {
            await fetch(`/api/screens/${screen.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ brandId: data.brand }),
            });
            const res = await fetch(`/api/screens/getScreens`);
            const { data: updatedScreens } = await res.json();
            setScreens(updatedScreens);
          } catch (error) {
            console.error(error);
          }
        })}
      >
        <option value="">Select brand</option>
        {brands.map((brand, index) => (
          <option key={index} value={brand.id}>
            {brand.title}
          </option>
        ))}
      </select>
    </div>
  )}
</div>

        ))
      }
      </div>
      </div>
  );
}
Copenhagen.getLayout = function getLayout(page) {
    return <Layout meta={{ name: 'copenhagen' }}>{page}</Layout>
  }