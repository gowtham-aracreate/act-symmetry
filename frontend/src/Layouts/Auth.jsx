import React from 'react'
const Auth = ({ children }) => {

  return (
    <div>
      <header className='fixed top-0 left-0 w-full h-[65px] bg-gradient-to-r from-blue-500 to-teal-400 shadow-md flex items-center justify-between px-6'>
        <img className="w-[52px] h-[52px]" src="/path/to/logo.png" alt="logo" />
        <nav className="flex space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="/about" className="text-white hover:text-gray-200">About</a>
          <a href="/contact" className="text-white hover:text-gray-200">Contact</a>
        </nav>
      </header>

      <main className="pt-[65px]">
        {children}
      </main>
    </div>
  )
}

export default Auth