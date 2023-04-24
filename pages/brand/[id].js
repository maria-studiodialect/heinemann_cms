import React, { useState } from 'react'
import { getXataClient } from '../../utils/xata'
import Layout from '../../components/layout'
import ProductLayout from '../../components/Product/ProductLayout'
import DeleteProduct from '../../components/Product/DeleteProduct'
import UpdateBrand from '../../components/Brand/UpdateBrand'
import Image from 'next/image'

const xata = getXataClient()

function Brand({ brand }) {
  const [measurements, setMeasurements] = useState(null)
  return (
    <Layout meta={{ name: brand?.title || 'Brand' }}>
      <div>
        <header className="mx-40 my-3 flex flex-col items-center justify-end rounded-md md:flex-row">
          <div className="flex items-center space-x-2">
            <UpdateBrand brand={brand} />
            <DeleteProduct
              disabled={
                brand?.id === 'rec_ce0bsgt8oiq6e92pa810' ||
                brand?.id === 'rec_ce0btqp99gj1h1lgvno0'
              }
              brandId={brand?.id}
            />
          </div>
        </header>
        <div className="mx-40 flex flex-col justify-center items-center bg-black text-white py-14 rounded-xl mb-20">
            <div className="relative mb-10 w-[20vw] mx-auto">
              <Image src={brand.logo} width={537} height={324} onLoadingComplete={e => setMeasurements(e)} className="w-full h-auto object-contain"/>
            </div>
            <div className="w-1/2 text-center">{brand.description}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Brand

export async function getStaticProps({ params }) {
  try {
    const data = await xata.db.Brands
      .filter({
        id: params.id,
      })
      .getMany();
    return {
      props: { brand: data[0] },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export async function getStaticPaths() {
  const brands = await xata.db.Brands.getAll();

  return {
    paths: brands.map((item) => ({
      params: { id: item.id },
    })),
    fallback: true,
  }
}
