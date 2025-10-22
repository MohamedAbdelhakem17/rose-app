'use client';

import Image from 'next/image';
import React, { useState } from 'react';

//--- Component Props ---
interface ProductImagesProps {
  imgCover: string;
  images: string[];
}
export default function ProductImages({
  imgCover,
  images,
}: ProductImagesProps) {
  //--- Active Image State ---
  const [activeImage, setActiveImage] = useState<string>(imgCover);

  //--- Handle Active Image Change ---
  const handelActiveImage = (imgSrc: string) => {
    setActiveImage(imgSrc);
  };

  return (
    //--- Product Gallery ---
    <section className='w-[605px] h-full flex flex-col gap-2.5'>
      {/* --- Selected Image --- */}
      <div className='selected-image  h-[402px] relative'>
        <Image
          src={activeImage}
          fill
          alt='product image'
          className='object-cover rounded-lg'
        />
      </div>
      <div className=' flex gap-2.5 '>
        {/* --- Cover Images --- */}
        <button
          onClick={() => handelActiveImage(imgCover)}
          className={`thumbnail-image w-[91px] h-[111px] relative flex-shrink-0 rounded-lg overflow-hidden ${
            activeImage !== imgCover
              ? 'after:absolute after:inset-0 after:bg-[#0000004D] after:rounded-lg'
              : ''
          }`}
        >
          <Image
            src={imgCover}
            fill
            alt='product image'
            className={`object-cover rounded-lg ${
              activeImage === imgCover ? 'border-2 border-maroon-600' : ''
            }`}
          />
        </button>
        {/* --- Other Images --- */}
        {images.map((img, idx) => (
          <button
            onClick={() => handelActiveImage(img)}
            key={idx}
            className={`thumbnail-image w-[91px] h-[111px] relative flex-shrink-0 rounded-lg overflow-hidden ${
              activeImage !== img
                ? 'after:absolute after:inset-0 after:bg-[#0000004D] after:rounded-lg'
                : ''
            }`}
          >
            <Image
              src={img}
              fill
              alt='product image'
              className={`object-cover rounded-lg ${
                activeImage === img ? 'border-2 border-maroon-600' : ''
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
