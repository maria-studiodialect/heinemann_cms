import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useContext, useEffect, useState } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/Product/AddProduct'
import axios from "axios";
import useAuthentication from '../hooks/useAuthentication'
import { AuthContext } from '../stores/authContext'


function Products() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [fullProducts, setFullProducts] = useState([])
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products/getProducts`)
        const { data } = await res.json()
        setProducts(data)
        setFullProducts(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    const { value } = e.target;
    const searchQuery = value.toLowerCase();
    
    if (searchQuery.trim() === '') {
      // if search query is empty, reset products to full list
      setProducts(fullProducts);
    } else {
      // otherwise, filter the products based on search query
      const filteredProducts = fullProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.brand.title.toLowerCase().includes(searchQuery) ||
        product.product_type.toLowerCase().includes(searchQuery)
      );
      setProducts(filteredProducts);
    }
  };
  
  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-black">Products</div>
        <input
          placeholder="Search"
          className='rounded-full flex-1 mx-40 border-0 shadow px-4 py-1.5'
          onChange={handleSearch}
        />
        {role === 'admin' &&
        <div className="flex items-center space-x-2">
          <AddProduct />
        </div>
        }
      </header>
      
      <ProductHeader />
      <div>
      {loading ? (
        <ProductItemsSkeleton />
      ) : (
        <ProductItems products={products} />
      )}
      </div>
    </div>
  )
}

export default Products

Products.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>
}
