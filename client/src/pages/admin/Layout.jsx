import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import LayoutC from '../../components/admin/Layout'
import toast from 'react-hot-toast'
import { useContextState } from '../../context/Context'

const Layout = () => {

    const navigate = useNavigate()
    const { setToken } = useContextState()

    const handleLogout = () => {
        try {
            setToken(null)
            navigate('/')
            toast.success('Logged out successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <nav className='px-4 lg:px-8 border-b border-[#D8D8D8]'>
                <div className="container py-2 lg:py-4 flex justify-between">
                    <img src={assets.logo} alt="Logo" className='cursor-pointer w-36 md:w-44' onClick={() => navigate('/')} />

                    <button onClick={handleLogout} className='px-8 py-2 rounded-4xl text-white bg-[#5044E5] cursor-pointer'>
                        Logout
                    </button>
                </div>
            </nav>

            <div className='h-[calc(100vh-75px)] flex'>
                    <LayoutC />
                    <Outlet />
            </div>
        </>
    )
}

export default Layout