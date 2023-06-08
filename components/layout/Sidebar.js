import clsx from 'clsx'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { NavLink } from '../common/Links'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {IoBagHandle, IoCart, IoMap, IoLogOut } from 'react-icons/io5'
import {MdAnalytics} from 'react-icons/md'
import { AuthContext } from '../../stores/authContext'


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen((prev) => !prev)
  const router = useRouter();

  const linkClass = (href) => {
    return router.pathname === href ? 'font-bold text-black' : 'text-grey-300';
  };

  const {user, login, logout} = useContext(AuthContext)
  return (
    <>
      <div
        onClick={handleToggle}
        className={clsx('block cursor-pointer border px-3 py-2 lg:hidden')}
      >
        {isOpen ? 'Close' : 'Menu'}
      </div>
  
      <div
        className={clsx(
          'h-max-content border-r-1 absolute w-screen p-3  transition-all duration-300 ease-in-out lg:relative lg:block lg:max-w-[15vw] lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav
          onClick={handleToggle}
          className={clsx('flex h-full justify-between  flex-col px-3 py-6 bg-white rounded-xl shadow lg:border-gray-200')}
        >
          <div className='flex flex-col items-center'>
          <Link href={'/'}>
            <div className='relative w-36 h-fit mx-auto'>
              <Image src='/eu-logo.svg' width={316} height={70} alt='logo' priority />
            </div>
          </Link>
          <div className='h-14 w-14 rounded-full bg-gray-200 mt-7'></div>
          <div className='text-sm font-bold mt-2'>Ulla Thomas</div>
          <div className='text-sm text-gray-400'>Admin</div>
          </div>
          <div>
          {router.pathname !== '/products_simple' && (
            <>
          <Link href={'/locations'} className={`${linkClass('/locations')} px-4 py-3 text-gray-400 hover:text-black hover:font-bold mx-2 flex`}><IoMap className='mr-3 text-xl'/> Locations</Link>
          <Link href={'/brands'} className={`${linkClass('/brands')} px-4 py-3 text-gray-400 hover:text-black hover:font-bold mx-2 flex`}><IoBagHandle className='mr-3 text-xl'/> Brands</Link>
          </>
          )
          }
          <Link href={'/products'} className={`${linkClass('/products')} px-4 py-3 text-gray-400 hover:text-black hover:font-bold mx-2 flex`}><IoCart className='mr-3 text-xl'/> Products</Link>
          {router.pathname !== '/products_simple' && <Link href={'/analytics'} className={`${linkClass('/analytics')} px-4 py-3 text-gray-400 hover:text-black hover:font-bold mx-2 flex`}><MdAnalytics className='mr-3 text-xl'/> Analytics</Link>}
          </div>
          <div onClick={logout} className='flex text-gray-400 hover:text-black hover:font-bold px-4 py-1.5 mx-2'><IoLogOut className='mr-3 text-xl'/> Sign Out</div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
