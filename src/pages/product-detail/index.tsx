import styles from './style.module.css';
import cn from 'classnames';

import { useApiRootContext } from '@/contexts/useApiRootContext';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductData, mapProductProjectionToProduct } from './config';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  const { apiRoot } = useApiRootContext();
  const { productId } = useParams<{ category: string; productId: string }>();

  useEffect(() => {
    apiRoot &&
      apiRoot
        .products()
        .withId({ ID: productId || '' })
        .get()
        .execute()
        .then((response) => {
          const productProjection = response.body;
          const product = mapProductProjectionToProduct(productProjection);
          setProduct(product);
          setSelectedImage(product!.assets[0].url);
        })
        .catch((error) => {
          console.error('Error retrieving product:', error);
          setError(true);
        });
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

  return (
    <div className={cn('container', styles.productContainer)}>
      {!product && !error && <h2>Loading the product...</h2>}
      {error && <h2>Sorry, the product with your id is not found.</h2>}
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
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
