import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const BrandItem = ({ title, image, id }) => {
  return (
    <div className="my-2 cursor-pointer rounded-md border px-3 py-4 shadow-md hover:shadow lg:px-6">
      <div className='relative w-full h-[15vh]'>
        <Image src={image} fill className='invert object-contain'/>
      </div>
      <div className="font-bold text-black mt-5">{title}</div>
        <Link href={`/brand/${id}`}>
          <span className="text-xs">View Details</span>
        </Link>
    </div>
  )
}

export default BrandItem
