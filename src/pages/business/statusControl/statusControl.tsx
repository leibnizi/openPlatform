import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload } from 'antd';
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'
import { EditStatusForm } from './components/EditStatusForm'

import { business as businessAction } from '../../../redux/actions/index'
const { getStatusInfos, deleteStatus } = businessAction
const TabPane = Tabs.TabPane;
const Dragger = Upload.Dragger;

class StatusControl extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state= {
      cardList: [1,2,3,4],
      editStatusloading: false,
      editStatusVisible: false
    }
  }
  
  changeTabFun() {
    console.log(1)
  }

  componentDidMount() {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(getStatusInfos(token))
  }

  renderCard(cardList:any) {
    return cardList.map((item: any, index: any) => {
      return (
        <Col className="status-card" span={8} key={index}>
          <StatusCard 
            key={item.id}
            {...item}
            editFun={this.editStatusCard}
            deleteFun={this.deleteStatusCard}
          />
        </Col>
      )
    })
  }

  editStatusCard = (file:any, id:any) => {
    console.log(file, id,"WW")
    // const { dispatch, userInfo: { token } } = this.props
    // dispatch(getBusinessInfos(token))
  }

  deleteStatusCard = (id:any) => {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(deleteStatus(token, id))
  }

  handleOk = () => {
    console.log("OK")
  }
  handleCancel = () => {
    console.log("handleCancel")
  }

  render() {
    const { editStatusVisible, editStatusloading } = this.state
    const { statusInfos } = this.props
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
              <Row className="tab-content-box">
                <Col className="tab-content-left" span={3}>
                  <div>
                    营业执照：
                  </div>
                  <div className="btn-box">
                    <Button>
                      提交
                    </Button>
                  </div>
                </Col>
                <Col span={21}>
                  <Row>
                    {this.renderCard(statusInfos)}
                    <Col span={8} className="content-btn">
                      <Dragger style={{width: '200px'}}>
                        添加
                      </Dragger>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="补充资源" key="2">
              <Row className="tab-content-box">
                {this.renderCard(statusInfos)}
                <Col span={8} className="content-btn">
                  <Dragger style={{ width: '200px' }}>
                    添加
                  </Dragger>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </section>
        <Modal 
          title="Title"
          visible={editStatusVisible}
          onOk={this.handleOk}
          confirmLoading={editStatusloading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditStatusForm />
        </Modal>
        {/* <Modal
          visible={editStatusVisible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // footer={[
          //   <Button key="back" onClick={this.handleCancel}>Return</Button>,
          //   <Button 
          //     key="submit" 
          //     type="primary" 
          //     loading={editStatusloading} 
          //     onClick={this.handleOk}
          //   >
          //     Submit
          //   </Button>,
          // ]}
        >
          <EditStatusForm />
        </Modal> */}
      </div>
    )
  }
}

const mapStateToProps: any = ({ statusInfos, userInfo }: any) => ({
  statusInfos,
  userInfo
})

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusControl)