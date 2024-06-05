import React, { useState } from "react";
import "./DragAndDrop.css";

// It will return image url based on the index
const getPictureURL = (i) => {
  return `https://source.unsplash.com/random/200x200?pic=${i + 1}`;
};

// Initial images
const initialImages = [...Array(9)]?.map((_, i) => getPictureURL(i));

const DragAndDrop = () => {
  const [images, setImages] = useState(initialImages);

  const handleDragStart = (e, startIndex) => {
    // Setting index in to access it in onDrop event
    e.dataTransfer.setData("selected_index", startIndex);
  };

  const handleOnDrop = (e, droppedIndex) => {
    // Starting index, it was set in the onDragStart
    const selectedIndex = Number(e.dataTransfer.getData("selected_index"));

    const updatedImages = [...images];
    // Swapping of images
    const flag = updatedImages[selectedIndex];
    updatedImages[selectedIndex] = updatedImages[droppedIndex];
    updatedImages[droppedIndex] = flag;

    setImages(updatedImages);
  };
  return (
    <div className="drag_drop_outer_container">
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        className="drag_drop_container"
      >
        {images.map((item, i) => (
          <div
            key={i}
            draggable
            id={i}
            itemID={i}
            onDragStart={(e) => {
              handleDragStart(e, i);
            }}
            onDrop={(e) => {
              handleOnDrop(e, i);
            }}
            className="single_drag_item"
          >
            <img style={{ width: "100%" }} id={i} src={item} alt="Img" />
          </div>
        ))}
        {/* {new Array.from(9).map((item) => (
          <div>hi</div>
        ))} */}
      </div>
    </div>
  );
};

export default DragAndDrop;
