import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import Axios from 'axios';

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

export default function OrderForm() {
  const [OrderList, setOrderList] = useState(ProductData);

  const ChangeOrderValue = (id, count) => {
    const NewOrderList = OrderList.map((item) =>
      item.id === id ? { ...item, count } : item
    );
  };

  return (
    <Container>
      <form>
        <article>
          <span>No</span>
          <span>제품명</span>
          <span>단가</span>
          <span>수량</span>
          <span>금액</span>
        </article>
        <ul>
          {OrderList.map((item, index) => (
            <OrderItem item={item} index={index} />
          ))}
        </ul>
      </form>
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
