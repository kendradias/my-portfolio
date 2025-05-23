"use client";

import React, { useState, useCallback, useEffect } from 'react';

// Interface for multiple images
interface MultiImageProps {
  images: {
    src: string;
    alt: string;
  }[];
}

// Enhanced ImageViewer with navigation for multiple images
interface EnhancedImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string; }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

// 8-bit pixel border style
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

// Navigation button style for modal - circular buttons
const modalNavButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '48px',
  height: '48px',
  borderRadius: '50%', // Makes the button circular
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '24px',
  border: '2px solid #fff',
  cursor: 'pointer',
  zIndex: 20,
};

// Enhanced ImageViewer with navigation
const EnhancedImageViewer: React.FC<EnhancedImageViewerProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNavigate 
}) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onNavigate((currentIndex - 1 + images.length) % images.length);
        break;
      case 'ArrowRight':
        event.preventDefault();
        onNavigate((currentIndex + 1) % images.length);
        break;
    }
  }, [isOpen, onClose, currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (isOpen) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
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
        {/* Close button */}
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        
        {/* Navigation buttons - only show if there are multiple images */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{...modalNavButtonStyle, left: '18px'}}
              title="Previous image (←)"
            >
              ←
            </button>
            <button 
              onClick={nextImage}
              style={{...modalNavButtonStyle, right: '18px'}}
              title="Next image (→)"
            >
              →
            </button>
          </>
        )}
        
        <div className="p-4">
          <div className="flex justify-center">
            <img 
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-h-[75vh] max-w-full object-contain"
              style={{ minHeight: '50vh' }}
            />
          </div>
          
          <div className="p-4 text-center">
            <p className="font-mono text-lg">{images[currentIndex].alt}</p>
            {/* Show image counter if there are multiple images */}
            {images.length > 1 && (
              <p className="font-mono text-sm text-gray-600 mt-2">
                {currentIndex + 1} of {images.length} • Use ← → keys to navigate
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced MultiImageProject component
export const MultiImageProject: React.FC<MultiImageProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Navigation functions for thumbnail view
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const openViewer = () => {
    setIsViewerOpen(true);
  };

  // Handle navigation in the modal
  const handleModalNavigate = (newIndex: number) => {
    setCurrentIndex(newIndex);
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
      
      {/* Enhanced image viewer with navigation */}
      <EnhancedImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        currentIndex={currentIndex}
        onNavigate={handleModalNavigate}
      />
      
      {/* Thumbnail navigation controls */}
      {images.length > 1 && (
        <>
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
          
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs pointer-events-none">
            {currentIndex + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiImageProject;