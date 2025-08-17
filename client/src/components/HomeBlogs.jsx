import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion } from 'motion/react'
import { useContextState } from '../context/Context'

const HomeBlogs = () => {

  const [category, setCategory] = useState('All')
  const { blogs, input, navigate, homeLoading, setHomeLoading } = useContextState()

  const filteredData = () => {
    if (input === '') return blogs
    return blogs.filter((blog) => {
      return blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase())
    })
  }

  return (
    <section className='py-4 md:py-8 px-4 lg:px-0'>

      <div className="container max-w-7xl flex flex-col items-center mx-auto">

        <div className="filter flex gap-0 md:gap-2 text-[#3B3B3B] mb-12">
          {blogCategories.map((c, i) => {
            return <div className={`relative text-sm md:text-base cursor-pointer px-3 md:px-6 py-1 transition-all duration-500 ${category === c && 'text-white'}`} key={i} onClick={() => setCategory(c)}><p>{c}</p>
              {category === c && (
                <motion.div
                  layoutId='underline'
                  trasition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute inset-0 -z-1 bg-[#5044E5] rounded-2xl h-full w-full'>

                </motion.div>
              )}
            </div>
          })}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>

          {
            homeLoading ? (
              [...Array(6)].map((_, i) => {
                return <div key={i} className="h-[350px] w-[300px] rounded-2xl overflow-hidden bg-white border border-neutral-200">
                  <div className="w-full h-full animate-pulse flex flex-col items-start">
                    {/* Date */}
                    <div className="h-1/2 w-full mb-6 bg-gray-300 rounded"></div>

                    <div className='w-full px-4'>
                      <div className="h-6 mb-4 w-3/4 bg-gray-400 rounded"></div>
                      <div className="h-6 mb-1 w-full bg-gray-300 rounded"></div>
                      <div className="h-6 mb-1 w-full bg-gray-300 rounded"></div>
                      <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              })) : filteredData().filter((blog) => category === 'All' ? true : blog.category === category).length > 0 ?

              filteredData().filter((blog) => category === 'All' ? true : blog.category === category).map((e, i) => {
                return <div onClick={() => navigate(`/blog/${e._id}`)} key={i} className='max-h-[350px] flex flex-col justify-betweenp-0 h-full w-full rounded-2xl overflow-hidden shadow cursor-pointer hover:scale-102 transition-all duration-300'>
                  <img src={e.image} alt={e.title} className='aspect-video' />

                  <div className='w-full px-4 py-6 flex flex-col gap-2'>
                    <div className='bg-[#5044E51A] text-[#5044E5] px-2 py-1 text-sm w-fit rounded-2xl'>
                      <p className='font-[400]'>{e.category}</p>
                    </div>
                    <p className='font-medium text-xl text-[#404040] leading-7'>{e.title}</p>
                    <p className='font-[400] text-sm text-[#636363]' dangerouslySetInnerHTML={{ __html: e.description.slice(0, 80) }}></p>
                  </div>
                </div>
              }) : <div className='flex items-center justify-center'><p className='text-xl'>🙁 Sorry! No Blog Available</p></div>
          }
        </div>
      </div>

    </section>
  )
}

export default HomeBlogs