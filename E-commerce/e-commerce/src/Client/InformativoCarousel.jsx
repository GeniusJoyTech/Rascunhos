import React, { useState, useEffect } from "react";

function InformativoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/src/assets/Carrousel/vinteSalmosQueFalamDaVindaDeJEsus.jpeg", alt: "Image 1" },
    { src: "src/assets/Carrousel/Paginax1.jpeg", alt: "Image 2" },
    { src: "src/assets/Carrousel/Paginax2.jpeg", alt: "Image 3" },
    { src: "src/assets/Carrousel/Paginax3.jpeg", alt: "Image 4" },
    // { src: "src/assets/Carrousel/Congregação768x576.webp", alt: "Image 5" },
  ];

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 3000); // 3000ms = 3s

      return () => {
        clearInterval(interval);
      };
    }
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (images.length === 0) {
    return null; // Retorna null se o array de images estiver vazio
  }

  return (
    <>
      <div className="carousel" id="carousel-1">
        {images.map((image, index) => (
          <div
            className={`carousel-item opact_easeInOut_efect_05s ${index === currentIndex ? "active" : ""}`}
            key={index}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <svg className="carousel-button prev" onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
        <path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z" />
      </svg>
      <svg className="carousel-button next" onClick={handleNext} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="32" height="32">
        <path d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z" />
      </svg>
    </>
  );
}

export default InformativoCarousel;
