import React from 'react'
import { getXataClient } from '../../utils/xata'
import Layout from '../../components/layout'
import ProductLayout from '../../components/Product/ProductLayout'
import DeleteProduct from '../../components/Product/DeleteProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import EditableProduct from '../../components/Products/EditableProduct'

const xata = getXataClient()

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

export async function getStaticProps({ params }) {
  try {
    const data = await xata.db.Products.select(['*', 'brand.*']).filter({
      id: params.id,
    }).getMany();
    
    return {
      props: { product: data[0] },
      revalidate: 10, // Revalidate the page every 60 seconds (adjust as needed)
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export async function getStaticPaths() {
  const products = await xata.db.Products.getAll();

  return {
    paths: products.map((item) => ({
      params: { id: item.id },
    })),
    fallback: true,
  }
}
