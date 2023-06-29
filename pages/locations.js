import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useEffect, useState } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddBrand from '../components/Brand/AddBrand'
import BrandItem from '../components/Brands/BrandItem'
import Link from 'next/link'

function Locations() {
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/brands/getBrands`)
        const { data } = await res.json()
        setBrands(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Locations</h1>
      </header>
      <div className="grid grid-cols-3 mt-5 gap-2 p-2">
        <div className="bg-[url('/CPH.jpg')] bg-center bg-cover bg-no-repeat text-gray-100 flex justify-center items-center rounded-xl h-[30vh] text-2xl font-medium drop-shadow-lg hover:opacity-70">
          <Link href="/copenhagen">COPENHAGEN</Link>
        </div>
        <div className="bg-[url('/ist.jpg')] bg-center bg-cover bg-no-repeat text-gray-100 flex justify-center items-center rounded-xl h-[30vh] text-2xl font-medium drop-shadow-lg hover:opacity-70">
          <Link href="">ISTANBUL</Link>
        </div>
        <div className="bg-[url('/FRA.webp')] bg-bottom  bg-cover bg-no-repeat text-gray-100 flex justify-center items-center rounded-xl h-[30vh] text-2xl font-medium drop-shadow-lg hover:opacity-70">
          <Link href="">FRANKFURT</Link> 
        </div>
        <div className="bg-[url('/water-bg.png')] bg-left bg-cover bg-no-repeat text-gray-100 flex justify-center items-center rounded-xl h-[30vh] text-2xl font-medium drop-shadow-lg hover:opacity-70">
          <Link href="/infrastor">INFRASTOR</Link> 
        </div>
      </div>
    </div>
  )
}

export default Locations

Locations.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'locations' }}>{page}</Layout>
}
