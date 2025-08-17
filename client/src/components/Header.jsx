import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useContextState } from '../context/Context'

const Header = () => {

    const { setInput, input } = useContextState()

    const inputRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setInput(inputRef.current.value)
    }

    const handleCancleSearch = () => {
        inputRef.current.value = ''
        setInput('')
    }

    return (
        <section className='relative py-8 px-4 lg:px-0'>
            <div className='absolute w-full top-0 left-0 md:-top-30 -z-1'>
                <img src={assets.gradientBackground} alt="bg_img" className='h-full w-full' />
            </div>
            <div className="container max-w-7xl mx-auto flex flex-col items-center gap-4 text-center ">
                <div className='bg-[#5044E51A] text-[#5044E5] px-6 py-1 flex gap-2 items-center border border-[#7A7A7A]/10 text-sm w-fit rounded-2xl'>
                    <p className='font-[400]'>New: AI feature integrated</p>
                    <img src={assets.star_icon} alt="" />
                </div>

                <h2 className='text-[#3B3B3B] font-medium text-4xl md:text-7xl md:leading-20'>Your own <span className='text-[#5044E5] italic'>blogging</span> <br /> platform</h2>

                <p className='text-[#3B3B3B] text-[10px] md:max-w-2xl md:text-sm font-[400] md:leading-7'>This is your space to think out loud, to share what matters, and to write without filters. Whether it’s one word or a thousand, your story starts right here.</p>

                <form
                    onSubmit={handleSubmit}
                    className='w-full md:w-2xl mt-4 md:mt-6 flex justify-between bg-white border border-black/30 rounded-[10px] py-1 px-1 text-sm overflow-hidden'>

                    <input
                        type="text"
                        className='w-full border-0 outline-0 ml-2'
                        placeholder='Search blogs'
                        ref={inputRef}
                    />
                    <div className='flex items-center gap-3'>
                        <button type='reset' onClick={() => handleCancleSearch()} className={`h-8 w-8 cursor-pointer ${input !== '' ? 'flex' : 'hidden'} `}><img src={assets.cross_icon} className='h-full' /></button>
                        <button type='submit' className='bg-[#5044E5] cursor-pointer rounded-lg px-6 md:px-10 py-2 md:py-3 w-fit border-0 outline-0 text-white'>Search</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Header