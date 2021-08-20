import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Icon, Row, Button } from 'antd';

import moment from 'moment';
import LandingPageTable from './LandingPageTable';
const nf = new Intl.NumberFormat();

function LandingPage(props) {
  const [Orders, setOrders] = useState([]);

  const getOrders = () => {
    Axios.get('/api/orders/getorders').then((response) => {
      if (response.data.success) {
        setOrders(response.data.ordersInfo);
        console.log(response.data.ordersInfo);
      } else {
        alert('주문내역을 가져오는 것을 실패하였습니다. !!');
      }
    });
  };

  useEffect(() => {
    getOrders();
    console.log(Orders);
  }, []);

  const renderOrders = Orders.map((order, index) => {
    let neworder = order.order_detail;
    neworder.map((item, index) => {
      item.key = index;
      item.eachPrice = nf.format(item.price * item.count);
    });

    const onDeleteHandler = (orderId, userId) => {
      const variables = {
        orderId,
        userId,
      };

      Axios.post('/api/orders/deleteorder', variables).then((response) => {
        if (response.data.success) {
          getOrders();
          console.log('주문 삭제하기', response.data);
        } else {
          alert('리스트에서 지우는데 실패하였습니다.!!');
        }
      });
    };

    return (
      <div key={index}>
        <LandingPageTable
          writer={order.writer.storename}
          orderDate={moment(order.delivery_date).format('YYYY-MM-DD')}
          order={order}
          totalPrice={nf.format(order.total_price)}
          totalQuantity={order.total_quantity}
          onDeleteHandler={onDeleteHandler}
          userId={props.user.userData._id}
        />
      </div>
    );
  });

  return (
    <div style={{ width: '65%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          주문 리스트 <Icon type='rocket' />{' '}
        </h2>
        <hr />
        <br />
      </div>

      <Row gutter={[16, 16]}>{renderOrders}</Row>
      <br />
    </div>
  );
}

export default LandingPage;
