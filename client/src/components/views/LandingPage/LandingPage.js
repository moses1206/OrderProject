import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Icon, Row, Table, Tag, Space } from 'antd';

import moment from 'moment';
import LandingPageTable from './LandingPageTable';
const nf = new Intl.NumberFormat();

function LandingPage() {
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
  }, []);

  const renderOrders = Orders.map((order, index) => {
    var neworder = order.order_detail;
    neworder.map((item, index) => {
      item.key = index;
      item.eachPrice = nf.format(item.price * item.count);
    });
    return (
      // <div key={index}>
      //   <span>점포명 : {order.writer.storename}</span>
      //   <span style={{ marginLeft: '40px' }}>
      //     주소 : {order.writer.shippingAddress}
      //   </span>
      //   <span style={{ marginLeft: '40px' }}>
      //     날짜 : {moment(order.delivery_date).format('YYYY MM DD')}
      //   </span>
      //   <span style={{ marginLeft: '40px' }}>시간 : {order.delivery_time}</span>

      //   <span style={{ marginLeft: '40px' }}>
      //     주문수량 : {order.total_quantity}
      //   </span>

      //   <span style={{ marginLeft: '40px' }}>
      //     주문금액 : {order.total_price}
      //   </span>
      // </div>
      <LandingPageTable
        writer={order.writer.storename}
        orderDate={moment(order.delivery_date).format('YYYY-MM-DD')}
        order={neworder}
        totalPrice={nf.format(order.total_price)}
        totalQuantity={order.total_quantity}
        key={index}
      />
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
