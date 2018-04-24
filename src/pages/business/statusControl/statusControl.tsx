import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload } from 'antd';
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'
import { EditStatusForm } from './components/EditStatusForm'
import './statusControl.less'
import { uploadImage, business as businessAction } from '../../../redux/actions/index'

// uploadImage
const { getStatusInfos, deleteStatus } = businessAction

const TabPane = Tabs.TabPane;
// const Dragger = Upload.Dragger;

class StatusControl extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state= {
      cardList: [1,2,3,4],
      editStatusloading: false,
      editStatusVisible: false,
      previewVisible: false,
      previewImage: '',
      uploading: false,
      baseStatus:[],
      othersStatus: [],
      baseFile:[],
      isEdit:false
    }
  }
  
  changeTabFun() {
    
  }

  componentDidMount() {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(getStatusInfos(token))
  }
  componentWillReceiveProps(nextProps:any){
    const { statusInfos } = nextProps
    let baseStatus = []
    let othersStatus = []
    for (let i = 0; i < statusInfos.length; i++) {
      // const element = array[index];
      if (statusInfos[i].type_id === "基础资质") {
        baseStatus.push(statusInfos[i])
      }
      else if (statusInfos[i].type_id === "补充资质"){
        othersStatus.push(statusInfos[i])
      }
    }
    this.setState({
      baseStatus,
      othersStatus
    })
    // const baseStatus = statusInfos.map((item:any) => {
    //   return 
    // })
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
    // const { dispatch, userInfo: { token } } = this.props
    // dispatch(getBusinessInfos(token))
  }

  deleteStatusCard = (id:any) => {
    const { dispatch, userInfo: { token } } = this.props
    dispatch(deleteStatus(token, id))
  }

  handleOk = () => {
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file:any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangeBase = (file:any) => {
    console.log(file,"TTT")
    // const { dispatch } = this.props
    // dispatch({
    //   type:"CHEANGE_BASE_STATUS",
    //   data: fileList
    // })
    // this.setState({ fileList })
  }

  handleChangeOthers = (file:any) => {
    console.log(file,"WWWWW")
  };

  // type = 1 是基础资质 2是补充资质
  handleUpload = (type: any=1) => {
    console.log(uploadImage,"@@@")
    // const { baseFile, baseStatus } = this.state;
    // const { dispatch, userInfo: { token } } = this.props;
    // const formData = new FormData();
    // baseFile.forEach((file:any) => {
    //   formData.append('file', file);
    // });
    // console.log(formData,"PPP")
    // dispatch(uploadImage(formData, token, baseStatus[0].id, type))
    
    // this.setState({TTT
    //   uploading: true,
    // });
  }

  showEditStatus = () => {
    this.setState({
      isEdit: true
    })
  }

  render() {
    const { editStatusVisible, editStatusloading, baseStatus, othersStatus, previewVisible, previewImage, uploading, isEdit } = this.state
    // const { statusInfos } = this.props
    const beforeUploadFun = {
      beforeUpload: (file:any) => {
        this.setState(({ baseFile }: any) => ({
          baseFile: [...baseFile, file],
        }));
        return false;
      },
    }
    
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
            <TabPane className="tab-content tab1" tab="基本资质" key="1">
              <Row className="tab-content-box">
                <Col className="tab-content-left" span={3}>
                  <div>
                    营业执照：
                  </div>
                  <div className="btn-box">
                    <Button
                      style={{ display: `${isEdit ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={this.handleUpload}
                      // disabled={this.state.fileList.length === 0}
                      // loading={uploading}
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${isEdit ? "none" : "block"}`}}
                      className="upload-demo-start"
                      type="primary"
                      onClick={this.showEditStatus}
                      // disabled={this.state.fileList.length === 0}
                      loading={uploading}
                    >
                      修改基本资质
                    </Button>
                  </div>
                </Col>
                <Col span={21}>
                  <Row>
                    <Col>
                      <Upload
                        action="http://api.v2.msparis.com/common/upload"
                        listType="picture-card"
                        fileList={baseStatus}
                        onPreview={this.handlePreview}
                        onChange={this.handleChangeBase}
                        {...beforeUploadFun}
                      >
                        {/* {fileList.length >= 3 ? null : uploadButton} */}
                        {/* {uploadButton} */}
                        <Button style={{ display: `${isEdit ? "block" : "none"}` }}>修改</Button>
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="tab-content tab2"  tab="补充资源" key="2">
              <Row className="tab-content-box">
                <Col className="tab-content-left" span={3}>
                  <div>
                    补充资质：
                  </div>
                  <div className="btn-box">
                  </div>
                </Col>
                <Upload
                  action="http://api.v2.msparis.com/common/upload"
                  listType="picture-card"
                  fileList={othersStatus} 
                  onPreview={this.handlePreview}
                  onChange={this.handleChangeOthers}
                >
                  {/* {fileList.length >= 3 ? null : uploadButton} */}
                  {/* {uploadButton} */}
                  <Button>修改补充资质</Button>
                </Upload>
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