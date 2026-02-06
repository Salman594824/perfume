
import React from 'react';
import { Product, StockStatus } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group cursor-pointer relative"
      onClick={() => onClick(product)}
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[10px] px-2 py-1 uppercase tracking-widest">
            Limited Offer
          </div>
        )}
        {product.stockStatus === StockStatus.OUT_OF_STOCK && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <span className="text-black font-semibold uppercase tracking-widest text-xs">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-lg mb-2">{product.name}</h3>
        <div className="flex items-center justify-center space-x-3">
          {product.discountPrice ? (
            <>
              <span className="text-gray-400 line-through text-sm">${product.price}</span>
              <span className="font-semibold text-[#064E3B]">${product.discountPrice}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
