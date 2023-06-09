import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useEffect, useState, useContext } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddBrand from '../components/Brand/AddBrand'
import BrandItem from '../components/Brands/BrandItem'
import { AuthContext } from '../stores/authContext'

function Brands() {
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([])
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

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
        <h1 className="text-2xl font-bold text-black">Brands</h1>
        {role === 'admin' && (
        <div className="flex items-center space-x-2">
          <AddBrand />
        </div>
        )}
      </header>
      <div className='grid grid-cols-4 gap-5 mt-6'>
      {brands.map((brand, i) => (
        <div key={i}>
        <BrandItem title={brand.title} image={brand.logo} id={brand.id}/>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Brands

Brands.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'brands' }}>{page}</Layout>
}
