import { useState } from 'react';

const REGEX = /[0-9]/;

export const useNumberInput = (initialValue) => {
  const [data, setData] = useState(initialValue);

  const onChange = (ev) => {
    const {
      target: { value },
    } = ev;

    if (value === '') {
      setData('');
    } else {
      if (REGEX.test(value)) {
        const _value = value.replace(/[^0-9]/g, '');
        setData(_value);
      }
    }
  };

  return [data, onChange, setData];
};
