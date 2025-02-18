import React from 'react';

const BUTTON_CLASS = "bg-primary text-primary-foreground px-3 py-1 rounded-lg hover:bg-primary/80";
const CARD_CLASS = "bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg";
const CARD_IMAGE_CLASS = "w-full";

interface ProductCardProps {
    imageSrc: string;
    productName: string;
    price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, productName, price }) => {
    return (
        <div
            className={`${CARD_CLASS} p-4 rounded-lg`}
            style={{ backgroundColor: '#FF5A35' }}
        >
            <img src={imageSrc} alt={productName} className={CARD_IMAGE_CLASS} />
            <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">{productName}</h2>
                <p className="text-sm text-white mb-2">Description of the product</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">{price}</span>
                    <button className={BUTTON_CLASS}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
