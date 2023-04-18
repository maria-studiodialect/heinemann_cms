import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { NavLink } from '../common/Links'
import Image from 'next/image'
import { useRouter } from 'next/router'


const Sidebar = () => {
  const router = useRouter();

  const linkClass = (href) => {
    return router.pathname === href ? 'bg-black text-white' : 'bg-gray-100';
  };
  return (
    <>

      <div
        className={clsx(
          'w-full px-16 w-screen p-3  transition-all duration-300 ease-in-out my-5'
        )}
      >
        <nav
          className={clsx('flex justify-between items-center px-3 py-6')}
        >
          <Link href={'/'}>
            <div className='relative w-52 h-fit'>
              <Image src='/eu-logo.svg' width={316} height={70}/>
            </div>
          </Link>
          <div>
          <Link href={'/locations'} className={`${linkClass('/locations')} px-4 py-1.5 rounded-full hover:bg-black hover:text-white mx-2`}>Locations</Link>
          <Link href={'/brands'} className={`${linkClass('/brands')} px-4 py-1.5 rounded-full hover:bg-black hover:text-white mx-2`}>Brands</Link>
          <Link href={'/products'} className={`${linkClass('/products')} px-4 py-1.5 rounded-full hover:bg-black hover:text-white mx-2`}>Products</Link>
          <Link href={'/analytics'} className={`${linkClass('/analytics')} px-4 py-1.5 rounded-full hover:bg-black hover:text-white mx-2`}>Analytics</Link>

          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
