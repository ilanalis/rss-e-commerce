import { useApiRootContext } from '@/contexts/useApiRootContext';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ProductCardMin from '@components/product-card-min';
import Breadcrumbs from '../breadcrumbs';
import Sorting from '../sorting';
import Filter from '@components/filter';
import Search from '@components/search';

type ProductListProps = {
  categoryId:
    | 'c96ff3d0-1688-4913-90ae-a3056e259e68'
    | '78db1a69-6023-44b5-8b3d-a8f294cdd335'
    | 'dac8edad-bf16-4f56-859c-f364efde1c2a'
    | '9f44fc3d-b2b9-4625-91e8-03934154b07d';
};

function ProductList({ categoryId }: ProductListProps) {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [error, setError] = useState();
  const [querySort, setQuerySort] = useState({});
  const [queryFilter, setQueryFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string[]>([]);

  const { apiRoot } = useApiRootContext();

  useEffect(() => {
    apiRoot &&
      apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 30,
            'filter.query': [`categories.id:"${categoryId}"`, ...queryFilter],
            ...querySort,
            'text.en-GB': [...searchQuery],
          },
        })
        .execute()
        .then((response) => {
          const products = response.body.results;
          if (products) {
            setProducts(products);
          }
        })
        .catch((error) => {
          setError(error);
        });
  }, [apiRoot, categoryId, querySort, queryFilter, searchQuery]);

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
        <div className={styles.productList}>
          {!products.length && 'No products'}
          {products &&
            products.map((product) => {
              const id = product.id;
              const imgSrc =
                product.masterVariant.assets && product.masterVariant.assets[0].sources[0].uri;
              const title = product.name['en-GB'];
              const level =
                product.masterVariant.attributes && product.masterVariant.attributes[0].value.label;
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
                  key={id}
                  id={id}
                  imgSrc={imgSrc || ''}
                  title={title}
                  price={price}
                  finalPrice={finalPrice}
                  level={level}
                  duration={duration}
                />
              );
            })}
          {error && error}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
