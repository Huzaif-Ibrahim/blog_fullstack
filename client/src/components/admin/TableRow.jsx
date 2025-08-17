import React from 'react'
import Moment from 'moment'
import { assets } from '../../assets/assets'
import { useContextState } from '../../context/Context'
import toast from 'react-hot-toast'

const TableRow = ({ blog, index, fetchData }) => {

    const {title, createdAt, isPublished} = blog
    const { axios } = useContextState()

    const deleteBlog = async (e) => {
      const approve = window.confirm('Are you sure to delete?')
      if(!approve) return
      try {
        const { data } = await axios.post('/api/blog/delete', { id : e })
        if(data.success){
          toast.success(data.message)
          fetchData()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const unPublishBlog = async (e) => {
      try {
        const { data } = await axios.post('/api/blog/toggle-ispublished', { id : e })
        if(data.success){
          toast.success(data.message)
          fetchData()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <tr className='text-base font-normal text-[#696B80] border-t border-[#D8D8D880] p-4'>
        <td className='p-4'>{index}</td>
        <td>{title}</td>
        <td>{Moment(createdAt).format('Do MMM YYYY')}</td>
        <td className={`${isPublished ? 'text-green-500' : 'text-red-500' } pl-8`}>{isPublished ? 'Published' : 'Unpublished' }</td>
        <td className='flex items-center gap-4 pl-8 pt-3'>
            <button onClick={() => unPublishBlog(blog._id)} className='cursor-pointer border border-[#696B80] py-1 px-2'>{isPublished ? 'Unpublish' : 'Publish' }</button>
            <button onClick={() => deleteBlog(blog._id)} className='rounded-full cursor-pointer w-fit h-fit'>
                <img src={assets.cross_icon} alt="cross-icon" className='w-8' />
            </button>
        </td>
    </tr>
  )
}

export default TableRow