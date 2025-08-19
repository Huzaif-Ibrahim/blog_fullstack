import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import TableRow from '../../components/admin/TableRow'
import { useContextState } from '../../context/Context'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { axios } = useContextState()
  const [loading, setLoading] = useState(false)

  const [blogData, setBlogData] = useState({
    recentBlogs: [],
    blogs: 0,
    comments: 0,
    drafts: 0,
  })

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/admin/dashboard')
      data.success ? setBlogData({ recentBlogs : data.DashboardData.blogs, blogs : data.DashboardData.totalBlogs, comments : data.DashboardData.totalComments, drafts : data.DashboardData.draftBlogs }) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='p-10 bg-[#F6F8FF] w-full'>

      <div className='flex flex-wrap gap-4 w-full'>

        <div className='group flex items-center rounded-lg shadow-2xs p-4 w-56 bg-white border border-black/5'>
          <img src={assets.dashboard_icon_1} alt="dashboard_icon_1" className='mr-4 w-16 group-hover:scale-115 transition-all duration-500' />
          <div className='flex flex-col gap-0 justify-center'>
            <div className='text-2xl text-[#515151] font-medium'>{!loading ? <p>{blogData.blogs}</p> : <div className="h-6 w-8 bg-gray-300 rounded animate-pulse"></div> }</div>
            <p className='text-base text-[#8893B0] font-normal'>Blogs</p>
          </div>
        </div>
        <div className='group flex items-center rounded-lg shadow-2xs p-4 w-56 bg-white border border-black/5'>
          <img src={assets.dashboard_icon_2} alt="dashboard_icon_2" className='mr-4 w-16 group-hover:scale-115 transition-all duration-500' />
          <div className='flex flex-col gap-0 justify-center'>
            <div className='text-2xl text-[#515151] font-medium'>{!loading ? <p>{blogData.comments}</p> : <div className="h-6 w-8 bg-gray-300 rounded animate-pulse"></div> }</div>
            <p className='text-base text-[#8893B0] font-normal'>Comments</p>
          </div>
        </div>
        <div className='group flex items-center rounded-lg shadow-2xs p-4 w-56 bg-white border border-black/5'>
          <img src={assets.dashboard_icon_3} alt="dashboard_icon_3" className='mr-4 w-16 group-hover:scale-115 transition-all duration-500' />
          <div className='flex flex-col gap-0 justify-center'>
            <p className='text-2xl text-[#515151] font-medium'>{!loading ? <p>{blogData.drafts}</p> : <div className="h-6 w-8 bg-gray-300 rounded animate-pulse"></div> }</p>
            <p className='text-base text-[#8893B0] font-normal'>Drafts</p>
          </div>
        </div>

      </div>


      <div className="table mt-8">
        <div className="flex items-center ml-4 gap-2">
          <img src={assets.dashboard_icon_4} alt="dashboard_icon_4" className='w-6' />
          <p className='text-lg font-medium text-[#323232]'>Latest Blogs</p>
        </div>

        <div className='mt-4 w-5xl overflow-hidden rounded-xl border border-[#D8D8D880]/50 bg-white'>
          {loading ? <div className="space-y-4 p-6">
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
            blogData.blogs > 0 ? <table className='w-full'>
          <thead className='text-base text-[#323232] border-b border-[#D8D8D880]'>
            <tr>
              <th scope='col' className='p-3 text-left'>#</th>
              <th scope='col' className='text-left'>BLOG TITLE</th>
              <th scope='col' className='text-left'>DATE</th>
              <th scope='col' className='text-left pl-8'>STATUS</th>
              <th scope='col' className='text-left pl-8'>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {blogData.recentBlogs.map((blog, indx) => {
              return <TableRow key={indx} index={indx + 1} blog={blog} fetchData = {fetchDashboard} />
            })}

          </tbody>
        </table> : <p className='font-medium text-base text-[#323232]/80 p-4'>No Data Available.</p>
          }
        </div>
      </div>



    </div>
  )
}

export default Dashboard