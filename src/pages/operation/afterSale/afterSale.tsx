import * as React from 'react'
import { Table } from 'antd'
import './afterSale.less';
import Item from '../../../components/productlist/listitem'

export default class AfterSale extends React.Component<any, any> {
  constructor(props: Object) {
    super(props)
    this.state = {

    }
  }

  queryData = () => {
    console.log('查询')
  }

  render() {
    const columns: any[] = [
      {
        title: '商品编号',
        dataIndex: 'name',
        render: (text: string) => <a href="#">{text}</a>
      }, {
        title: '商品名称',
        className: 'column-money',
        dataIndex: 'money'
      }, {
        title: '商品主图',
        dataIndex: 'address'
      }, {
        title: '品牌',
        dataIndex: 'pinpai'
      }, {
        title: '商品模式',
        dataIndex: 'moshi'
      }, {
        title: '创建时间',
        dataIndex: 'chuangjianshijian'
      }, {
        title: '上架时间',
        dataIndex: 'shangjianshijian'
      }, {
        title: '商品状态',
        dataIndex: 'zhuangtgai'
      }
    ];

    const data: any[] = [
      {
        key: '1',
        name: 'John Brown',
        money: ' ',
        address: ' '
      }, {
        key: '2',
        name: 'Jim Green',
        money: ' ',
        address: ' '
      }, {
        key: '3',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '4',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '5',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '6',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '7',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '8',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '9',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '10',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }, {
        key: '11',
        name: 'Joe Black',
        money: ' ',
        address: ' '
      }
    ];

    return (
      <div className='operationproduct'>
        <header className='productheader'>售后管理</header>
        <section>
          {
            ['商品编号', '商品名称', '商品货号', '商品状态', '商品模式', '商品类目', 'SPU是否启用'].map((item, index) =>
              <Item
                key={index}
                itemname={item}
              />
            )
          }
        </section>
        <section className='productmid'>
          <span
            onClick={()=>this.queryData()}
          >
            查询
          </span>
          <img src={require('../../../styles/img/exclamation.png')} />
          <p>有效库存:可被租赁或者售卖的所属权为该供应商的商品库存</p>
        </section>
        <hr />
        <section>
          <Table className='producttab' columns={columns} dataSource={data} bordered={true} />
        </section>
      </div>
    )
  }
}
