import React, { useState } from 'react'

const NewsLetter = () => {

    const [handleInput, setHandleInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setHandleInput('')
    }

    const handleSetInput = (e) => {
        setHandleInput(e.target.value)
    }

    return (
        <section className='px-4 lg:px-0 py-36 md:py-44'>
            <div className="container max-w-7xl mx-auto text-center flex flex-col items-center gap-2 md:gap-4">
                <h3 className='text-[#3B3B3B] font-medium text-xl md:text-4xl'>Never Miss a Blog!</h3>
                <p className='text-[#9A9A9A] text-[10px] md:max-w-2xl md:text-sm font-[400]'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='w-full md:w-2xl mt-4 md:mt-6 flex justify-between bg-white border border-black/30 rounded-md text-sm overflow-hidden'>
                    <input
                        value={handleInput}
                        onChange={(e) => handleSetInput(e)}
                        type="email" 
                        className='w-full border-0 outline-0 ml-2' 
                        placeholder='Enter your email id' 
                        required    
                    />
                    <button className='bg-[#5044E5] cursor-pointer rounded-r-md px-6 md:px-10 py-2 md:py-3 w-fit border-0 outline-0 text-white'>Subscribe</button>
                </form>
            </div>
        </section>
    )
}

export default NewsLetter