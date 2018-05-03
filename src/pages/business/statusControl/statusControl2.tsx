import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload } from 'antd';
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'
// import { EditStatusForm } from './components/EditStatusForm'
import './statusControl.less'
import { handleUploadBase, handleUploadAdd,  business as businessAction } from '../../../redux/actions/index'

const { getStatusInfos, deleteStatus } = businessAction
const TabPane = Tabs.TabPane;

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
      isEdit:false,
      changeBaseStatusMsg:{
        statusUrl:"",
        id:""
      },
      addOthersStatusMsg: {
        addOthersStatusUrl: "",
        id: ""
      },
      hasChange: false//是否替换了图片
    }
  }
  baseStatusId:''
  changeTabFun() {
    
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getStatusInfos())
  }
  componentWillReceiveProps(nextProps:{statusInfos:any}){
    const { statusInfos, deleteStatusId }: any = nextProps
    let baseStatus: any[] = []
    let othersStatus:any[] = []
    for (let i = 0; i < statusInfos.length; i++) {
      if (statusInfos[i].type_id === "基础资质") {
        baseStatus.push(statusInfos[i])
        this.baseStatusId = baseStatus[0].id;
      }
      else if (statusInfos[i].type_id === "补充资质" && statusInfos[i].id != deleteStatusId ){
        othersStatus.push(statusInfos[i])
      }
    }
    console.log(deleteStatusId,"mmmmm")
    if (!this.state.baseStatus.length) {
      this.setState({
        baseStatus,
      })
    }
    if (!this.state.othersStatus.length) {
      this.setState({
        othersStatus,
      })
    }
  }

  editStatusCard = (file:any, id:any) => {
    // const { dispatch } = this.props

  }

  deleteStatusCard = (id:any) => {
    const { dispatch } = this.props
    dispatch(deleteStatus(id))
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

  handleChangeOthers = (file:any) => {
    
  };

  // type = 1 是基础资质 2是补充资质
  handleUploadBase = (type: any) => {
    const { dispatch } = this.props
    const { changeBaseStatusMsg } = this.state

    if (this.baseStatusId) {
      dispatch(handleUploadBase({
        ...changeBaseStatusMsg,
        type_id: 1,
      }))
    } else{
      dispatch(handleUploadAdd({
        statusMsg: {
          file: changeBaseStatusMsg.statusUrl,
          type_id: 1,
        },
      }))
    }

    this.setState({
      isEdit: false,
      hasChange: false
    })
  }

  closeEditFun = () => {
    this.setState({
      isEdit: false,
      hasChange: false
    })
  }

  showEditStatus = () => {
    this.setState({
      isEdit: true
    })
  }

  render() {
    const { editStatusVisible, editStatusloading, previewVisible, previewImage, uploading, isEdit, hasChange } = this.state
    const props1 = {
      name: 'file',
      action: 'http://api.v2.msparis.com/common/upload',
      fileList: this.state.baseStatus,
      onRemove: (e: any) => {
        const { dispatch } = this.props
        dispatch(deleteStatus(this.baseStatusId))
      },
      onChange: ({ file, fileList, file: { status, response } }:any) => {
        console.log(file,"JJJ", fileList,)
        if (status === 'done') {
          // message.success("图片上传成功");
          this.setState({
            changeBaseStatusMsg:{
              statusUrl: response.data[0].url,
              id: this.baseStatusId
            }
          });
        }

        this.setState({ 
          baseStatus: [file],
          hasChange: true
        });
        return false
      },
    };

    const props2 = {
      name: 'file',
      action: 'http://api.v2.msparis.com/common/upload',
      fileList: this.state.othersStatus,
      onRemove: (e:any) => {
        // debugger
        const { dispatch } = this.props
        dispatch(deleteStatus(e.id))
      },
      onChange: ({ file, fileList, file: { status, response } }: any) => {
        if (status === 'done') {
          const { dispatch } = this.props
          console.log(response.data[0],"@@!!!!!")
          dispatch(handleUploadAdd({
            statusMsg:{
              file: response.data[0].url,
              type_id: 2,
            },
          }))
        }

        this.setState({
          othersStatus: fileList,
          // hasChange: true
        });
        // return false
      },
    };
    
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
                      style={{ display: `${isEdit && hasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={() => { this.handleUploadBase(1) }}
                      // disabled={this.state.fileList.length === 0}
                      // loading={uploading}
                      // ant-upload-select-picture-card
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${!isEdit && !hasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={this.showEditStatus}
                      // disabled={this.state.fileList.length === 0}
                      loading={uploading}
                    >
                      修改基本资质
                    </Button>
                    <Button
                      style={{ display: `${isEdit && !hasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      onClick={this.closeEditFun}
                      // disabled={this.state.fileList.length === 0}
                      loading={uploading}
                    >
                      取消
                    </Button>
                  </div>
                </Col>
                <Col span={21} className="tab-content-right">
                  <Row>
                    <Col>
                      <Upload
                        listType="picture-card"
                        {...props1}
                      >
                        {isEdit ? <Button type="primary">修改</Button> : null}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </Col>
                  </Row>
                {/* {
                  this.state.baseStatus.length ? 
                    <Row>
                      <Col>
                        <Upload
                          listType="picture-card"
                          {...props1}
                        >
                          {isEdit ? <Button type="primary">修改</Button> : null}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                      </Col>
                      </Row> : <div className="no-status">
                        <div className="no-status-content">
                          <Upload
                            listType="picture-card"
                            {...props1}
                          >
                            {isEdit ? <Button type="primary">添加资质</Button> : null}
                          </Upload>
                        </div>
                        </div>
                } */}
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
                <Col span={21} className="tab-content-right">
                  {
                    // this.state.othersStatus.length ? 
                    <Upload
                      listType="picture-card"
                      {...props2}
                    >
                      <Button type="primary">修改补充资质</Button>
                    </Upload> 
                    // : <div className="no-status">
                    //     <div className="no-status-content">暂无资质</div>
                    //   </div>
                  }
                </Col>
                
              </Row>
            </TabPane>
          </Tabs>
        </section>
        {/* <Modal 
          title="Title"
          visible={editStatusVisible}
          onOk={this.handleOk}
          confirmLoading={editStatusloading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditStatusForm />
        </Modal> */}
      </div>
    )
  }
}

const mapStateToProps: any = ({ statusInfos, userInfo, deleteStatusId }: any) => {
  return ({
  statusInfos,
  userInfo,
  deleteStatusId
})
}

const mapDispatchToProps: any = (dispatch: any) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusControl)