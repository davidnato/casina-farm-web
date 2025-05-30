
import { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      src: "/lovable-uploads/1.jpg",
      alt: "Farm landscape"
    },
    {
      src: "/lovable-uploads/5.jpg",
      alt: "Farm animals"
    },
    {
      src: "/lovable-uploads/4.jpg",
      alt: "Fresh vegetables"
    },
    {
      src: "/lovable-uploads/6.jpg",
      alt: "Farm to table"
    },
    {
      src: "/lovable-uploads/7.jpg",
      alt: "Organic farming"
    },
    {
      src: "/lovable-uploads/1.jpg",
      alt: "Farm produce"
    }
  ];
  
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Gallery</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Take a visual tour of our farm, from the fields to the barn, and see where your food comes from.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg shadow-md cursor-pointer h-64"
              onClick={() => openModal(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-farm-green p-2 rounded-full"
            onClick={closeModal}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
