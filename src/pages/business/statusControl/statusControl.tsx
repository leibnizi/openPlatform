import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload, Icon } from 'antd';
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
      baseStatusArray:[],
      othersStatusArray: [],
      canEditBaseStatus: false,
      canEditOthersStatus: false,
      imageHasChange: false,
      othersImageHasChange: false,
    }
  }

  baseStatusId = ''
  deleteStatusId = ''

  initStateFun =()=> {
    this.setState({
      // baseStatusArray: [],
      // othersStatusArray: [],
      canEditBaseStatus: false,
      canEditOthersStatus: false,
      imageHasChange: false,
      othersImageHasChange: false,
    })
    console.log("initStateFun")
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getStatusInfos())
  }
  statusDataToUploadNeed = (obj) => {
    // return { uid: - parseInt(obj.id), ...obj  }
    const { id, file, type_id } = obj
    return {
      uid: - id,
      id,
      url: file,
      type_id
    }
  }

  componentWillReceiveProps(nextProps) {
    const { statusInfos } = nextProps

    let baseStatus: any[] = []
    let othersStatus: any[] = []

    statusInfos.forEach(item => {
      const newItem = this.statusDataToUploadNeed(item)
      if (newItem.type_id === "基础资质") {
        baseStatus.push(newItem)
        this.baseStatusId = item.id
      }
      else if (newItem.type_id){
        othersStatus.push(newItem)
      }
    });
    this.setState({
      baseStatusArray: baseStatus,
      othersStatusArray: othersStatus,
    })
  }

  //已经上传cdn的图片数组
  hasUploadImagesUrls: any = []
  hasUploadOrdersImagesUrls: any = []

  baseImageResultFun = ({ file, fileList, file: { status, response } }: any) => {
      if (status === 'done') {
        const url:any = response.data[0].url;
        this.hasUploadImagesUrls.push({
          file: url,
          type_id: 1
        })
        // debugger
        // this.statusDataToUploadNeed({

        // })
        const that = this
        const newBaseStatusArray = {
          uid: - that.baseStatusId,
          id: that.baseStatusId,
          url,
          type_id:'基础资质'
        }
        this.setState({
          baseStatusArray: [newBaseStatusArray],
          imageHasChange: true,
        })
        // setTimeout(() => {
        //   console.log(this.state.imageHasChange)
        // }, 1);
      }
      else{
        this.setState({
          baseStatusArray: fileList,
          // imageHasChange: true,
        });
      }
  }


  editOrAddBaseStatus = () => {
    const { dispatch } = this.props
    console.log(this.state.baseStatusArray,"??>>>>>")
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
    if (status === 'done') {
      const url: any = response.data[0].url;
      this.hasUploadOrdersImagesUrls.push({
        file: url,
        type_id: 2
      })

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

  addOthersStatus = () => {
    const { dispatch } = this.props
    dispatch(handleUploadAdd(this.hasUploadOrdersImagesUrls))
    this.hasUploadOrdersImagesUrls = []
  }

  deleteStatusFun = (file) => {
    const { dispatch } = this.props
    dispatch(deleteStatus(file.id))
    this.baseStatusId = ''
    this.initStateFun()
  }

  showEditBtn = () => {
    this.setState({
      canEditBaseStatus: true
    })
  }

  showOthersEditBtn = () => {
    this.setState({
      canEditOthersStatus: true
    })
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

  render() {
    console.log(this.baseStatusId, "??>>>>><<")
    const { 
      previewVisible, 
      canEditBaseStatus,
      canEditOthersStatus,
      baseStatusArray,
      othersStatusArray,
      imageHasChange,
      othersImageHasChange 
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">修改基础资质</div>
      </div>
    );
    console.log(canEditBaseStatus,"???",imageHasChange)
    
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
                  <div style={{marginLeft:'16px'}}>营业执照：</div>
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
                  <div className="no-status" style={{ display: `${!canEditBaseStatus && !imageHasChange && !baseStatusArray.length ? "flex" : "none"}`}}>
                    暂无营业执照
                  </div>
                  <Upload
                    action='http://api.v2.msparis.com/common/upload'
                    listType="picture-card"
                    fileList={baseStatusArray}
                    // onPreview={this.handlePreview}
                    onRemove={(file) => { this.deleteStatusFun(file) }}
                    onChange={this.baseImageResultFun}
                  >
                    {canEditBaseStatus ? uploadButton : null}
                  </Upload>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="tab-content tab2" tab="补充资质" key="2">
              <Row type="flex" className="status-content-box">
                <Col className="content-title-sider">
                  <div style={{marginLeft:'16px'}}>补充资质：</div>
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
                  <div 
                    className="no-status"
                    style={{ display: `${!canEditOthersStatus && !othersImageHasChange && !othersStatusArray.length ? "flex" : "none"}` }}
                  >
                    暂无补充资质
                  </div>
                  <Upload
                    action='http://api.v2.msparis.com/common/upload'
                    listType="picture-card"
                    fileList={othersStatusArray}
                    // onPreview={this.handlePreview}
                    onRemove={(file) => { this.deleteStatusFun(file) }}
                    onChange={this.othersImageResultFun}
                  >
                    {canEditOthersStatus ? uploadButton : null}
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