import React, { useState } from "react";

function ProductImages({images}) {

    const [bigImage,setBigImage]=useState(images[0].imageUrl)

  return (
    <div className="md:w-2/5 ">
      <img src={bigImage} alt="" className="max-h-[70svh] max-md:w-screen" />
      <div className="flex gap-x-2">
        {images.map((image) => (
          <img
            src={image.imageUrl}
            className="h-16 border border-[#F85606] mt-2 cursor-pointer"
            alt="produ_image"
            key={image.imageUrl}
            onClick={() => setBigImage(image.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
