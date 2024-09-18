import { useApiRootContext } from '@/contexts/useApiRootContext';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ProductCardMin from './product-card-min';
import Breadcrumbs from '@components/breadcrumbs';
import Sorting from '@components/sorting';
import Filter from '@components/filter';
import Search from '@components/search';
import Paginator from '@components/paginator';
import { getCartProducts } from '@/utils/api/cart-api';

type ProductListProps = {
  categoryId:
    | 'a217802e-37e8-4e30-aeb4-69e1197a12b5'
    | '5e12f1b9-406c-4719-8cc9-af131511e2d9'
    | '2bcab347-1ebf-45d9-b643-6cfaf2b33508'
    | '634d7e9e-b05d-4b9f-9ead-5bf8f6c711d7';
};

function ProductList({ categoryId }: ProductListProps) {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [productsCart, setProductsCart] = useState<string[]>([]);
  const [error, setError] = useState();
  const [querySort, setQuerySort] = useState({});
  const [queryFilter, setQueryFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const { apiRoot } = useApiRootContext();

  const fetchProductsList = async () => {
    if (apiRoot) {
      const response = await getCartProducts(apiRoot);
      if (response && response.success && response.products) {
        if (response.products.length) {
          const productsCart = response.products.map((product) => product.productId);
          setProductsCart(productsCart);
        }
      }
    }
  };

  useEffect(() => {
    apiRoot &&
      apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 6,
            offset: offset,
            'filter.query': [`categories.id:"${categoryId}"`, ...queryFilter],
            ...querySort,
            'text.en-GB': [...searchQuery],
          },
        })
        .execute()
        .then((response) => {
          const products = response.body.results;
          setTotalProducts(response.body.total!);
          if (!products) {
            return;
          }
          setProducts(products);
        })
        .catch((error) => {
          setError(error);
        });
    fetchProductsList();
  }, [apiRoot, categoryId, querySort, queryFilter, searchQuery, offset]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalogHeader}>
        <Breadcrumbs categoryId={categoryId} />
        <Search setSearchQuery={setSearchQuery} />
        <Sorting setSort={setQuerySort} />
      </div>
      <div className={styles.wrapper}>
        <aside>
          <Filter setFilter={setQueryFilter} />
        </aside>
        <div className={styles.productWrapper}>
          <div className={styles.productList}>
            {!products.length && 'No products'}
            {products &&
              products.map((product) => {
                const id = product.id;
                const imgSrc =
                  product.masterVariant.assets && product.masterVariant.assets[0].sources[0].uri;
                const title = product.name['en-GB'];
                const level =
                  product.masterVariant.attributes &&
                  product.masterVariant.attributes[0].value.label;
                const duration =
                  product.masterVariant.attributes && product.masterVariant.attributes[1].value;
                const price =
                  ((product.masterVariant.prices &&
                    product.masterVariant.prices[0].value.centAmount) ||
                    0) / 100;
                const finalPrice =
                  ((product.masterVariant.prices &&
                    product.masterVariant.prices[0].discounted?.value.centAmount) ||
                    0) / 100;
                return (
                  <ProductCardMin
                    key={id + title}
                    id={id}
                    imgSrc={imgSrc || ''}
                    title={title}
                    price={price}
                    finalPrice={finalPrice}
                    level={level}
                    duration={duration}
                    selected={productsCart.includes(id)}
                  />
                );
              })}
            {error && error}
          </div>
          <Paginator
            totalItemsCount={totalProducts}
            pageSize={6}
            portionSize={5}
            onPageChanged={(num: number) => {
              setOffset((num - 1) * 6);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
