import styles from './style.module.css';
import 'react-toastify/dist/ReactToastify.css';
import './toaster.css';
import cn from 'classnames';

import { useApiRootContext } from '@/contexts/useApiRootContext';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BUTTON_IDS, ProductData, fetchData, tryChangeProductQuantity } from './config';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { ToastContainer } from 'react-toastify';
import notify from '@/utils/notify';

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);

  const { apiRoot } = useApiRootContext();
  const { productId } = useParams<{ category: string; productId: string }>();

  useEffect(() => {
    if (apiRoot && productId) {
      fetchData(apiRoot, productId).then((response) => {
        const success = response.success;

        if (success) {
          const product = response.product;
          const isProductInCart = response.isProductInCart;
          if (product) {
            setProduct(product);
            setSelectedImage(product.assets[0].url);
            setIsProductInCart(isProductInCart);
          }
        } else {
          setError(true);
        }
      });
    }
  }, [apiRoot, productId]);

  const handleThumbnailClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleSelectedImageClick = () => {
    setIsGalleryOpen(true);
  };

  const handleGalleryClosed = () => {
    setIsGalleryOpen(false);
  };

  const handleCartButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      const button = e.target;
      const buttonID = button.id;

      if (product) {
        button.disabled = true;
        tryChangeProductQuantity(apiRoot, product.id, buttonID)
          .then((response) => {
            if (response && response.success) {
              if (buttonID === BUTTON_IDS.add) {
                setIsProductInCart(true);
                notify('The product was added to the cart!');
              } else if (buttonID === BUTTON_IDS.remove) {
                notify('The product was removed from the cart!');
                setIsProductInCart(false);
              }
            } else {
              throw new Error('Unable to change product quantity');
            }
          })
          .catch(() => {
            button.disabled = false;
            notify('Sorry, something went wrong. Please, try later.');
          });
      }
    }
  };

  return (
    <div className={cn('container', styles.productContainer)}>
      {!product && !error && <h2>Loading the product...</h2>}
      {error && <h2>Sorry, the product is not found. Please, try later.</h2>}
      {product && (
        <>
          <div className={styles.galleryContainer}>
            <div className={styles.thumbnailsContainer}>
              {product.assets.map((asset) => (
                <div
                  key={asset.id}
                  className={`${styles.thumbnail} ${selectedImage === asset.url ? styles.selected : ''}`}
                  onClick={() => handleThumbnailClick(asset.url)}
                >
                  <img src={asset.url} alt="" className={styles.thumbnailImage} />
                </div>
              ))}
            </div>
            <div className={styles.selectedImageContainer}>
              <img
                src={selectedImage}
                alt=""
                className={styles.selectedImage}
                onClick={handleSelectedImageClick}
              />
            </div>
            {isGalleryOpen && (
              <Gallery onOpen={handleGalleryClosed}>
                {product.assets.map((asset) => (
                  <Item
                    key={asset.id}
                    original={asset.url}
                    thumbnail={asset.url}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref}
                        onClick={open}
                        onLoad={(e) => {
                          if (asset.url === selectedImage && isGalleryOpen) {
                            if (e.target instanceof HTMLImageElement) {
                              e.target.click();
                            }
                          }
                        }}
                        src={asset.url}
                        alt=""
                        className={styles.hiddenImage}
                      />
                    )}
                  </Item>
                ))}
              </Gallery>
            )}
          </div>

          <div className={styles.infoContainer}>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.duration}>{product.duration} months</p>
            {product.finalPrice ? (
              <p>
                <span className={styles.finalPrice}>{product.finalPrice.toFixed(2)}$</span>
                <span className={styles.oldPrice}>{product.price.toFixed(2)}$</span>
              </p>
            ) : (
              <p className={styles.price}>${product.price.toFixed(2)}</p>
            )}
            <div className={styles.buttonsContainer}>
              <button
                id={BUTTON_IDS.add}
                className={styles.cartButton}
                disabled={isProductInCart}
                onClick={(e) => handleCartButtonClicked(e)}
              >
                Add to Cart
              </button>
              <button
                id={BUTTON_IDS.remove}
                className={styles.cartButton}
                disabled={!isProductInCart}
                onClick={(e) => handleCartButtonClicked(e)}
              >
                Remove from Cart
              </button>
            </div>

            <ToastContainer position="bottom-right" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
