import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Layout = () => {
  return (
    <>
        <div className='text-[#515151] text-lg font-normal sm:w-full lg:w-60 h-full border-r border-[#D8D8D8] py-4 flex flex-col'>
            <NavLink end={true} to='/admin' className={({ isActive }) => {
                return `px-8 py-4 flex ${isActive && 'border-r-6 border-[#5F6FFF] bg-[#F2F3FF]'}`
            }} >
                <img src={assets.home_icon} alt='Dashboard_icon' className='w-5 mr-2' />
                <p>Dashboard</p>
            </NavLink>

            <NavLink end={true} to='addblog' className={({ isActive }) => {
                return ` px-8 py-4 flex w-full ${isActive && 'border-r-6 border-[#5F6FFF] bg-[#F2F3FF]'}`
            }} >
                <img src={assets.add_icon} alt='Dashboard_icon' className='w-5 mr-2' />
                <p>Add Blogs</p>
            </NavLink>

            <NavLink end={true} to='bloglist' className={({ isActive }) => {
                return ` px-8 py-4 flex w-full ${isActive && 'border-r-6 border-[#5F6FFF] bg-[#F2F3FF]'}`
            }} >
                <img src={assets.list_icon} alt='Dashboard_icon' className='w-5 mr-2' />
                <p>Blogs List</p>
            </NavLink>

            <NavLink end={true} to='comments' className={({ isActive }) => {
                return ` px-8 py-4 flex w-full ${isActive && 'border-r-6 border-[#5F6FFF] bg-[#F2F3FF]'}`
            }} >
                <img src={assets.comment_icon} alt='Dashboard_icon' className='w-5 mr-2' />
                <p>Comments</p>
            </NavLink>
        </div>
    </>
  )
}

export default Layout