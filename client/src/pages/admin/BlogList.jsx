import React, { useEffect, useState } from 'react'
import TableRow from '../../components/admin/TableRow'
import { useContextState } from '../../context/Context'

const BlogList = () => {

  const { axios } = useContextState()

  const [blogData, setblogData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogData = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/admin/blogs')
      data.success ? setblogData(data.blogs) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    fetchBlogData()
  },[])


  return (
    <div className='p-10 pb-20 bg-[#F6F8FF] w-full overflow-scroll scroll-auto'>
      <div className='flex flex-col'>
        <p className='text-lg font-medium text-[#696B80]'>All Blogs</p>
        <div className='mt-4 w-5xl overflow-hidden rounded-xl border border-[#D8D8D880]/50 bg-white'>


          {isLoading ? <div className="space-y-4 p-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 animate-pulse"
                >
                  {/* Comment content */}
                  <div className="flex-1 space-y-2">
                    {/* Username */}
                    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                    {/* Comment text (multiple lines) */}
                    <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div> :
              blogData.length > 0 ? <table className='w-full'>
                <thead className='text-base text-[#323232] border-b border-[#D8D8D880]'>
                  <tr className=''>
                    <th scope='col' className='p-3 text-left'>#</th>
                    <th scope='col' className='text-left'>BLOG TITLE</th>
                    <th scope='col' className='text-left'>DATE</th>
                    <th scope='col' className='text-left pl-8'>STATUS</th>
                    <th scope='col' className='text-left pl-8'>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {blogData.map((blog, indx) => {
                    return <TableRow key={indx} index={indx + 1} blog={blog} fetchData={fetchBlogData} />
                  })}

                </tbody>
              </table> : <p className='font-medium text-base text-[#323232]/80 p-4'>No Blogs Available.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default BlogList