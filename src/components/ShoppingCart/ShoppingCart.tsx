'use client';

import { useCartContext } from '@/Context/ItemCartProvider';
import React from 'react';
import Product from '../Product/Product';
import cloudinary from '@/db/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import './ShoppingCart.scss';

const ShoppingCart = () => {
  const [cart, setCart] = useCartContext();
  const myCld = cloudinary;

  return (
    <article>
      <div className=' flex flex-col w-[850px]'>
        <div className='grid-row'>
          <div className=''></div>
          <div className=''></div>
          <div>
            <h3 className=''>Product</h3>
          </div>
          <div>
            <h3 className=''>Price</h3>
          </div>
          <div>
            <h3 className=''>Quantity</h3>
          </div>
          <div>
            <h3 className=''>Subtotal</h3>
          </div>
        </div>
        {cart.cartProducts.map((product) => {
          const productIMG = myCld.image(product.imageUrl);
          productIMG.resize(thumbnail().height(140)).format('auto');

          return (
            <div key={`${product.id}-cart-item`} className='grid-row'>
              <div>
                <button>x</button>
              </div>
              <div>
                <AdvancedImage
                  className='object-contain h-full transition-all'
                  cldImg={productIMG}
                  plugins={[lazyload(), placeholder()]}
                />
              </div>

              <div className='flex items-center text-center'>
                <h3 className='truncate'>{product.name}</h3>
              </div>
              <div className='flex items-center text-center'>
                <p>{product.price}€</p>
              </div>
              <div className='flex items-center text-center'>
                <p>{product.quantity}</p>
              </div>
              <div className='flex items-center text-center'>
                <p>{product.quantity * product.price}€</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ShoppingCart;
