import React from 'react'

const ProductHeader = () => {
  return (
    <div className="cursor-loading mt-6 mb-3 grid grid-cols-[2fr_1fr_1fr_1fr] rounded-md border px-5 py-3 shadow-sm lg:px-8">
      <div className="flex-1 font-semibold">Title</div>
      <div className="flex-1 text-right font-semibold lg:text-left">
        Brand
      </div>
      <div className="flex-1 text-right font-semibold lg:text-left">
        RFID
      </div>
    </div>
  )
}

export default ProductHeader
