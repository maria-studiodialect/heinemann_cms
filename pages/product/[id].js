import React from 'react'
import Layout from '../../components/layout'
import ProductLayout from '../../components/Product/ProductLayout'
import DeleteProduct from '../../components/Product/DeleteProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import EditableProduct from '../../components/Products/EditableProduct'

function Product({ product }) {
  return (
    <Layout meta={{ name: product?.title || 'Product' }}>
      <div>
        <header className="my-3 flex flex-col items-center justify-end rounded-md md:flex-row">
        </header>
        <EditableProduct  mainProduct={product}/>
      </div>
    </Layout>
  )
}

export default Product


export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/getProduct?id=${params.id}`);
    const data = await res.json();
    
    return {
      props: { product: data.data },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export async function getServerSidePaths() {
  try {
    const res = await fetch('http://localhost:3000/api/products/getProducts');
    const products = await res.json();
  
    return {
      paths: products.map((item) => ({
        params: { id: item.id },
      })),
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
}
