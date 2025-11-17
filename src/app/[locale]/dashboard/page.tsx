import React from 'react'
import Statistics from './_components/statistics'
import Categories from './_components/categories'

export default function page() {
  return (
    <div className='flex gap-6 bg-zinc-50 ms-20 min-h-screen p-7'>
      <Statistics/>
      <Categories/>
    </div>
  )
}
