import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { Route } from 'react-router'
import routes from './routes'
import { OldMenuLink } from './App'
<<<<<<< HEAD
import { httpGet } from '../src/services/httpRequest'
import Page from './components/page/page'
=======
import { easyRequest } from '../src/services/httpRequest'
>>>>>>> initrouter

class Content extends Component {

  logOut = () => {
    easyRequest('/api/logout')
      .then(res => {
        if (res && res.status_code === 0) {
          window.location.href = window.location.origin + "/login"
        }
      })
  }

  render() {
    return (
      <Page>
        <header className='header'>
          {
            this.props.state.userInfo.name ?
              <div className="top">
                {this.props.state.userInfo.name}
                <span>|</span>
                {this.props.state.userInfo.biz_name}
                <span>|</span>
                <span onClick={() => this.logOut()}>安全退出</span>
              </div> :
              <div className="top"></div>
          }

          <div className='header-box'>
            <div className='logo'>
              <img
                src={require('./styles/img/msheader.png')}
                alt='头部logo'
              />
              <div>商家后台管理系统</div>
            </div>
            <div className='navigation'>
              {
                routes.map((item, index) =>
                  <OldMenuLink
                    key={index}
                    activeOnlyWhenExact={index === 0 ? true : false}
                    to={item.path}
                    label={item.label}
                  />
                )
              }
            </div>
          </div>
        </header>
        <section className='body'>
          {
            routes.map((item, index) => {
              return (
                <Route
                  key={index}
                  exact={index === 0 ? true : false}
                  path={item.path}
                  component={item.component}
                />
              )
            })
          }
        </section>
      </Page>
    )
  }
}
const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps)(Content)