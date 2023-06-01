import React from 'react'
import Link from 'next/link'
import EditableRFID from './EditableRFID'
import {AiFillEdit} from 'react-icons/ai'
import { useRouter } from 'next/router'



const ProductItem = ({ id, title, brand, rfid_copenhagen, product_type }) => {
  const router = useRouter();
  return (
    <div className={`my-2 grid ${router.pathname === '/products_simple' ? 'grid-cols-[2fr_1fr_1fr_1fr]' : 'grid-cols-[2fr_1fr_1fr_0.1fr_0.5fr]'} cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow-md lg:px-6`}>
      {router.pathname !== '/products_simple' ? <Link href={`/product/${id}`}><p className="flex-1 truncate font-medium hover:underline">{title}</p></Link> : <p className="flex-1 truncate font-medium">{title}</p>}
      <p className="flex-1 text-right lg:text-left">{brand.title}</p>
      <p className="flex-1 text-right lg:text-left">{product_type}</p>
      {router.pathname === '/products_simple' ?
        <div><EditableRFID productId={id} initialRFID={rfid_copenhagen}/></div>
      :
        <div></div>
      }
      
      <div className="justify-self-end text-right text-sm lg:text-left">
        {router.pathname !== '/products_simple' && (
        <Link href={`/product/${id}`}>
          <span className="hidden text-lg lg:inline-block hover:opacity-70"><AiFillEdit/></span>
          <span className="inline-block text-sm lg:hidden">Details</span>
        </Link>
        )
          }
      </div>
    </div>
  )
}

export default ProductItem
