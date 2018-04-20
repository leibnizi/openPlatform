import * as React from 'react'
import { Upload, Modal, Icon } from 'antd';
import './register.less'

// import { fetchUtil } from '../../services/httpRequest'

export default class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      tabIndex: 0,
      name: '',
      mail: '',
      phone: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      biz_name: '',
      website: '',
      brand: '',
      category_id: '',
      biz_type: '',
      biz_operator: '',
      mobile: '',
      email: '',
      qq: '',
      faxes: '',
      biz_address: '',
      files: '',
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }

  // componentDidMount() {
  //   fetchUtil('api/login', { name: '12', mobile: '1221' }).then(v => console.log('login', v))
  // }

  gotoStep = (e:any, tabIndex: number) => {
    e.preventDefault()
    this.setState({tabIndex})
  }

  // handleChange = (info:any) => {
  //   console.log('info', info)
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true })
  //     return
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (licenseImage:any) => this.setState({
  //       licenseImage,
  //       loading: false,
  //     }))
  //   }
  // }

  handleChange = (fileList:any) => this.setState({ fileList:fileList.fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file:any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  render() {
    const {
      tabIndex, name, mail, phone, verificationCode, password, confirmPassword,
      biz_name, profit_level, brand, website, category_id, biz_type, biz_operator,
      mobile, email, qq, faxes, biz_address, files, previewVisible, previewImage, fileList
    } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <div className='registerOut'>
        {
          tabIndex === 2 ? (
            <div className='register'>
              <section className='registerSuccess'>
                <img src={require('../../styles/img/registerend.png')} />
                <div>
                  <p className='p1'>提交成功!</p>
                  <p className='p2'>审核时间需要5-20个工作日</p>
                  <p className='p2'>如有疑问,可联系客服</p>
                </div>

              </section>
            </div>
          ) : (
            <div className='register'>
              <header>
                  <span
                    className={tabIndex===0?'registerActive headerfont':'registernormal headerfont'}
                  >
                    {
                      tabIndex === 0 ? (
                        <img src={require('../../styles/img/number1.png')} />
                      ) : (
                        <img src={require('../../styles/img/unnumber1.png')} />
                      )
                    }
                    创建账户
                  </span>
                <span
                  className={tabIndex===1?'registerActive':'registernormal'}
                >
                  {
                    tabIndex === 1 ? (
                      <img src={require('../../styles/img/number2.png')} />
                    )  : (
                      <img src={require('../../styles/img/unnumber2.png')} />
                    )
                  }
                  填写商家信息
                </span>
              </header>
              <hr/>
              {
                tabIndex === 0 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 1)}>
                    <label
                      className='name'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          用户名:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => this.setState({name:e.target.value})}
                        placeholder='（用户名为6-16个字符，不可使用非法字符串）'
                      />
                    </label>
                    <label
                      className='mail'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          邮箱:
                        </span>
                      </div>
                      <input type="text" value={mail} onChange={(e) => this.setState({mail: e.target.value})} />
                    </label>
                    <label
                      className='phone'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          手机号:
                        </span>
                      </div>
                      <input type="text" value={phone} onChange={(e) => this.setState({phone: e.target.value})} />
                    </label>
                    <label
                      className='verificationCode'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          验证码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => this.setState({verificationCode: e.target.value})}
                      />
                      <span className='vCode'>获取验证码</span>
                    </label>
                    <label
                      className='password'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          密码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        placeholder='(密码为6-16个字符，由大小写字母或数字组成)'
                      />
                    </label>
                    <label
                      className='confirmPassword'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          确认密码:
                        </span>
                      </div>
                      <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => this.setState({confirmPassword:e.target.value})}
                      />
                    </label>
                    <input className='submit' type="submit" value="下一步" />
                  </form>
                ) : tabIndex === 1 ? (
                  <form onSubmit={(e) => this.gotoStep(e, 2)}>
                    <label
                      className='biz_name'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          企业名称：
                        </span>
                      </div>
                      <input type="text" value={biz_name} onChange={(e) => this.setState({biz_name: e.target.value})} />
                    </label>
                    <label
                      className='profit_level'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          上年度营业额量级：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={profit_level}
                        onChange={(e) => this.setState({profit_level: e.target.value})}
                      />
                    </label>
                    <label
                      className='brand'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          主营品牌：
                        </span>
                      </div>
                      <input type="text" value={brand} onChange={(e) => this.setState({brand: e.target.value})} />
                    </label>
                    <label
                      className='website'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          官网地址：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => this.setState({website:e.target.value})}
                      />
                    </label>
                    <label
                      className='category_id'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          主营类目：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={category_id} 
                        onChange={(e) => this.setState({category_id: e.target.value})} 
                      />
                    </label>
                    <label
                      className='biz_type'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          商家类型：
                        </span>
                      </div>
                      <input
                        type="text"
                        value={biz_type}
                        onChange={(e) => this.setState({biz_type: e.target.value})}
                      />
                    </label>
                    <label
                      className='biz_operator'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          运营人员：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={biz_operator} 
                        onChange={(e) => this.setState({biz_operator: e.target.value})} 
                      />
                    </label>
                    <label
                      className='mobile'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          联系电话：
                        </span>
                      </div>
                      <input type="text" value={mobile} onChange={(e) => this.setState({mobile: e.target.value})} />
                    </label>
                    <label
                      className='email'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          邮箱：
                        </span>
                      </div>
                      <input type="text" value={email} onChange={(e) => this.setState({email: e.target.value})} />
                    </label>
                    <label
                      className='qq'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          QQ：
                        </span>
                      </div>
                      <input type="text" value={qq} onChange={(e) => this.setState({qq: e.target.value})} />
                    </label>
                    <label
                      className='faxes'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          传真：
                        </span>
                      </div>
                      <input type="text" value={faxes} onChange={(e) => this.setState({faxes: e.target.value})} />
                    </label>
                    <label
                      className='biz_address'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          公司地址：
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={biz_address} 
                        onChange={(e) => this.setState({biz_address: e.target.value})} 
                      />
                    </label>
                    <label
                      className='files'
                    >
                      <div className='symbol'>
                        *
                        <span className='labelName'>
                          营业执照：
                        </span>
                      </div>
                      {/* <input 
                        type="text" 
                        value={files} 
                        onChange={(e) => this.setState({files: e.target.value})} 
                      /> */}
                      <Upload
                        action="http://api.v2.msparis.com/common/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        multiple={true}
                      >
                        {fileList.length >= 3 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </label>
                    <label
                      className='files'
                    >
                      <div className='symbol'>
                        <span className='labelName'>
                          补充资质：
                        </span>
                      </div>
                      {
                        !!0 && <input 
                          type="text" 
                          value={files} 
                          onChange={(e) => this.setState({files: e.target.value})} 
                        />
                      }
                    </label>
                    <button className='submit' onClick={(e)=>this.gotoStep(e, 0)}>上一步</button>
                    <input className='submit' type="submit" value="下一步" />
                  </form>
                ) : (
                  null
                )
              }
            </div>
          )
        }

        {/* <form onSubmit={(e) => this.loginin(e)}>
          <label
            className='id'
          >
            账户
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangeId(e.target.value)} />
          </label>
          <label
            className='password'
          >
            密码
            <input type="text" value={this.state.value} onChange={(e) => this.handleChangePass(e.target.value)} />
          </label>
          <p>忘记密码？</p>
          <input className='submit' type="submit" value="登录" />
        </form> */}
      </div>
    )
  }
};
