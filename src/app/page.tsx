"use client";
import React, { useState, DragEvent } from "react";
import Image from "next/image";
import img from "../../public/images/image-1.webp";

const ImageGallery = () => {
  const [selected, setSelected] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result as string);
          if (newImages.length === files.length) {
            setImageList([...imageList, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
      setSelectedFiles(files);
    }
  };

  const handleDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e: DragEvent, index: number) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("index");
    const newImageList = [...imageList];
    const [draggedImage] = newImageList.splice(Number(sourceIndex), 1);
    newImageList.splice(index, 0, draggedImage);
    setImageList(newImageList);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const removeImage = (index: number) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
  };

  const handleImageClick = () => {
    setSelected(!selected);
  };
  return (
    <div className="lg:w-[1440px] mx-auto border border-gray-200 p-3 my-5 min-h-[850px] rounded-xl bg-white shadow-xl">
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
      <div className="mt-5">
        <input
          className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
        <div className="flex flex-wrap">
          {imageList.map((image, index) => (
            <div
              key={index}
              className="m-2 relative"
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              draggable
            >
              <Image
                src={image}
                alt={`Image ${index}`}
                height={200}
                width={300}
              />
              <button
                className="absolute top-0 right-0 text-red-500 p-1"
                onClick={() => removeImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

// {/* <div className="relative group border w-[300px] rounded-xl hover:rounded-xl">
//   <Image
//     className="group-hover:opacity-100 duration-700 rounded-xl hover:rounded-xl"
//     src={img}
//     alt="image for gellary"
//     height={200}
//     width={300}
//   ></Image>
//   {/* making gray hover  */}
//   {selected && (
//     <div className="absolute top-0 left-0 w-full h-full bg-gray-400  opacity-50  transition-opacity rounded-xl duration-500"></div>
//   )}

//   {/* making dark hover  */}
//   {!selected && (
//     <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 checked:opacity-10 transition-opacity rounded-xl duration-500"></div>
//   )}

//   {/* checkbox */}
//   <input
//     type="checkbox"
//     className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 checked:opacity-100 bg-white cursor-pointer checkbox checkbox-accent"
//     checked={selected}
//     onClick={handleImageClick}
//   ></input>
// </div>; */}
