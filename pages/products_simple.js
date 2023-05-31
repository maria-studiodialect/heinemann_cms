import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useEffect, useState } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/Product/AddProduct'
import axios from "axios";


function ProductsSimple() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [fullProducts, setFullProducts] = useState([])
  
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
        product.brand.title.toLowerCase().includes(searchQuery)
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
          className='rounded-full shadow px-4 py-1.5'
          onChange={handleSearch}
        />
      </header>
      <ProductHeader simple={true} />
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

export default ProductsSimple

ProductsSimple.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'ProductsSimple' }}>{page}</Layout>
}
