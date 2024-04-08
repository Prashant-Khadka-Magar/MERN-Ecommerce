import React from "react";

function RatingStar(star) {
  let fullStar = Math.floor(star);
  let halfStar = star % 1 >= 0.5 ? 1 : 0;
  let emptyStar = Math.ceil(5 - fullStar - halfStar);

  return (
    <span className="flex">
      {Array.from({ length: fullStar }, (_, idx) => (
        <i
          className="fa-solid fa-star inline-flex text-yellow-500"
          key={`full-${idx}`}
        ></i>
      ))}
      {Array.from({ length: halfStar }, (_, idx) => (
        <i
          key={`half-${idx}`}
          className="fas fa-star-half-alt text-yellow-500"
        ></i>
      ))}
      {Array.from({ length: emptyStar }, (_, idx) => (
        <i
          key={`empty-${idx}`}
          className="fa-regular fa-star inline-flex text-yellow-500"
        ></i>
      ))}
    </span>
  );
}

export default RatingStar;
