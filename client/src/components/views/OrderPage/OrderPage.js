import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';

import styled from 'styled-components';

const nf = new Intl.NumberFormat();

const ProductData = [
  { id: 1, name: '삼양라면', price: 2250 },
  { id: 2, name: '불닭볶음면', price: 3250 },
  { id: 3, name: '짜짜로니', price: 2650 },
  { id: 4, name: '사또밥', price: 800 },
  { id: 5, name: '짱구', price: 800 },
  { id: 6, name: '불닭소스', price: 3000 },
];

function OrderPage() {
  const [list, setList] = useState(ProductData);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState([]);

  const changeCount = (id, count) => {
    const newList = list.map((item) =>
      item.id === id ? { ...item, count } : item
    );
    setList(newList);
  };

  useEffect(() => {
    const _total = list.reduce((acc, cur) => {
      if (cur.count > 0) {
        return acc + cur.price * cur.count;
      } else {
        return acc;
      }
    }, 0);
    setTotal(_total);
  }, [list]);

  const orderConfirmSubmit = (ev) => {
    ev.preventDefault();
    const formData = list.filter((item) => item.count > 0);
    setResult(formData);
  };

  const orderSubmit = (ev) => {
    ev.preventDefault();
    console.log(result);
    alert('주문완료!');
  };

  return (
    <Container>
      {result.length > 0 ? (
        <form onSubmit={orderSubmit}>
          <h1>아래 내역으로 주문 하시겠습니까?</h1>
          <article>
            <span>No</span>
            <span>제품명</span>
            <span>단가</span>
            <span>수량</span>
            <span>금액</span>
          </article>
          <ul>
            {result.map((item, index) => (
              <li key={`ITEM${item.id}`}>
                <span>{index + 1}</span>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <span>{item.count}</span>
                <span>{item.price * item.count}</span>
              </li>
            ))}
          </ul>
          <h1>ToTal : {nf.format(total)}원</h1>
          <button>주문하기</button>
        </form>
      ) : (
        <form onSubmit={orderConfirmSubmit}>
          <article>
            <span>No</span>
            <span>제품명</span>
            <span>단가</span>
            <span>수량</span>
            <span>금액</span>
          </article>
          <ul>
            {ProductData.map((p, index) => (
              <OrderItem
                key={`ITEM${p.id}`}
                item={p}
                index={index}
                changeCount={changeCount}
              />
            ))}
          </ul>
          <h1>ToTal : {nf.format(total)}원</h1>
          <button>주문하기</button>
        </form>
      )}
    </Container>
  );
}

const Container = styled.div`
  form {
    padding: 50px;
    max-width: 800px;
    margin: 50px auto;

    article {
      border-bottom: 2px solid #ddd;
      display: flex;
      span {
        text-align: center;
        align-items: center;
        &:nth-child(1) {
          width: 50px;
          flex-shrink: 0;
        }
        &:nth-child(2) {
          flex-grow: 1;
        }
        &:nth-child(3) {
          width: 120px;
          flex-shrink: 0;
        }
        &:nth-child(4) {
          width: 80px;
          flex-shrink: 0;
        }
        &:nth-child(5) {
          width: 150px;
          flex-shrink: 0;
        }
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        display: flex;
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        align-items: center;

        span {
          text-align: center;
          &:nth-child(1) {
            width: 50px;
            flex-shrink: 0;
          }
          &:nth-child(2) {
            flex-grow: 1;
          }
          &:nth-child(3) {
            width: 120px;
            flex-shrink: 0;
          }
          &:nth-child(4) {
            width: 80px;
            input {
              width: 100%;
            }
            flex-shrink: 0;
          }
          &:nth-child(5) {
            width: 150px;
            flex-shrink: 0;
          }
        }
      }
    }
  }
`;

export default OrderPage;
