import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useEffect, useState } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/Product/AddProduct'
import axios from "axios";


function Products() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products/getProducts`)
        const { data } = await res.json()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleSearch = async (e) => {
    const { value } = e.target;
    const data = await axios.post(`/api/products/search`, { value });
    setProducts(data?.data?.data);
  };

  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-black">Products</div>
        <input
          placeholder="Search"
          className='rounded-full flex-1 mx-40 shadow px-4 py-1.5'
          onChange={handleSearch}
        />
        <div className="flex items-center space-x-2">
          <AddProduct />
        </div>
      </header>
      <ProductHeader />
      {loading ? (
        <ProductItemsSkeleton />
      ) : (
        <ProductItems products={products} />
      )}
    </div>
  )
}

export default Products

Products.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>
}
