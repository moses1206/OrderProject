import React, { useEffect, useState } from 'react';

export default function UpdateOrderItem({
  item: { id, name, price },
  index,
  changeOrderValue,
  inputToggle,
}) {
  const nf = new Intl.NumberFormat();

  const [count, setCount] = useState('');

  const onChangeCount = (e) => {
    setCount(e.currentTarget.value);
  };

  useEffect(() => {
    changeOrderValue(id, count);
    // eslint-disable-next-line
  }, [count]);

  return (
    <li key={`ITEM${id}`}>
      <span>{index + 1}</span>
      <span>{name}</span>
      <span>{nf.format(price)}</span>
      <span>
        <input
          value={count}
          maxLength={4}
          onChange={onChangeCount}
          disabled={inputToggle}
        />
      </span>
      <span>{nf.format(price * (count * 1))}원</span>
    </li>
  );
}
