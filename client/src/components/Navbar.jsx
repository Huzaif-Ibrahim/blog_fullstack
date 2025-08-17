import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContextState } from '../context/Context'

const Navbar = () => {

    const { navigate , token} = useContextState()

    return (
        <nav className='max-w-7xl mx-auto'>
            <div className='px-4 lg:px-0 py-6 flex justify-between items-center'>
                <div className="logo w-36 md:w-44 h-auto">
                    <img src={assets.logo} alt="Logo" className='w-full h-full cursor-pointer' onClick={() => navigate('/')} />
                </div>

                <div className="button text-sm">
                    <button onClick={() => navigate('/admin')} className='flex gap-1 items-center px-8 py-2 rounded-4xl text-white bg-[#5044E5] cursor-pointer'>
                        { token ? 'Dashboard' : 'Login' }
                        <span className='w-3'><img src={assets.arrow} alt="Arrow" /></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar