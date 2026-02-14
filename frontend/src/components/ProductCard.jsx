import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { name, year, branch, phone, instagramURL, XURL, facebookURL } = product.productID;
  console.log(instagramURL);
  const status = product.status;
  const statusText = status === 'sold' ? 'SOLD' : status === 'rent' ? 'RENTED' : '';
  const overlayClass = status === 'sold' ? 'bg-red-500' : status === 'rent' ? 'bg-yellow-500' : '';

  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const handleConnectClick = () => {
    setPopUpVisible(true);
  };

  const handleClosePopup = () => {
    setPopUpVisible(false);
  };

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto relative overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-800">
      
      {/* Product Image */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover w-full h-full" src={product.image} alt="product image" />
        
        {/* Conditionally render overlay based on product status */}
        {status !== 'available' && (
          <div className={`absolute inset-0 ${overlayClass} bg-opacity-70 flex justify-center items-center`}>
            <span className="text-4xl font-bold text-white">{statusText}</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>
        
        {/* Display product details */}
        <div className="mt-2 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-inherit text-white">
            <span className="font-bold"></span>{name}
          </p>
          <p className="text-inherit text-white">
            <span className="font-bold">Year: </span>{year}
          </p>
          <p className="text-inherit text-white">
            <span className="font-bold"></span>{branch}
          </p>
        </div>

        {/* Price and Business Type */}
        <div className="mt-2 mb-5 flex flex-col sm:flex-row items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">Rs.{product.price}</span>
          </p>
          <p>
            <span className="text-3xl font-bold text-emerald-400">{product.businesstype}</span>
          </p>
        </div>

        {/* Chat Button */}
        <button className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none w-full" onClick={handleConnectClick}>
          Connect Here
        </button>
      </div>

      {/* Popup Window */}
      {isPopUpVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg p-6 shadow-lg w-80 relative">
            <p className="text-lg mb-4 text-center">
              <span className="font-bold">Phone: </span>{phone}
            </p>
            <p className="text-lg mb-4 text-center">
              <span className="font-bold">Connect Here</span>
            </p>
            <p className="text-lg mb-4 text-center flex justify-center space-x-9">
              <a href={instagramURL} target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
              <a href={XURL} target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
              <a href={facebookURL} target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
            </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
