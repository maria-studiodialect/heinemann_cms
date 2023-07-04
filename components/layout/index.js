import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import Meta from './Meta'
import Sidebar from './Sidebar'
import useAuthentication from '../../hooks/useAuthentication'

const Layout = ({ meta, children, ...props }) => {
  const router = useRouter()

  const user = useAuthentication();
  
  if (!user) {
      return null; // or a loading indicator, login form, or any other UI element
  }
  return (
    <>
    <div className="max-w-screen min-h-screen lg:flex">
      <Meta {...meta} />
      <div className='w-[16vw]'><Sidebar /></div>
      <div className={`mx-auto flex w-[100%]  flex-col mt-3`}>
        <main className={`flex-1 px-2 py-2 md:px-6`} {...props}>
          {children}
        </main>
        {router.pathname === '/' && <Footer />}
      </div>
    </div>
    </>
  )
}

export default Layout
