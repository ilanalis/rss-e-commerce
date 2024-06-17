import { isNumber, isObject, isString } from '@/utils/type-guards';
import { Asset, Attribute, Price, Product } from '@commercetools/platform-sdk';
import { GalleryProps } from 'react-photoswipe-gallery';

const LANGUAGE_KEY = 'en-GB';
const PRICE_COEF = 100;

type AssetData = {
  id: string;
  url: string;
};
export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  finalPrice?: number;
  level: string;
  duration: number;
  assets: AssetData[];
}

const containsPrice = (prices: Price[]): boolean =>
  isObject(prices[0]) &&
  'value' in prices[0] &&
  isObject(prices[0].value) &&
  'centAmount' in prices[0].value &&
  isNumber(prices[0].value.centAmount);

const containsDiscount = (prices: Price[]): boolean =>
  isObject(prices[0]) &&
  'discounted' in prices[0] &&
  isObject(prices[0].discounted) &&
  'value' in prices[0].discounted &&
  isObject(prices[0].discounted.value) &&
  'centAmount' in prices[0].discounted.value &&
  isNumber(prices[0].discounted.value.centAmount);

const containsLevel = (attributes: Attribute[]): boolean =>
  isObject(attributes[0]) &&
  'value' in attributes[0] &&
  isObject(attributes[0].value) &&
  'label' in attributes[0].value &&
  isString(attributes[0].value.label);

const containsDuration = (attributes: Attribute[]): boolean =>
  isObject(attributes[1]) && 'value' in attributes[1] && isNumber(attributes[1].value);

const getPrice = (prices: Price[] | undefined): number => {
  if (isObject(prices) && containsPrice(prices)) {
    return prices[0].value.centAmount / PRICE_COEF;
  }
  return 0;
};

const getDiscount = (prices: Price[] | undefined): number | undefined => {
  if (isObject(prices) && containsDiscount(prices)) {
    return prices[0].discounted!.value.centAmount / PRICE_COEF;
  }
  return undefined;
};

const getLevel = (attributes: Attribute[] | undefined): string => {
  if (isObject(attributes) && containsLevel(attributes)) {
    return attributes[0].value.label;
  }
  return '';
};

const getDuration = (attributes: Attribute[] | undefined): number => {
  if (isObject(attributes) && containsDuration(attributes)) {
    return attributes[1].value;
  }
  return 0;
};

const getAssets = (assets: Asset[] | undefined): AssetData[] => {
  if (isObject(assets)) {
    return assets.map((value) => ({ id: value.id, url: value.sources[0].uri }));
  }
  return [];
};

export const mapProductProjectionToProduct = (fetchedProduct: Product): ProductData | null => {
  const currentMasterData = fetchedProduct.masterData.current;
  const currentMasterVariant = currentMasterData.masterVariant;

  return {
    id: fetchedProduct.id,
    name: currentMasterData.name[LANGUAGE_KEY],
    description: currentMasterData.description ? currentMasterData.description[LANGUAGE_KEY] : '',
    price: getPrice(currentMasterVariant.prices),
    finalPrice: getDiscount(currentMasterVariant.prices),
    level: getLevel(currentMasterVariant.attributes),
    duration: getDuration(currentMasterVariant.attributes),
    assets: getAssets(currentMasterVariant.assets),
  };
};

export const galleryProps: GalleryProps = {
  options: {
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  },
};
