import React from 'react';
import { Collapse, Table, Tag, Space } from 'antd';

const { Panel } = Collapse;

export default function LandingPageTable(props) {
  const dataSource = props.order;
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
          header={`${props.orderDate}  |  ${props.writer}  | 주문수량 : ${props.totalQuantity} | 주문금액 : ${props.totalPrice}`}
          key={props.index}
        >
          <Table dataSource={dataSource} columns={columns} key={props.index} />;
          {/* <article>
            <span>No</span>
            <span>제품명</span>
            <span>단가</span>
            <span>수량</span>
            <span>금액</span>
          </article>
          <ul>
            {props.order.map((item, index) => (
              <li key={index}>
                <span>{index + 1}</span>
                <span>{item.name}</span>
                <span>{nf.format(item.price)}</span>
                <span>{item.count}</span>
                <span>{nf.format(item.price * (item.count * 1))}원</span>
              </li>
            ))}
          </ul> */}
        </Panel>
      </Collapse>
    </div>
  );
}
