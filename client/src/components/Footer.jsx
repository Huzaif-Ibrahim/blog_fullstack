import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <section className='px-4 lg:px-0 bg-[#F8F9FD]'>

            <div className="container max-w-7xl mx-auto py-8 border-b border-black/30 grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-2">
                <div className='flex flex-col gap-2 w-[70%]'>
                    <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-36 md:w-44 h-auto' />
                    <p className='text-[#373737]/90 text-base font-normal'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
                </div>


                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                    {footer_data.map((e,indx) => {
                        return <div key={indx} className='flex flex-col gap-1'>
                            <h5 className='font-medium text-black'>{e.title}</h5>
                            <ul className='flex flex-col text-[#373737]/90 text-base font-normal'>
                                {e.links.map((l,i) => {
                                    return <li key={i} className='cursor-pointer hover:text-black transition-all duration-300'>
                                        {l}
                                    </li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
            </div>

            <div className='py-4'>
                    <p className='text-[#373737] text-base font-normal  text-center'>
                        Copyright 2025 © QuickBlog All Right Reserved.
                    </p>
            </div>

        </section>
    )
}

export default Footer