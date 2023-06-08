import Link from 'next/link'
import Layout from '../components/layout'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../stores/authContext';

export default function Index() {
  const {user, login} = useContext(AuthContext)
  console.log(user)
  return (
  <div class="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-14 w-auto" src="/eu-logo.svg" alt="Your Company"/>
      </div>
      <div class=" bg-white shadow-lg p-8 rounded-xl">
        <div>
          <div onClick={login} class="group relative flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </div>
        </div>
      </div>
    </div>
  
</div>
  )
}


