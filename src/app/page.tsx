"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../../public/images/image-1.webp";

const ImageGallery = () => {
  const [selected, setSelected] = useState(false);

  const handleImageClick = () => {
    setSelected(!selected);
  };
  return (
    <div className="lg:w-[1440px] mx-auto border border-gray-200 p-3 my-5 h-[850px] rounded-xl bg-white shadow-xl">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl my-2">Gallery</h1>
          <h1 className="font-bold text-xl my-2">4 File Selected</h1>
        </div>
        <button className="my-2 text-red-600">Delete Image</button>
      </div>
      <div className="mt-5">
        <hr />
      </div>
      <div>
        <div className="relative group border w-[300px] rounded-xl">
          <Image
            className="group-hover:opacity-100 duration-700 rounded-xl"
            src={img}
            alt="image for gellary"
            height={200}
            width={300}
          ></Image>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 checked:opacity-10 transition-opacity duration-500"></div>

          <input
            type="checkbox"
            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 checked:opacity-100 cursor-pointer checkbox checkbox-accent"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
