import React, { useState } from 'react';
import { Collapse, Table, Button } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;
const nf = new Intl.NumberFormat();

export default function LandingPageTable(props) {
  const [NewAddress, setNewAddress] = useState(props.order.address);
  const [DeliveryTime, setDeliveryTime] = useState(props.order.delivery_time);
  const [OrderDetail, setOrderDetail] = useState(props.order.order_detail);
  const [OrderValue, setOrderValue] = useState(0);

  console.log(props.order.order_detail);
  console.log('OrderDetail', OrderDetail);
  const onChangeAddress = (e) => {
    setNewAddress(e.currentTarget.value);
  };

  const onChangeDeliveryTime = (e) => {
    setDeliveryTime(e.currentTarget.value);
  };

  const onChangeOrderValue = (e) => {};
  return (
    <div>
      <Collapse accordion style={{ marginBottom: '8px' }}>
        <Panel
          header={`${props.orderDate}  |  ${props.order.writer.storename}  | 주문수량 : ${props.totalQuantity} | 주문금액 : ${props.totalPrice}`}
          key={props.index}
        >
          <Container>
            <form>
              <div>
                <label>배송주소 : </label>
                <input value={NewAddress} onChange={onChangeAddress} disabled />
              </div>
              <div>
                <label>배송시간 : </label>
                <input
                  value={DeliveryTime}
                  onChange={onChangeDeliveryTime}
                  disabled
                />
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
                {OrderDetail.map((item, index) => (
                  <li key={index}>
                    <span>{index + 1}</span>
                    <span>{item.name}</span>
                    <span>{nf.format(item.price)}</span>
                    <input
                      value={item.count}
                      onChange={onChangeOrderValue}
                      disabled
                    ></input>
                    <span>{nf.format(item.price * (item.count * 1))}원</span>
                  </li>
                ))}
              </ul>

              {props.order.writer._id === props.userId && (
                <div style={{ marginTop: '10px', display: 'flex' }}>
                  <Button type='primary'>수정하기</Button>
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
