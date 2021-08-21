import React, { useEffect, useState } from 'react';

export default function OrderItem({
  item: {
    product_id,
    product_category,
    product_sapcode,
    product_name,
    product_price,
  },
  index,
  changeOrderValue,
  inputToggle,
}) {
  const nf = new Intl.NumberFormat();

  const [ProductCount, setProductCount] = useState('');

  const onChangeCount = (e) => {
    setProductCount(e.currentTarget.value);
  };

  useEffect(() => {
    changeOrderValue(product_id, parseInt(ProductCount));
    // eslint-disable-next-line
  }, [ProductCount]);

  return (
    <li key={`ITEM${product_id}`}>
      <span>{product_sapcode}</span>
      <span>{product_name}</span>
      <span>{nf.format(product_price)}</span>
      <span>
        <input
          value={ProductCount}
          maxLength={4}
          onChange={onChangeCount}
          disabled={inputToggle}
        />
      </span>
      <span>{nf.format(product_price * (ProductCount * 1))}원</span>
    </li>
  );
}
