import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import Moment from 'moment'
import userIcon from '../assets/user_icon.svg'
import Loading from '../components/Loading'
import { useContextState } from '../context/Context'
import toast from 'react-hot-toast'


const Blog = () => {

  const { id } = useParams()

  const { axios } = useContextState()

  const [submiting, setSubmiting] = useState(false)
  const [blogData, setBlogData] = useState(null)
  const [comments, setComments] = useState([])
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setBlogData(data.blog) : toast.error(data.message)
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId : id })
      console.log(data)
      if(data.success && Array.isArray(data.comments)){
        setComments(data.comments)
      }else{
        setComments([])
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmiting(true)
    try {
      const { data } = await axios.post('/api/blog/add-comment', { name: titleInput, comment: contentInput, blog: id })

      if(data.success){
        toast.success(data.message)
        setContentInput('')
        setTitleInput('')
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
      setSubmiting(false)
    }
  }

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value)
  }

  const handleContentInput = (e) => {
    setContentInput(e.target.value)
  }

  useEffect(() => {
    fetchBlog()
    fetchComments()
    scrollTo(0, 0)
  }, [])

  if (loading) {
    return <>
      <Navbar />
      <Loading />
    </>
  }

  return (
    <>
      <Navbar />

      <div className='px-4 lg:px-0 flex flex-col py-16'>

        <div className="texts max-w-3xl mx-auto text-center flex flex-col items-center gap-0 md:gap-2 lg:gap-4">
          <p className='text-[#5044E5] font-medium text-lg'>Published on {Moment(blogData.createdAt).format('MMM Do YYYY') || 'Unknown'}</p>
          <h1 className='text-5xl font-semibold lg:leading-16 text-[#3B3B3B]'>{blogData.title}</h1>
          <h2 className='text-[#4E4E4E] font-normal text-lg' dangerouslySetInnerHTML={{ __html: blogData.subTitle }} ></h2>
          <img src={assets.gradientBackground} alt="bg_gradient" className='absolute -z-1 top-0 left-0 md:-top-30 w-full' />
        </div>

        <div className="img max-w-5xl mx-auto w-full py-6 lg:my-12">
          <img src={blogData.image} alt={blogData.title} className='w-full h-full rounded-xl' />
        </div>

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: blogData.description }} >
        </div>

        <div className="comments max-w-3xl mx-auto w-full flex flex-col gap-4 my-6">
          <p className='text-sm text-[#3B3B3B] font-semibold'>Comments ({comments.length})</p>
          {comments ? comments.map((item, indx) => {
            return <div key={indx} className='max-w-xl p-3 flex flex-col gap-2 text-[#4E4E4E] border border-[#c5e6fe] bg-[#f0f9ff]'>
              <div className='flex gap-2'>
                <img src={userIcon} alt="userIcon" className='h-6' />
                <p>{item.name}</p>
              </div>

              <div className='flex justify-between pl-8'>
                <p className='text-sm'>{item.comment}</p>
                <p className='text-sm'>{Moment(item.createdAt).fromNow()}</p>
              </div>
            </div>
          }) : <p>No comments Available..</p> }
        </div>

        <div className='my-6 max-w-3xl mx-auto w-full'>
          <p className='text-sm text-[#3B3B3B] font-semibold mb-4'>Add your comment</p>
          <form
            className='flex flex-col gap-3 max-w-xl'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder='Name'
              className='w-full border border-[#4E4E4E]/50 outline-0 p-2'
              value={titleInput}
              onChange={(e) => handleTitleInput(e)}
              required
            />
            <textarea
              placeholder='Comment'
              className='w-full border border-[#4E4E4E]/50 outline-0 p-2'
              value={contentInput}
              onChange={(e) => handleContentInput(e)}
              required
            ></textarea>
            <button className='bg-[#5044E5] cursor-pointer rounded-md px-2 md:px-6 py-2 w-fit border-0 outline-0 text-white'>
              {
                submiting ? 'Submiting' : 'Submit'
              }
            </button>
          </form>
        </div>

        <div className='my-6 max-w-3xl mx-auto w-full'>
          <p className='text-sm text-[#3B3B3B] font-semibold mb-4'>Share this on social media</p>
          <div className='flex gap-2'>
            <img src={assets.twitter_icon} alt="Email icon" className='h-12 cursor-pointer' />
            <img src={assets.facebook_icon} alt="facebook_icon" className='h-12 cursor-pointer' />
            <img src={assets.googleplus_icon} alt="googleplus_icon" className='h-12 cursor-pointer' />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Blog