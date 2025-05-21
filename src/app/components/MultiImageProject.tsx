"use client";

import React, { useState } from 'react';
import { ImageViewer } from './ImageViewer'; // Adjust if your path is different

// Interface for multiple images
interface MultiImageProps {
  images: {
    src: string;
    alt: string;
  }[];
}

// Component that allows both navigation AND image enlargement
export const MultiImageProject: React.FC<MultiImageProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Skip to next image
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from opening the viewer
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  // Go to previous image
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from opening the viewer
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Open the image viewer directly
  const openViewer = () => {
    setIsViewerOpen(true);
  };
  
  return (
    <div className="relative h-full w-full">
      {/* Main image container */}
      <div className="w-full h-full cursor-pointer" onClick={openViewer}>
        <img 
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Image viewer for the enlarged view */}
      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        imageSrc={images[currentIndex].src}
        altText={images[currentIndex].alt}
      />
      
      {/* Only show navigation controls if there's more than one image */}
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <div className="absolute inset-0 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            <button 
              onClick={prevImage}
              className="h-full px-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 pointer-events-auto"
            >
              &lt;
            </button>
            <button 
              onClick={nextImage}
              className="h-full px-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 pointer-events-auto"
            >
              &gt;
            </button>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs pointer-events-none">
            {currentIndex + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiImageProject;