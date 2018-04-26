import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { Route } from 'react-router'
import routes from './routes'
import { OldMenuLink } from './App'

class Content extends Component {
  componentWillReceiveProps(pre, curr) {
    console.log('componentWillReceiveProps',Immutable.fromJS(pre.state), Immutable.fromJS(curr.state))
    if (!Immutable.is(Immutable.fromJS(pre.state)), Immutable.fromJS(curr.state)) {
      console.log('pre', pre.state)
    }
  }
  render() {
    return (
      <div className='app'>
        <header className='header'>
          <div className="top">
            1
          </div>
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
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps)(Content)