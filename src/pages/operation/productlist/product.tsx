import * as React from "react";
import { Table } from 'antd';
import './product.less';
import Item from './components/listitem'

export default class Product extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      productDetail: false,
      headerActive: 0
    }
  }

  render() {
    const columns = [
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

    const data = [
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

    const { productDetail, headerActive } = this.state
    if (productDetail) {
      return (
        <div className='operationproduct'>
          <header className='productheader'>商品列表</header>
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
            <span>查询</span>
            <img src={require('../../../styles/img/exclamation.png')} />
            <p>有效库存:可被租赁或者售卖的所属权为该供应商的商品库存</p>
          </section>
          <hr />
          <section>
            <Table className='producttab' columns={columns} dataSource={data} bordered={true} />
          </section>
        </div>
      )
    } else {
      return (
        <div className='productdetail'>
          <header className='productheader'>商品详情页</header>
          <section className='producttab'>
            <span
              className={headerActive === 0 ? 'tabactive' : 'tabnormal'}
              onClick={() => this.setState({ headerActive: 0 })}
            >
              基本信息
            </span>
            <span
              className={headerActive === 1 ? 'tabactive' : 'tabnormal'}
              onClick={() => this.setState({ headerActive: 1 })}
            >
              图片
            </span>
          </section>
          {
            headerActive === 0 ? (
              <div>
                <section className='productmid'>
                  {
                    [
                      ['商品编号:', 'DD071A'],
                      ['商品名称:', '简约休闲针织外套'],
                      ['类目:', '女装'],
                      ['品牌:', 'MIRROR FUN'],
                      ['上架状态:', 'DD071A'],
                      ['创建时间：', 'YYYY-MM-DD hh:mm:ss'],
                      ['上架时间：', 'YYYY-MM-DD hh:mm:ss']
                    ].map((item, index) =>
                      <div className='productmiditem' key={index}>
                        <span>{item[0]}</span>
                        <span>{item[1]}</span>
                      </div>
                    )
                  }
                </section>
                <hr />
                <section>
                  <Table className='producttable' columns={columns} dataSource={data} bordered={true} />
                </section>
              </div>
            ) : (
                <div>
                  Helle
                </div>
              )
          }

        </div>
      )
    }
  }
}