import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload, Icon, message } from 'antd';
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'
// import { EditStatusForm } from './components/EditStatusForm'
import './statusControl.less'
import { handleUploadBase, handleUploadAdd, business as businessAction } from '../../../redux/actions/index'

const { getStatusInfos, deleteStatus } = businessAction
const TabPane = Tabs.TabPane;

class StatusControl extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      previewVisible: false,
      baseStatusArray: [],
      othersStatusArray: [],
      canEditBaseStatus: false,
      canEditOthersStatus: false,
      imageHasChange: false,
      othersImageHasChange: false
    }
  }

  baseStatusId = ''
  deleteStatusId = ''

  initStateFun = () => {
    this.setState({
      // baseStatusArray: [],
      // othersStatusArray: [],
      canEditBaseStatus: false,
      canEditOthersStatus: false,
      imageHasChange: false,
      othersImageHasChange: false,
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getStatusInfos())
  }
  statusDataToUploadNeed = (obj) => {
    const { id, file, type_id } = obj
    return {
      uid: - id,
      id,
      url: file,
      type_id
    }
  }

  componentWillReceiveProps(nextProps) {
    const { statusInfos, statusInfos: { state } } = nextProps

    let baseStatus: any[] = []
    let othersStatus: any[] = []

    statusInfos.data.forEach(item => {
      const newItem = this.statusDataToUploadNeed(item)
      if (newItem.type_id === "基础资质") {
        baseStatus.push(newItem)
        this.baseStatusId = item.id
      }
      else if (newItem.type_id) {
        othersStatus.push(newItem)
      }
    })
    if (state === 1) {
      this.setState({ 
        canEditOthersStatus: false, 
        canEditBaseStatus: false,
        othersImageHasChange: false
      })
    }
    this.setState({
      baseStatusArray: baseStatus,
      othersStatusArray: othersStatus,
    })
  }

  //已经上传cdn的图片数组
  hasUploadImagesUrls: any = []

  baseImageResultFun = ({ file, fileList, file: { status, response } }: any) => {
    console.log('file', file, fileList, ["image/png", "image/jpeg"].indexOf(file.type))
    if (file.size > 3000000) {
      Modal.warning({
        title: '警告',
        content: '图片不能大于3M',
        okText: '确定',
        onOk() {

        },
      })
    } else if (file.type && ["image/png", "image/jpeg"].indexOf(file.type) === -1) {
      Modal.warning({
        title: '警告',
        content: '图片格式为JPG、PNG',
        okText: '确定',
        onOk() {

        },
      })
      return
    } else if (status === 'done') {
      const url: any = response.data[0].url;
      this.hasUploadImagesUrls.push({
        file: url,
        type_id: 1
      })
      const that = this
      const newBaseStatusArray = {
        uid: - that.baseStatusId,
        id: that.baseStatusId,
        url,
        type_id: '基础资质'
      }
      this.setState({
        baseStatusArray: [newBaseStatusArray],
        imageHasChange: true,
      })
      // setTimeout(() => {
      // }, 1);
    }
    else {
      this.setState({
        baseStatusArray: fileList,
        // imageHasChange: true,
      });
    }
  }

  editOrAddBaseStatus = () => {
    const { dispatch } = this.props
    if (this.baseStatusId) {
      dispatch(handleUploadBase({
        statusUrl: this.hasUploadImagesUrls[0].file,
        id: this.baseStatusId
      }))
      this.hasUploadImagesUrls = []
    } else {
      dispatch(handleUploadAdd(this.hasUploadImagesUrls))
      this.hasUploadImagesUrls = []
    }

    this.setState({
      canEditBaseStatus: false,
      imageHasChange: false,
    })
  }

  othersImageResultFun = ({ file, fileList, file: { status, response } }: any) => {
    const { dispatch } = this.props
    if (file.size > 3000000) {
      Modal.warning({
        title: '警告',
        content: '图片不能大于3M',
        okText: '确定',
        onOk() {
         
        },
      })
    } else if (file.type && ["image/png", "image/jpeg"].indexOf(file.type) === -1) {
      Modal.warning({
        title: '警告',
        content: '图片格式为JPG、PNG',
        okText: '确定',
        onOk() {
          
        },
      })
      return
    } else if (status === 'done') {
      this.setState({
        othersImageHasChange: true
      })
    }
    else {
      this.setState({
        othersStatusArray: fileList,
        // othersImageHasChange: true
      });
    }
  }

  removeImg = (e:any) => {
    const { othersStatusArray } = this.state
    if (e.id) {
      message.error('原来审核通过的图片不能删除，只能删除新增加的图片')
      return false
    } else if (e.thumbUrl && othersStatusArray.filter(res => res.thumbUrl).length === 1) {
      this.setState({ 
        othersImageHasChange: false
      })
      return true
    } else {
      this.setState({
        othersImageHasChange: true
      })
      return true
    }
  }

  addOthersStatus = () => {
    const { dispatch } = this.props
    const { othersStatusArray } = this.state
    const data: any = []
    othersStatusArray.map((item: any, index: number) => {
      if (item.thumbUrl) {
        data.push({
          file: item.response.data[0].url,
          type_id: 2
        })
      }
    })
    dispatch(handleUploadAdd(data))
  }

  deleteStatusFun = (file) => {
    const { dispatch } = this.props
    dispatch(deleteStatus(file.id))
    this.baseStatusId = ''
    this.initStateFun()
  }

  showEditBtn = () => {
    const { statusInfos: { state } } = this.props
    if (state === 1) {
      message.error('有信息正在审核中')
    } else {
      this.setState({
        canEditBaseStatus: true
      })
    }
  }

  showOthersEditBtn = () => {
    const { statusInfos: { state } } = this.props
    if (state === 1) {
      message.error('有信息正在审核中')
    } else {
      this.setState({
        canEditOthersStatus: true
      })
    }
  }

  hideOthersEditBtn = () => {
    this.setState({
      canEditOthersStatus: false
    })
  }


  hideEditBtn = () => {
    this.setState({
      canEditBaseStatus: false
    })
  }

  checkBeforeUpload = (file) => {
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('图片不能大于3M!');
    }
    return isLt3M
  }

  render() {
    const {
      previewVisible,
      canEditBaseStatus,
      canEditOthersStatus,
      baseStatusArray,
      othersStatusArray,
      imageHasChange,
      othersImageHasChange,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">修改资质</div>
      </div>
    );

    return (
      <div className="status-container">
        {/* content-title 这个样式是公用的 在common里 */}
        <header className="content-title">资质管理</header>
        <section className="">
          <Tabs
            tabBarGutter={10}
            type="card"
            className="tabs-container"
          >
            <TabPane className="tab-content tab1" tab="基本资质" key="1">
              <Row type="flex" className="status-content-box">
                <Col className="content-title-sider">
                  <div style={{ marginLeft: '16px' }}>营业执照：</div>
                  <div>
                    <Button
                      style={{ display: `${canEditBaseStatus && imageHasChange ? "block" : "none"}` }}
                      className="status-btn-base"
                      type="primary"
                      onClick={() => { this.editOrAddBaseStatus() }}
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${!canEditBaseStatus && !imageHasChange ? "block" : "none"}` }}
                      className="status-btn-base"
                      type="primary"
                      onClick={this.showEditBtn}
                    // disabled={this.state.fileList.length === 0}
                    >
                      修改基本资质
                    </Button>
                    <Button
                      style={{ display: `${canEditBaseStatus && !imageHasChange ? "block" : "none"}` }}
                      onClick={this.hideEditBtn}
                      className="status-btn-base"
                    >
                      取消
                    </Button>
                  </div>
                </Col>
                <Col className="status-content">
                  <Upload
                    action='http://api.v2.msparis.com/common/upload'
                    listType="picture-card"
                    fileList={baseStatusArray}
                    showUploadList={{ showRemoveIcon:false }}
                    onChange={this.baseImageResultFun}
                  >
                    {!canEditBaseStatus ? null : uploadButton }

                  </Upload>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="tab-content tab2" tab="补充资质" key="2">
              <Row type="flex" className="status-content-box">
                <Col className="content-title-sider">
                  <div style={{ marginLeft: '16px' }}>补充资质：</div>
                  <div>
                    <Button
                      style={{ display: `${canEditOthersStatus && othersImageHasChange ? "block" : "none"}` }}
                      className="status-btn-base"
                      type="primary"
                      onClick={() => { this.addOthersStatus() }}
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${!canEditOthersStatus && !othersImageHasChange ? "block" : "none"}` }}
                      className="status-btn-base"
                      type="primary"
                      onClick={this.showOthersEditBtn}
                    // disabled={this.state.fileList.length === 0}
                    >
                      修改补充资质
                    </Button>
                    <Button
                      style={{ display: `${canEditOthersStatus && !othersImageHasChange ? "block" : "none"}` }}
                      onClick={this.hideOthersEditBtn}
                      className="status-btn-base"
                    >
                      取消
                    </Button>
                  </div>
                </Col>
                <Col className="status-content">
                  <Upload
                    action='http://api.v2.msparis.com/common/upload'
                    listType="picture-card"
                    fileList={othersStatusArray}
                    showUploadList={canEditOthersStatus ? { showRemoveIcon:true } : { showRemoveIcon:false }}
                    beforeUpload={this.checkBeforeUpload}
                    onChange={this.othersImageResultFun}
                    onRemove={this.removeImg}
                  >
                    {canEditOthersStatus && othersStatusArray.length <=20 ? uploadButton : null}
                  </Upload>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </section>
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