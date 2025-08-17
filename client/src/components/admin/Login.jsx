import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useContextState } from '../../context/Context'
import toast from 'react-hot-toast'

const Login = () => {

  const { setToken, axios } = useContextState()

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/admin/login', { email : emailInput, password : passwordInput })
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEmail = (e) => {
    setEmailInput(e.target.value)
  }

  const handlePassword = (e) => {
    setPasswordInput(e.target.value)
  }

  return (
    <div className='h-screen flex items-center justify-center px-4 lg:px-0'>
      <div className='border border-[#5F6FFF]/30 rounded-xl flex flex-col px-6 py-12 shadow w-96'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-1'><span className='text-[#5044E5]'>Admin</span> Login</h2>
          <p className='text-lg font-normal text-[#515151] leading-tight'>Enter your credentials to access the admin panel</p>
        </div>

        <form className='flex flex-col gap-2 w-full' onSubmit={(e) => handleSubmit(e)} >
          <label
            htmlFor="email"
            className='text-[#515151]'>Email
          </label>
          <input
            type="email"
            id="email"
            required
            className='border-b-2 border-[#D8D8D8] outline-0'
            value={emailInput}
            onChange={(e) => handleEmail(e)}
          />

          <label
            htmlFor="password"
            className='text-[#515151]'
          >Password
          </label>
          <input
            type="password"
            id="password"
            required
            className='border-b-2 border-[#D8D8D8] outline-0'
            value={passwordInput}
            onChange={(e) => handlePassword(e)}
          />
          <button
            type="submit"
            className='bg-[#5044E5] cursor-pointer border-0 outline-0 mt-4 rounded-md w-full py-2 text-white'>Login
          </button>

        </form>

        <NavLink className='text-[#5044E5] text-sm font-medium mt-2' to={'/'}>
          Return to Home page
        </NavLink>

      </div>
    </div>
  )
}

export default Login