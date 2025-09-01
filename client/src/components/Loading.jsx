import React from 'react'

const Loading = () => {
  return (
     <div className="min-h-screen flex py-14 justify-center bg-white px-4">
      <div className="max-w-4xl w-full space-y-2 md:space-y-6 animate-pulse text-center">
        {/* Date */}
        <div className="h-8 w-48 bg-gray-300 mx-auto rounded"></div>

        {/* Heading */}
        <div className="h-18 w-3/4 bg-gray-400 mx-auto rounded"></div>

        {/* Subheading */}
        <div className="h-6 w-2/3 bg-gray-300 mx-auto rounded"></div>

        {/* Image */}
        <div className="w-full h-108 bg-gray-300 rounded-xl mt-12"></div>
      </div>
    </div>
  )
}

export default Loading