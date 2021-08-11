import React, { useEffect, useState } from 'react';

export default function OrderItem({ item: { id, name, price }, index }) {
  const nf = new Intl.NumberFormat();

  const [count, setCount] = useState(0);

  const onChange = (e) => {
    setCount(e.currentTarget.value);
  };

  return (
    <li key={`ITEM${id}`}>
      <span>{index + 1}</span>
      <span>{name}</span>
      <span>{nf.format(price)}</span>
      <span>
        <input value={count} maxLength={3} onChange={onChange} />
      </span>
      <span>{nf.format(price * (count * 1))}원</span>
    </li>
  );
}
