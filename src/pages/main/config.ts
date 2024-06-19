interface DiscountCode {
  code: string;
  discount: string;
}

export const discountCodes: DiscountCode[] = [
  {
    code: 'SUMMER',
    discount: '15%',
  },
  {
    code: 'BRAIN',
    discount: '20$',
  },
];
