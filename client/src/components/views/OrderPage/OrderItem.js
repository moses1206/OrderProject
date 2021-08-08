import React, { useEffect } from 'react';
import { useNumberInput } from '../../customInput/useNumberInput';

const nf = new Intl.NumberFormat();

export default function OrderItem({
  changeCount,
  index,
  item: { id, name, price },
}) {
  const [count, onChangeCount, setCount] = useNumberInput('');

  useEffect(() => {
    changeCount(id, count);
  }, [count]);

  return (
    <li key={`ITEM${id}`}>
      <span>{index + 1}</span>
      <span>{name}</span>
      <span>{nf.format(price)}</span>
      <span>
        <input value={count} onChange={onChangeCount} maxLength={3} />
      </span>
      <span>{nf.format(price * (count * 1))}원</span>
    </li>
  );
}
