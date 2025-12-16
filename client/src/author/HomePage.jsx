import React from 'react'
import { Blogs } from '../components/Blogs'

export const HomePage = () => {
  return (
    <div className="py-4">
      <h3 className="text-center fw-bold mb-4">Latest Stories</h3>
      <Blogs />
    </div>
  )
}
