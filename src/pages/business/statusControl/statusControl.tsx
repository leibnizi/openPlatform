import * as React from "react";
import { Tabs, Row, Col, Button, Modal, Upload, Icon } from 'antd';
import { StatusCard } from '../components/statusCard/StatusCard'
import { connect } from 'react-redux'
// import { EditStatusForm } from './components/EditStatusForm'
import './statusControl.less'
import { handleUploadBase, handleUploadAdd, business as businessAction } from '../../../redux/actions/index'

const { getStatusInfos, deleteStatus } = businessAction
const TabPane = Tabs.TabPane;
const baseStatusData = {
  "id": 0,
  "user_id": "",
  "file": "",
  "type_id": "",
  "state": ""
}

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
      changeBaseStatusMsg:{}, 
    }
  }

  baseStatusId = ''
  deleteStatusId = ''

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
    console.log(nextProps.statusInfos,"hhg")
    const { statusInfos, deleteStatusId } = nextProps

    let baseStatus: any[] = []
    let othersStatus: any[] = []

    statusInfos.forEach(item => {
      const newItem = this.statusDataToUploadNeed(item)
      if (newItem.type_id === "基础资质") {
        baseStatus.push(newItem)
        this.baseStatusId = item.id
        // if (deleteStatusId) {
        //   this.baseStatusId
        // }
      }
      else if (newItem.type_id){
        othersStatus.push(newItem)
      }

      if (!this.state.baseStatusArray.length) {
        this.setState({
          baseStatusArray: baseStatus,
        })
      }
      if (!this.state.othersStatusArray.length) {
        this.setState({
          othersStatusArray: othersStatus,
        })
      }
    });
    this.setState({
      // baseStatusArray: statusInfos
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
        console.log(this.hasUploadImagesUrls,"mmn")
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
          imageHasChange: true
        })
      }
      else{
        this.setState({
          baseStatusArray: fileList,
          imageHasChange: true
        });
      }
  }
  editOrAddBaseStatus = () => {
    const { dispatch } = this.props
    // const { changeBaseStatusMsg } = this.state

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
      canEditOthersStatus: false,
      othersImageHasChange: false
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
      // console.log(this.hasUploadOrdersImagesUrls, "mmn")
      // this.
      // const that = this
      // const newOthersStatusArray = [...this.state.othersStatusArray, {
      //   uid: - that.baseStatusId,
      //   id: that.baseStatusId,
      //   url,
      //   type_id: '补充资质'
      // }]
      
      // Object.assign({}, this.state.othersStatusArray, {
      //   uid: - that.baseStatusId,
      //   id: that.baseStatusId,
      //   url,
      //   type_id: '补充资质'
      // })
      

      this.setState({
        othersImageHasChange: true
      })
    }
    else {
      this.setState({
        othersStatusArray: fileList,
        imageHasChange: true
      });
    }
  }

  addOthersStatus = () => {
    const { dispatch } = this.props
    dispatch(handleUploadAdd(this.hasUploadOrdersImagesUrls))
    this.hasUploadOrdersImagesUrls = []
  }

  deleteStatusFun = (id) => {
    const { dispatch } = this.props
    // console.log(e,"mmnbbb")
    dispatch(deleteStatus(id))
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
    const { 
      previewVisible, 
      canEditBaseStatus,
      canEditOthersStatus,
      baseStatusArray,
      othersStatusArray,
      imageHasChange,
      othersImageHasChange 
    } = this.state;
    console.log(baseStatusArray,"jjy")
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">修改基础资质</div>
      </div>
    );
    
    return (
      <div className="status-container">
        {/* content-title 这个样式是公用的 在common里 */}
        <header className="content-title">资质管理</header>
        <section className="status-content">
          <Tabs
            tabBarGutter={10}
            type="card"
            className="tabs-container"
          >
            <TabPane className="tab-content tab1" tab="基本资质" key="1">
              <Row type="flex">
                <Col className="content-title-sider">
                  <div>营业执照：</div>
                  <div>
                    <Button
                      style={{ display: `${canEditBaseStatus && imageHasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={() => { this.editOrAddBaseStatus() }}
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${!canEditBaseStatus && !imageHasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={this.showEditBtn}
                      // disabled={this.state.fileList.length === 0}
                    >
                      修改基本资质
                    </Button>
                    <Button
                      style={{ display: `${canEditBaseStatus && !imageHasChange ? "block" : "none"}` }}
                      onClick={this.hideEditBtn}
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
                    // onPreview={this.handlePreview}
                    onRemove={() => { this.deleteStatusFun(this.baseStatusId) }}
                    onChange={this.baseImageResultFun}
                  >
                    {canEditBaseStatus ? uploadButton : null}
                  </Upload>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="tab-content tab2" tab="补充资源" key="2">
              <Row type="flex" style={{ flexWrap: 'nowrap' }}>
                <Col className="content-title-sider">
                  <div>补充资质：</div>
                  <div>
                    <Button
                      style={{ display: `${canEditOthersStatus && othersImageHasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={() => { this.addOthersStatus() }}
                    >
                      提交
                    </Button>
                    <Button
                      style={{ display: `${!canEditOthersStatus && !othersImageHasChange ? "block" : "none"}` }}
                      className="upload-demo-start"
                      type="primary"
                      onClick={this.showOthersEditBtn}
                    // disabled={this.state.fileList.length === 0}
                    >
                      修改基本资质
                    </Button>
                    <Button
                      style={{ display: `${canEditOthersStatus && !othersImageHasChange ? "block" : "none"}` }}
                      onClick={this.hideOthersEditBtn}
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
                    // onPreview={this.handlePreview}
                    onRemove={() => { this.deleteStatusFun(this.baseStatusId) }}
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