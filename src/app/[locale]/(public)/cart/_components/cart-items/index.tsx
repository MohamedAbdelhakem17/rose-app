import React from 'react'
import CartElement from './components/cart-element'
import { CartItem } from '@/lib/apis/cart/cart';

interface CartItemsProps {
  items: CartItem[];
}

export default function CartItems({items}: CartItemsProps) {
  ; // Example array to represent cart items
  return (

    <section className='border rounded-lg p-5 border-zinc-200 '>
      {items.map((item, index) => (
        <div key={item._id}>
          <CartElement CartItem={item} />
          {index !== items.length - 1 && (
            <div className='h-px bg-zinc-200 my-5'></div>
          )}
        </div>
      ))}
      
    </section>
  )
}
