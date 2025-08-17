import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import HomeBlogs from '../components/HomeBlogs'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <HomeBlogs />
        <NewsLetter />
        <Footer />
    </div>
  )
}

export default Home