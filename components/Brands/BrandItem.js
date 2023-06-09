import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DeleteBrand from '../Brand/DeleteBrand'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../stores/authContext'



const BrandItem = ({ title, image, id }) => {
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

  return (
    <div className="my-2 cursor-pointer rounded-md border px-3 py-4 shadow-md hover:shadow lg:px-6">
      <div className='relative w-full h-[15vh]'>
        <Image src={image} fill className='invert object-contain' alt='brand logo'/>
      </div>
      <div className='flex justify-between items-center mt-5'>
      <div className="font-bold text-black">{title}</div>
      {role === 'admin' &&
        <DeleteBrand
                brandId={id}
        />
      }
      </div>
    </div>
  )
}

export default BrandItem
