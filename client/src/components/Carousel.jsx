import React, { useEffect, useState } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

function Carousel() {
  const images = [ banner2, banner3,banner1];
  const [count, setCount] = useState(0);

  const nextHandler = () => {
    setCount((prev) => (prev + 1) % images.length);
  };

  const prevHandler = () => {
    setCount((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    let unsub = setInterval(() => {
      nextHandler();
    }, 5000);

    return () => {
      clearInterval(unsub);
    };
  }, []);

  const dotsHandler = (id) => {
    setCount(id);
  };

  return (
    <div className="flex justify-center mt-2">
      <div className=" relative ">
        <img loading='lazy'
          src={images[count]}
          alt="banner"
        />

        <button
          className="arrows text-2xl md:text-4xl absolute left-0 text top-[50%]"
          onClick={prevHandler}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button
          className="arrows text-2xl md:text-4xl absolute right-0  top-[50%]"
          onClick={nextHandler}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>

        <div className="dots absolute flex gap-x-2 bottom-1 left-[50%] md:gap-x-12">
          {images.map((_, idx) => (
            <i
              key={idx}
              className={`fa-solid fa-circle max-md:text-xs cursor-pointer  ${
                count === idx ? "text-gray-500" : "text-white"
              }
              }`}
              onClick={() => dotsHandler(idx)}
            ></i>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
