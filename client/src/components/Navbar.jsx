import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[80px] fixed z-50 flex justify-between items-center px-14'>
        <h1 className='font-bruno text-xl bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent'>BharatNetra</h1>
        <ul className='flex justify-center items-center gap-10'>
            <li className='text-lg cursor-pointer'>Home</li>
            <li className='text-lg cursor-pointer'>About</li>
            <li className='text-lg cursor-pointer'>Tools</li>
            <li className='text-lg cursor-pointer'>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar