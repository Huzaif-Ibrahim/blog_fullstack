import React, { useEffect, useState } from 'react'
import { assets, comments_data } from '../../assets/assets'
import moment from 'moment'
import { useContextState } from '../../context/Context'
import toast from 'react-hot-toast'

const Comments = () => {

  const { axios } = useContextState()

  const [commentsData, setcommentsData] = useState([])
  const [isFilter, setIsFilter] = useState('Approved')
  const [loading, setLoading] = useState(false)

  const filteredComment = commentsData.filter((comment) => {
    if (isFilter === 'Not Approved') return comment.isApproved === false
    return comment.isApproved === true
  })

  const fetchCommentsData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setcommentsData(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (e) => {
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: e })
      if (data.success) {
        toast.success(data.message)
        fetchCommentsData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleApprove = async (e) => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: e })
      if (data.success) {
        toast.success(data.message)
        fetchCommentsData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchCommentsData()
  }, [])

  return (
    <div className='p-8 bg-[#F6F8FF] w-full overflow-scroll pb-20'>
      <div className='flex flex-col w-5xl'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-medium text-[#696B80]'>Comments </p>

          <div className='flex items-center gap-4'>
            <button onClick={() => setIsFilter('Approved')} className={`border p-2 rounded-4xl ${isFilter === 'Approved' ? 'text-[#5044E5]' : 'text-[#696B80]'} `}>Approved</button>
            <button onClick={() => setIsFilter('Not Approved')} className={`border p-2 rounded-4xl ${isFilter === 'Not Approved' ? 'text-[#5044E5]' : 'text-[#696B80]'} `}>Not Approved</button>
          </div>
        </div>
        <div className='mt-4 w-full overflow-hidden rounded-xl border border-[#D8D8D880]/50 bg-white'>
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
            commentsData.length > 0 ?
              <table className='w-full'>
                <thead className='text-base font-medium text-[#323232] border-b border-[#D8D8D880]'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left'>BLOG TITLE & COMMENT</th>
                    <th scope='col' className='text-left'>DATE</th>
                    <th scope='col' className='text-left pr-6 pl-20'>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredComment.length > 0 ? filteredComment.map((c, i) => {
                    return <tr key={i} className='text-base font-normal text-[#696B80] border-t border-[#D8D8D880]'>
                      <td className='flex flex-col py-4 px-6 w-fit'>
                        <p className='mb-6'><span className='font-medium text-base text-[#323232]/80'>Blog: </span> {c.name}</p>
                        <p><span className='font-medium text-base text-[#323232]/80'>Name: </span> {c.name}</p>
                        <p><span className='font-medium text-base text-[#323232]/80'>Comment: </span> {c.comment}</p>
                      </td>
                      <td><p >{moment(c.createdAt).format('Do MMM YYYY')}</p></td>
                      <td className='py-4 pl-20 pr-4'>
                        <div className='flex items-center gap-4 '>
                          {
                            c.isApproved ? <p className='text-green-500 text-base font-medium'>Approved</p> : <button className='cursor-pointer' onClick={() => handleApprove(c._id)} ><img src={assets.tick_icon} alt="tick-icon" className='w-6' /></button>
                          }
                          <button onClick={() => handleDelete(c._id)} className='rounded-full cursor-pointer w-fit h-fit'>
                            <img src={assets.bin_icon} alt="cross-icon" className='w-6' />
                          </button>
                        </div>

                      </td>
                    </tr>
                  }) : <p className='p-6'>No Comments Available!</p>}

                </tbody>
              </table> : <p className='font-medium text-base text-[#323232]/80 p-4'>No Comments Available.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Comments