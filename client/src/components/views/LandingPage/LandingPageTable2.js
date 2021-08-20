import React from 'react';
import { Collapse, Table, Button } from 'antd';

const { Panel } = Collapse;
const nf = new Intl.NumberFormat();

export default function LandingPageTable(props) {
  const dataSource = props.order.order_detail;
  console.log(dataSource);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '제품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '수량',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '단가',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '금액',
      dataIndex: 'eachPrice',
      key: 'eachPrice',
    },
  ];

  return (
    <div>
      <Collapse accordion>
        <Panel
          header={`${props.orderDate}  |  ${props.order.writer.storename}  | 주문수량 : ${props.totalQuantity} | 주문금액 : ${props.totalPrice}`}
          key={props.index}
        >
          <Table dataSource={dataSource} columns={columns} key={props.index} />
          {props.order.writer._id === props.userId && (
            <Button
              type='primary'
              onClick={() =>
                props.onDeleteHandler(props.order._id, props.userId)
              }
            >
              Delete
            </Button>
          )}
        </Panel>
      </Collapse>
    </div>
  );
}
