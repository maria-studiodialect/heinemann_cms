import React from 'react'
import ProductItem from './ProductItem'

const ProductItems = ({ products }) => {
  console.log(products)
  return (
    <div className="block h-[74vh] overflow-y-scroll rounded-lg border p-2 xxl:max-h-[70vh]">
      <div className='pb-0.5'>
      {products.length ? (
        products.map((i) => <ProductItem key={i.id} {...i} />)
      ) : (
        <div className="h-[100px] w-full text-center font-bold text-gray-300">
          No products found.
        </div>
      )}
      </div>
    </div>
  )
}

export default ProductItems
