import { useState } from 'react';

export const useInput = (initialValue) => {
  const [data, setData] = useState(initialValue);

  const onChange = (ev) => {
    const {
      target: { value },
    } = ev;

    if (value === '') {
      setData('');
    } else {
      setData(value);
    }
  };

  return [data, onChange, setData];
};
