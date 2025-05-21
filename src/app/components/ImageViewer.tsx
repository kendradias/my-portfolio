"use client";

import React, { useState, useEffect, useCallback } from 'react';

// Interface for ImageViewer props
interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

// Interface for ProjectImage props
interface ProjectImageProps {
  src: string;
  alt: string;
}

// Interface for multiple images
// interface MultiImageProps {
//   images: {
//     src: string;
//     alt: string;
//   }[];
// }
// 8-bit pixel border style for the modal
const pixelBorder: React.CSSProperties = {
  position: 'relative',
  border: '4px solid #000',
  boxShadow:
     `inset -4px -4px 0 0 #555,
     inset 4px 4px 0 0 #fff`,
  backgroundColor: '#f8f8f8',
};

// Close button style
const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ff4d4d',
  color: 'white',
  fontWeight: 'bold',
  border: '2px solid #000',
  cursor: 'pointer',
  zIndex: 10,
};

// Image Viewer Component with larger image display
export const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, onClose, imageSrc, altText }) => {
    // Moved hooks to the top level before any conditional returns
    const handleEscKey = useCallback((event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }, [onClose, isOpen]);
  
    // Moved useEffect to top level - now uses isOpen in the dependency array
    useEffect(() => {
      // Only add event listeners if the modal is open
      if (isOpen) {
        document.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';
      }
      
      // Cleanup 
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        if (isOpen) {
          document.body.style.overflow = 'auto';
        }
      };
    }, [handleEscKey, isOpen]); // Added isOpen to dependencies
  
    // Return null after hooks are defined
    if (!isOpen) return null;
    
    // Handle background click to close
    const handleBackgroundClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        onClick={handleBackgroundClick}
      >
        <div 
          className="relative w-11/12 md:w-10/12 lg:w-4/5 xl:w-3/4 max-h-[90vh] bg-white"
          style={pixelBorder}
        >
          <button 
            onClick={onClose}
            style={closeButtonStyle}
          >
            X
          </button>
          
          <div className="p-4">
            {/* Increased image size with better responsive handling */}
            <div className="flex justify-center">
              <img 
                src={imageSrc}
                alt={altText}
                className="max-h-[75vh] max-w-full object-contain"
                style={{ minHeight: '50vh' }} // Adds minimum height for small images
              />
            </div>
            <div className="p-4 text-center">
              <p className="font-mono text-lg">{altText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
// ProjectImage component
export const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt }) => {
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  
  return (
    <>
      {/* Kept the regular img tag since it's working for you */}
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => setIsViewerOpen(true)}
      />
      
      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        imageSrc={src}
        altText={alt}
      />
    </>
  );
};

