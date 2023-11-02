"use client";
import React, { useState, DragEvent } from "react";
import Image from "next/image";
import img from "../../public/images/485692-200.png";

const ImageGallery = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<boolean[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showGallery, setShowGallery] = useState<boolean>(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      const newSelectedStates: boolean[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result as string);
          newSelectedStates.push(false); // Initialize as unselected
          if (newImages.length === files.length) {
            setImageList([...imageList, ...newImages]);
            setSelectedStates([...selectedStates, ...newSelectedStates]);
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
    const newSelectedStates = [...selectedStates];
    const [draggedImage] = newImageList.splice(Number(sourceIndex), 1);
    const [draggedState] = newSelectedStates.splice(Number(sourceIndex), 1);
    newImageList.splice(index, 0, draggedImage);
    newSelectedStates.splice(index, 0, draggedState);
    setImageList(newImageList);
    setSelectedStates(newSelectedStates);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const toggleImageSelection = (index: number) => {
    const newSelectedStates = [...selectedStates];
    newSelectedStates[index] = !newSelectedStates[index];
    setSelectedStates(newSelectedStates);
  };

  const countSelectedImages = () => {
    return selectedStates.filter((state) => state).length;
  };

  const deleteSelectedImages = () => {
    const newImageList = imageList.filter((_, index) => !selectedStates[index]);
    const newSelectedStates = selectedStates.filter((state) => !state);
    setImageList(newImageList);
    setSelectedStates(newSelectedStates);
  };

  return (
    <div className="lg:w-[1440px] mx-auto border border-gray-200 p-3 my-5 min-h-[850px] rounded-xl bg-white shadow-xl">
      <div className="flex justify-between">
        <div>
          {countSelectedImages() === 0 && (
            <h1 className="font-bold text-xl my-2">Gallery</h1>
          )}

          {countSelectedImages() > 0 && (
            <h1 className="font-bold text-xl my-2">
              {countSelectedImages()} File Selected
            </h1>
          )}
        </div>
        {countSelectedImages() !== 0 && (
          <button onClick={deleteSelectedImages} className="my-2 text-red-600">
            Delete Image
          </button>
        )}
      </div>
      <div className="mt-5">
        <hr />
      </div>
      <div className="mt-5">
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {imageList.map((image, index) => (
            <div
              key={index}
              className={`relative group border  rounded-xl before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move ${
                (index === 0 ? " md:col-span-2 md:row-span-2" : " col-span-1") +
                (imageList.find(
                  (photo) => Number(photo.id) === Number(image.id)
                )
                  ? " opacity-100"
                  : " hover:before:bg-black/50")
              }}`}
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              draggable={true}
            >
              <Image
                className={`group-hover:opacity-100 duration-700 rounded-xl hover:rounded-xl  w-full ${
                  imageList.find(
                    (photo) => Number(photo.id) === Number(image.id)
                  ) && "opacity-70"
                }`}
                src={image}
                alt={`Image ${index}`}
                height={index === 0 ? 390 : 180}
                width={index === 0 ? 390 : 180}
              ></Image>
              {selectedStates[index] && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50 transition-opacity rounded-xl duration-500"></div>
              )}
              {!selectedStates[index] && (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 checked:opacity-10 transition-opacity rounded-xl duration-500"></div>
              )}
              <input
                type="checkbox"
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 checked:opacity-100 bg-white cursor-pointer checkbox checkbox-accent"
                checked={selectedStates[index]}
                onChange={() => toggleImageSelection(index)}
              ></input>
            </div>
          ))}

          {/* add image button  */}
          <div className="relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear">
            <input
              type="file"
              accept="image/*"
              multiple
              name="images"
              id="images"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              title="Click to Upload Photos"
              onChange={handleFileChange}
            />
            <div className="h-full w-full flex flex-col justify-center items-center gap-y-4">
              <Image
                src={img}
                alt="placeholder"
                height={20}
                width={20}
                priority
              />
              <span className="whitespace-nowrap">Add Images</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
