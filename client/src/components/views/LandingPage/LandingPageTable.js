import React, { useState, useEffect } from 'react';
import { Collapse, Table, Button } from 'antd';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Axios from 'axios';
import UpdateOrderItem from '../Order/UpdateOrderItem';
import moment from 'moment';
import { DeliveryTimes } from '../../../data/Datas';

const { Panel } = Collapse;
const nf = new Intl.NumberFormat();

export default function LandingPageTable(props) {
  const [NewAddress, setNewAddress] = useState(props.order.address);
  const [DeliveryTime, setDeliveryTime] = useState(props.order.delivery_time);
  const [OrderDetail, setOrderDetail] = useState(props.order.order_detail);
  const [DeliveryDate, setDeliveryDate] = useState(null);
  const [TotalValue, setTotalValue] = useState(props.order.total_quantity);
  const [TotalPrice, setTotalPrice] = useState(props.order.total_price);
  const [inputToggle, setinputToggle] = useState(true);

  console.log(moment(props.order.delivery_date).format('YYYY-MM-DD'));

  useEffect(() => {
    const _totalPrice = OrderDetail.reduce((acc, cur) => {
      if (cur.count > 0) {
        return acc + cur.price * cur.count;
      } else {
        return acc;
      }
    }, 0);
    setTotalPrice(_totalPrice);

    const _totalValue = OrderDetail.reduce((acc, cur) => {
      if (cur.count > 0) {
        return acc + cur.count * 1;
      } else {
        return acc;
      }
    }, 0);
    setTotalValue(_totalValue);
  }, [OrderDetail]);

  const onChangeAddress = (e) => {
    setNewAddress(e.currentTarget.value);
  };

  const onChangeDeliveryTime = (e) => {
    setDeliveryTime(e.currentTarget.value);
  };

  const changeOrderValue = (id, count) => {
    const NewOrderList = OrderDetail.map((item) =>
      item.id === id ? { ...item, count } : item
    );

    setOrderDetail(NewOrderList);
  };

  const onUpdateHandler = () => {
    setinputToggle(!inputToggle);
  };

  const reorderSubmit = (e) => {
    e.preventDefault();

    const body = {
      _id: props.order._id,
      order_detail: OrderDetail,
      total_quantity: TotalValue,
      total_price: TotalPrice,
      address: NewAddress,
      delivery_date: DeliveryDate,
      delivery_time: DeliveryTime,
    };

    Axios.post('/api/orders/updateorder', body).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        props.history.push('/');
      } else {
        alert('주문을 등록하는 것을 실패하였습니다. !!');
      }
    });
  };

  const onDeliveryDateHandler = () => {};

  return (
    <div>
      <Collapse accordion style={{ marginBottom: '8px' }}>
        <Panel
          header={`${props.orderDate}  |  ${props.order.writer.storename}  | 주문수량 : ${props.totalQuantity} | 주문금액 : ${props.totalPrice}`}
          key={props.index}
        >
          <Container>
            <form onSubmit={reorderSubmit}>
              <div style={{ display: 'flex' }}>
                <label>배송날짜 : </label>
                {inputToggle ? (
                  <span style={{ marginLeft: '5px' }}>
                    <input
                      value={moment(props.order.delivery_date).format(
                        'YYYY-MM-DD'
                      )}
                      onChange={onDeliveryDateHandler}
                      disabled={inputToggle}
                    />
                  </span>
                ) : (
                  <span>
                    <DatePicker
                      disabled={inputToggle}
                      selected={DeliveryDate}
                      onChange={(date) => setDeliveryDate(date)}
                      dateFormat='yyyy-MM-dd'
                      minDate={new Date()}
                      filterDate={(date) =>
                        date.getDay() !== 6 && date.getDay() !== 0
                      }
                    />
                  </span>
                )}
              </div>
              <div>
                <label>배송주소 : </label>
                <input
                  value={NewAddress}
                  onChange={onChangeAddress}
                  disabled={inputToggle}
                />
              </div>
              <div>
                <label>배송시간 : </label>
                <select
                  onChange={onChangeDeliveryTime}
                  value={DeliveryTime}
                  disabled={inputToggle}
                >
                  {DeliveryTimes.map((item) => (
                    <option key={item.key} value={item.value}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <h3>주문내역</h3>
              <hr />
              <article>
                <span>No</span>
                <span>제품명</span>
                <span>단가</span>
                <span>수량</span>
                <span>금액</span>
              </article>
              <ul>
                {props.order.order_detail.map((item, index) => (
                  <UpdateOrderItem
                    key={index}
                    item={item}
                    index={index}
                    changeOrderValue={changeOrderValue}
                    inputToggle={inputToggle}
                  />
                ))}
              </ul>

              <span>주문수량 : {nf.format(TotalValue)}박스</span>
              <span style={{ marginLeft: '50px' }}>
                주문금액 : {nf.format(TotalPrice)}원
              </span>

              {props.order.writer._id === props.userId && (
                <div style={{ marginTop: '10px', display: 'flex' }}>
                  {inputToggle ? (
                    <Button type='primary' onClick={onUpdateHandler}>
                      수정하기
                    </Button>
                  ) : (
                    <button>재주문하기</button>
                  )}

                  <Button
                    type='danger'
                    onClick={() => {
                      props.onDeleteHandler(props.order._id, props.userId);
                    }}
                  >
                    삭제하기
                  </Button>
                </div>
              )}
            </form>
          </Container>
        </Panel>
      </Collapse>
    </div>
  );
}

const Container = styled.div`
  form {
    padding: 10px;
    max-width: 800px;
    margin: 20px auto;

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
