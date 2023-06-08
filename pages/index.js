import Link from 'next/link'
import Layout from '../components/layout'
import { getServerSession } from 'next-auth'

function Index() {
  return (
  <div class="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-14 w-auto" src="/eu-logo.svg" alt="Your Company"/>
    </div>
    <form class=" bg-white shadow-lg p-8 rounded-xl" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div class="rounded-md">
        <div>
          <label for="email-address" className='font-bold text-sm'>Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="px-5 mb-5 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        <div>
          <label for="password" className='font-bold text-sm'>Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="px-5 mb-5 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-gray-400 hover:text-black">Forgot your password?</a>
        </div>
      </div>

      <div>
        <Link href='/products'><button type="submit" class="group relative flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Sign in
        </button></Link>
      </div>
    </form>
  </div>
</div>
  )
}

export default Index

