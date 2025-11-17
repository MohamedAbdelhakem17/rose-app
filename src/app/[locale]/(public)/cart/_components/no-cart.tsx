import Image from 'next/image'
import React from 'react'

export default function NoCart() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 border rounded-lg border-zinc-200 min-h-96 py-3 '>
      <Image src='/images/no-cart.webp' alt='no cart image' width={250} height={214}/>
      <p className='text-zinc-400 text-lg'>Your cart is empty, wanna try shopping?</p>
    </div>
  )
}
