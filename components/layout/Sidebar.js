import clsx from 'clsx'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from '../common/Links'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {IoBagHandle, IoCart, IoMap, IoLogOut } from 'react-icons/io5'
import {ImUser} from 'react-icons/im'
import {MdAnalytics} from 'react-icons/md'
import { AuthContext } from '../../stores/authContext'


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen((prev) => !prev)
  const router = useRouter();
  const {user, login, logout, authReady} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])
  

  const linkClass = (href) => {
    return router.pathname === href ? 'font-bold text-black' : 'text-gray-400';
  };

  const handleLogout = () => {
    logout()
    router.push('/') // Redirect to the home page after sign out
  }

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
          'h-screen border-r-1 absolute w-screen p-3  transition-all duration-300 ease-in-out lg:fixed lg:block lg:max-w-[15vw] lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav
          onClick={handleToggle}
          className={clsx('flex h-full justify-between  flex-col px-3 py-6 bg-white rounded-xl shadow lg:border-gray-200')}
        >
          <div className='flex flex-col items-center'>
          <Link href={'/'}>
            <div className='relative w-16 h-fit mx-auto'>
              <Image src='/logo_square.svg' width={443} height={417} alt='logo' priority />
            </div>
          </Link>
          {user && (
            <div className='mt-10 flex'>
            <div><ImUser className='mr-3 text-xl'/></div>
            <div>
              <div className='text-sm font-bold'>{user?.user_metadata.full_name}</div>
              {/*<div className='text-sm font-bold'>Username</div>*/}
              <div className='text-sm text-gray-400 capitalize'>{user?.app_metadata.roles[0]}</div>
            </div>
            </div>
          )
          }
          </div>
          <div  className='mx-auto'>
          {role === 'admin' &&           <Link href={'/locations'} className={`${linkClass('/locations')} px-4 py-3 hover:text-black hover:font-bold mx-2 flex`}><IoMap className='mr-3 text-xl'/> Locations</Link>}  
          {role === 'copenhagen' &&           <Link href={'/copenhagen'} className={`${linkClass('/copenhagen')} px-4 py-3 hover:text-black hover:font-bold mx-2 flex`}><IoMap className='mr-3 text-xl'/> CPH</Link>}  

          <Link href={'/brands'} className={`${linkClass('/brands')} px-4 py-3 hover:text-black hover:font-bold mx-2 flex`}><IoBagHandle className='mr-3 text-xl'/> Brands</Link>
          <Link href={'/products'} className={`${linkClass('/products')} px-4 py-3 hover:text-black hover:font-bold mx-2 flex`}><IoCart className='mr-3 text-xl'/> Products</Link>
          <div className={`${linkClass('/analytics')} px-4 py-3 hover:text-black hover:font-bold mx-2 flex`}><MdAnalytics className='mr-3 text-xl'/> Analytics</div>
          </div>
          <div onClick={handleLogout} className='flex text-gray-400 hover:text-black hover:font-bold px-4 py-1.5 mx-auto cursor-pointer'><IoLogOut className='mr-3 text-xl'/> Sign Out</div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
