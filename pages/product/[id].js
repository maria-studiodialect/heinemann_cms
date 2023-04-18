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
          {/*
          <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
            <span className="mr-2 text-sm font-medium text-gray-500">
              Product:{' '}
            </span>
            {product?.title}
          </h1>
          
          <div className="flex items-center space-x-2">
            <UpdateProduct product={product} />
            <DeleteProduct
              disabled={
                product?.id === 'rec_ce0bsgt8oiq6e92pa810' ||
                product?.id === 'rec_ce0btqp99gj1h1lgvno0'
              }
              productId={product?.id}
            />
          </div>
          */}
        </header>
        {/* 
        {product ? (
          <ProductLayout product={product} />
        ) : (
          <div className="w-full text-center text-2xl font-bold text-gray-300">
            No details
          </div>
        )}
        */}
        <EditableProduct  mainProduct={product}/>
      </div>
    </Layout>
  )
}

export default Product

export async function getStaticProps({ params }) {
  try {
    const data = await xata.db.Products
      .select(["*", "brand.*"])
      .filter({
        id: params.id,
      })
      .getMany();
    return {
      props: { product: data[0] },
    }
  } catch (error) {
    return {
      props: {},
    }
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
