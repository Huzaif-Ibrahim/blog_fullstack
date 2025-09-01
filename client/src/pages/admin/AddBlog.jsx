import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import { Quill } from 'react-quill'
import toast from 'react-hot-toast'
import { useContextState } from '../../context/Context'
import { parse } from 'marked'

const AddBlog = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const { axios } = useContextState()

  const [adding, setAdding] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [file, setFile] = useState(false)
  const [category, setCategory] = useState('Technology')
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      const blog = {
        title: blogTitle,
        subtitle: subTitle,
        description: quillRef.current.root.innerHTML,
        isPublished: isChecked,
        category,
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', file)

      const { data } = await axios.post('/api/blog/add', formData)

      if (data.success) {
        toast.success(data.message)
        setBlogTitle('')
        setFile(false)
        setSubTitle('')
        setIsChecked(false)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setAdding(false)
    }

  }

  const generateContent = async () => {
    if (!blogTitle) return toast.error('Please Enter the Title.')
    try {
      setGenerating(true)
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate-content', { prompt: blogTitle })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.message(error.message)
    } finally {
      setLoading(false)
      setGenerating(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <div className='p-10 bg-[#F6F8FF] w-full overflow-scroll'>
      <div className="w-5xl bg-white overflow-hidden rounded-xl p-8 border border-[#D8D8D880]/50 ">
        <form onSubmit={(e) => handleSubmit(e)} className='w-4xl flex flex-col gap-6 text-[#252525B2] '>

          <div className='flex flex-col gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Upload thumbnail</p>
            <label htmlFor="fileInput" className='text-lg font-normal rounded-lg h-fit w-fit' >
              <img src={!file ? assets.upload_area : URL.createObjectURL(file)} alt="Upload_here" className='h-full w-full ' />
            </label>
            <input
              type="file"
              name="image"
              id="fileInput"
              className='hidden'
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Blog title</p>
            <input
              type="text"
              name="title"
              className='w-full outline-0 p-2 border border-[#2525254D]'
              placeholder='Type Here'
              required
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Sub title</p>
            <input
              type="text"
              name="subtitle"
              className='w-full outline-0 p-2 border border-[#2525254D]'
              placeholder='Type Here'
              required
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Blog description</p>

            <div className='h-72 pb-10 w-full relative'>
              <div ref={editorRef}></div>
              <button disabled={loading} onClick={generateContent} className='absolute bottom-2 right-2 bg-[#4C4C4C] rounded-lg px-6 py-2 cursor-pointer hover:bg-[#4C4C4C]/90 text-white'>
                {
                  generating ? <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div> : 'Generate with AI'
                }
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Blog Category</p>
            <select
              name="category"
              className='outline-0 p-2 border border-[#2525254D] w-fit rounded-lg'
              onChange={(e) => setCategory(e.target.value)}
            >
              {
                blogCategories.slice(1).map((elem, indx) => {
                  return <option value={elem} onChange={(e) => setCategory(e.target.value)} key={indx} >{elem}</option>
                })
              }
            </select>
          </div>

          <div className='flex gap-2'>
            <p className='text-[#252525B2] text-lg font-normal'>Publish Now</p>
            <input type='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className='scale-105 outline-0 cursor-pointer' />
          </div>

          <button disabled={adding} type="submit" className='bg-[#5044E5] rounded-lg px-4 py-2 w-fit text-white outline-0' >
            {
              adding ? <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </div> : 'Add Blog'
            }
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddBlog