import React from 'react';
import CartHeader from './_components/cart-header';
import CartItems from './_components/cart-items';
import ContinueShopping from './_components/continue-shopping-btn';
import { fetchCart } from '@/lib/apis/cart/cart';
import NoCart from './_components/no-cart';

export default async function page() {
 
  const payload = await fetchCart();
  const {numOfCartItems, cart} = payload;
  const {cartItems} = cart;
  console.log(payload);
  

  return (
    <section className='flex flex-col gap-6'>
      {/* // Cart Header */}
      <CartHeader numberOfItem={numOfCartItems > 0 ? numOfCartItems : 0}/>
      {/* // check if cart item not empty */}
      {cart && numOfCartItems > 0 ? <CartItems items={cartItems} /> : <NoCart /> }
      {/* Continue Shopping Button */}
      <ContinueShopping />
    </section>
  );
}
