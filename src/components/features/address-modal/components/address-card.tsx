import { ModalState } from '@/lib/types/modal/modal-state';
import { Address, UserAddress } from '@/lib/types/modal/user-address';
import { MapPin, PenLine, Phone, Trash } from 'lucide-react';
import React, { useState } from 'react';

// take payload for addresses endpoint and put on the props
type AddressCardProps = {
  setModal: (_model: ModalState) => void;
  setIsPopup: (_isPopup: boolean) => void;
  setAddress: (_address: Address) => void;
  data: Address;
};
export default function AddressCard({
  setModal,
  setIsPopup,
  data,
  setAddress,
}: AddressCardProps) {
  // Functions
  // Delete
  async function deleteHandel() {
    setIsPopup(true);
    setAddress(data);
  }

  // Update
  return (
    <div className='relative flex flex-col gap-4 border border-zinc-200 dark:border-zinc-600 rounded-xl hover:border-maroon-600 dark:hover:border-soft-pink-400 pl-4 my-4 pr-7 mt-8'>
      {/* Buttons */}
      {/* Edit Address */}
      <div
        className=' absolute -right-5 top-5 flex justify-center items-center border border-zinc-400  dark:border-zinc-700 p-2.5 bg-zinc-50 rounded-full dark:bg-zinc-400 cursor-pointer'
        onClick={() => setModal('update')}
      >
        <PenLine className=' text-zinc-800 dark:text-white size-4' />
      </div>

      {/* Delete Address */}
      {/* take id for address to delete it */}
      <div
        className=' absolute -right-5 bottom-5 flex justify-center items-center  border border-zinc-400  dark:border-zinc-700 p-2.5 text-white bg-red-600 rounded-full cursor-pointer'
        onClick={() => setIsPopup(true)}
      >
        <Trash className=' size-4' />
      </div>

      {/* Street */}
      <h2 className='absolute -top-6 left-3 text-2xl text-maroon-600 dark:text-soft-pink-400 font-semibold bg-white dark:bg-zinc-800  p-1.5'>
        {data?.street}
      </h2>

      {/* City & Phone */}
      <div className=' flex justify-between items-center mt-6'>
        {/* City */}
        <div className=' flex justify-start items-center gap-2.5'>
          <div className=' flex justify-center items-center p-2 text-white bg-emerald-600 rounded-full  '>
            <MapPin className=' size-5 ' />
          </div>

          <h3 className='text-2xl font-semibold'>{data?.city}</h3>
        </div>

        {/* Phone */}
        <div className=' flex justify-start items-center '>
          <Phone size={20} />
          <h3> {data?.phone} </h3>
        </div>
      </div>

      {/* Address */}
      <div className=' px-3 py-1 w-fit bg-zinc-100 dark:bg-zinc-500 rounded-full mb-5'>
        <h3> {data?.street} </h3>
      </div>
    </div>
  );
}
