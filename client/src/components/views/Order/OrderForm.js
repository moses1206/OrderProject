import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { productData, DeliveryTimes } from '../../../data/Datas';

const nf = new Intl.NumberFormat();

export default function OrderForm(props) {
  const [OrderList, setOrderList] = useState(productData);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalValue, setTotalValue] = useState(0);
  const [ShippingAddress, setShippingAddress] = useState('기본배송지');
  const [DeliveryDate, setDeliveryDate] = useState(null);
  const [DeliveryTime, setDeliveryTime] = useState(1);
  const [FilteredOrderList, setFilteredOrderList] = useState([]);

  const changeOrderValue = (id, product_count) => {
    const NewOrderList = OrderList.map((item) =>
      item.product_id === id ? { ...item, product_count } : item
    );

    setOrderList(NewOrderList);
  };

  const onChangeAddress = (e) => {
    setShippingAddress(e.currentTarget.value);
  };

  const onChangeDeliveryTime = (e) => {
    setDeliveryTime(e.currentTarget.value);
  };

  useEffect(() => {
    const _totalPrice = OrderList.reduce((acc, cur) => {
      if (cur.product_count > 0) {
        return acc + cur.product_price * cur.product_count;
      } else {
        return acc;
      }
    }, 0);
    setTotalPrice(_totalPrice);

    const _totalValue = OrderList.reduce((acc, cur) => {
      if (cur.product_count > 0) {
        return acc + cur.product_count * 1;
      } else {
        return acc;
      }
    }, 0);
    setTotalValue(_totalValue);
  }, [OrderList]);

  const orderConfirm = (e) => {
    e.preventDefault();
    const submitData = OrderList.filter((item) => item.product_count > 0);
    setFilteredOrderList(submitData);
  };

  const orderSubmit = (e) => {
    e.preventDefault();

    if (
      !FilteredOrderList ||
      !TotalValue ||
      !TotalPrice ||
      !ShippingAddress ||
      !DeliveryDate ||
      !DeliveryTime
    ) {
      return alert('모든 필드를 채워주세요!!');
    }

    const body = {
      writer: props.user.userData._id,
      order_detail: FilteredOrderList,
      total_quantity: TotalValue,
      total_price: TotalPrice,
      address: ShippingAddress,
      delivery_date: DeliveryDate,
      delivery_time: DeliveryTime,
    };

    Axios.post('/api/orders', body).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          props.history.push('/');
        }, 1500);
      } else {
        alert('주문을 등록하는 것을 실패하였습니다. !!');
      }
    });
  };

  console.log(FilteredOrderList);

  return (
    <Container>
      {FilteredOrderList.length > 0 ? (
        <form onSubmit={orderSubmit}>
          <h2>아래 내용으로 주문하시겠습니까??</h2>
          <br />
          <br />
          <div style={{ padding: '5px' }}>
            <label>배송지주소</label>
            <input value={ShippingAddress} onChange={onChangeAddress} />
          </div>
          <div style={{ padding: '5px', display: 'flex' }}>
            <label>배송날짜</label>
            <span style={{ marginLeft: '5px' }}>
              <DatePicker
                selected={DeliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                dateFormat='yyyy-MM-dd'
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
              />
            </span>
          </div>

          <div
            style={{ padding: '5px', display: 'flex', marginBottom: '15px' }}
          >
            <label>배송시간</label>
            <select onChange={onChangeDeliveryTime} value={DeliveryTime}>
              {DeliveryTimes.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <article>
            <span>SapCode</span>
            <span>제품명</span>
            <span>단가</span>
            <span>수량</span>
            <span>금액</span>
          </article>
          <ul>
            {FilteredOrderList.map((item, index) => (
              <li key={index}>
                <span>{index + 1}</span>
                <span>{item.product_name}</span>
                <span>{nf.format(item.product_price)}</span>
                <span>{item.product_count}</span>
                <span>
                  {nf.format(item.product_price * (item.product_count * 1))}원
                </span>
              </li>
            ))}
          </ul>
          <span>주문수량 : {nf.format(TotalValue)}원</span>
          <span style={{ marginLeft: '50px' }}>
            주문금액 : {nf.format(TotalPrice)}원
          </span>
          <div>
            <button>최종 주문하기</button>
          </div>
        </form>
      ) : (
        <form onSubmit={orderConfirm}>
          <h2 style={{ textAlign: 'center' }}>주문하기</h2>
          <br />
          <article>
            <span>SapCode</span>
            <span>제품명</span>
            <span>단가</span>
            <span>수량</span>
            <span>금액</span>
          </article>
          <ul>
            {OrderList.map((item, index) => (
              <OrderItem
                key={index}
                item={item}
                index={index}
                changeOrderValue={changeOrderValue}
              />
            ))}
          </ul>
          <span>주문수량 : {nf.format(TotalValue)}박스</span>
          <span style={{ marginLeft: '50px' }}>
            주문금액 : {nf.format(TotalPrice)}원
          </span>
          <div>
            <button>주문하기</button>
          </div>
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
