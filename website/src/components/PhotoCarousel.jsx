import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@styles/splide.css";
// import { Image } from "react-native";

/**
 * A React component that renders a Splide carousel of images
 * @param {Object} props
 * @param {Array} props.photos - Array of photo objects with src and alt properties
 * @param {string} [props.label="Photo Carousel"] - Accessibility label for the carousel
 * @param {Object} [props.options={}] - Splide carousel options
 * @param {string} [props.className=""] - Additional CSS classes for the carousel container
 */
export default function PhotoCarousel({
  photos,
  label = "Photo Carousel",
  options = {},
  className = "",
}) {
  // Default options that will be merged with passed options
  const defaultOptions = {
    perPage: 1,
    arrows: true,
    pagination: true,
    gap: "1rem",
    autoplay: false,
    pauseOnHover: true,
    rewind: true,
  };

  // Merge the default options with the passed options
  const carouselOptions = { ...defaultOptions, ...options };

  return (
    <div className={`photo-carousel ${className}`}>
      <Splide aria-label={label} options={carouselOptions}>
        {photos.map((photo, index) => (
          <SplideSlide key={index}>
            <img
              src={photo.src.src || photo.src} // Handle both object and string formats
              alt={photo.alt}
              width={800}
              height={600}
              className="blog-image max-w-full h-auto rounded shadow-md mx-auto "
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
