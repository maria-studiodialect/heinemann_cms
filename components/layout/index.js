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
    {router.pathname === '/copenhagen' && <div className="bg-[url('/CPH.jpg')] bg-center bg-cover bg-no-repeat w-screen h-[15vh] position absolute top-0 left-0"></div>}
    <div className="max-w-screen min-h-screen lg:flex">
      <Meta {...meta} />
      <Sidebar />
      <div className="mx-auto flex w-[100%] max-w-screen-xl flex-col mt-8">
        <main className={`flex-1 px-2 py-2 md:px-6 ${router.pathname === '/copenhagen' && 'mt-[8vh]'}`} {...props}>
          {children}
        </main>
        {router.pathname === '/' && <Footer />}
      </div>
    </div>
    </>
  )
}

export default Layout
