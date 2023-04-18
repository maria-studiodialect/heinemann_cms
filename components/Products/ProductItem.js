import React from 'react'
import Link from 'next/link'
import EditableRFID from './EditableRFID'
import {AiFillEdit} from 'react-icons/ai'


const ProductItem = ({ id, title, brand, RFID }) => {
  return (
    <div className="my-2 grid grid-cols-[2fr_1fr_1fr_1fr] cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow-md lg:px-6">
      <p className="flex-1 truncate font-medium">{title}</p>
      <p className="flex-1 text-right lg:text-left">{brand.title}</p>
      <EditableRFID productId={id} initialRFID={RFID}/>
      <div className="justify-self-end text-right text-sm lg:text-left">
        <Link href={`/product/${id}`}>
          <span className="hidden text-lg lg:inline-block hover:opacity-70"><AiFillEdit/></span>
          <span className="inline-block text-sm lg:hidden">Details</span>
        </Link>
      </div>
    </div>
  )
}

export default ProductItem