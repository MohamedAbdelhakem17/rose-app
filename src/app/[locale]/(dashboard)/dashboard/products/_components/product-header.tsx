import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProductHeader() {
  return (
    <div className='flex justify-between items-center'>
      <h2 className="text-2xl font-semibold text-zinc-800">
        All Products
      </h2>
      
      <Link href='#' className='flex items-center gap-2.5 font-medium justify-center p-2.5  rounded-md bg-maroon-600 hover:bg-maroon-700 text-white'>
        <Plus size={22}/>
        Add a new product
      </Link>
      
      </div>
  )
}
