import * as React from "react";
import { Tabs, Row, Col, Button } from 'antd';
const TabPane = Tabs.TabPane;
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'

class StatusControl extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state= {
      cardList: [1,2,3,4]
    }
  }
  
  changeTabFun() {
    console.log(1)
  }

  // componentDidMount() {
  //   const { token } = this.props.state.userInfo;
  //   fetch(`/api/qualification/index?token=${token}`).then((res) => {
  //     // debugger;
  //     return res.json();
  //   })
  // }

  renderCard() {

    return this.state.cardList.map((item: any, index: any) => {
      return (
        <Col className="status-card" span={8} key={index}>
          <StatusCard />
        </Col>
      )
    })
    
  }

  render() {

    return (
      <div className="status-container">
        {/* content-title 这个样式是公用的 在common里 */}
        <header className="content-title">资质管理</header>
        <section className="status-content"> 
          <Tabs 
            onChange={this.changeTabFun} 
            tabBarGutter={10}
            type="card"
            className="tabs-container"
          >
            <TabPane className="tab-content" tab="基本资质" key="1">
              <div className="tab-content-left">
                <div>
                  营业执照：
                </div>
                <div className="btn-box">
                  <Button>
                    提交
                  </Button>
                </div>
              </div>
              <div className="tab-content-right">
                <div className="img-box">
                  <img width="100%" src="" alt=""/>
                </div>
                <div className="amend-box">
                  <Button>
                    修改
                  </Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="补充资源" key="2">
              <Row>
                {this.renderCard()}
                <Col span={8} className="content-btn">
                  <Button>
                    添加
                  </Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </section>
      </div>
    )
  }
}

const mapStateToProps: any = (state: object) => ({
  state: state
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusControl)