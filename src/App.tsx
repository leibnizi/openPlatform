import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { createStore } from 'redux';
import * as React from 'react';
import './App.css';
import './styles/App.less';

export const store = createStore(
  reducer
);

const logo = require('./logo.svg');

class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <header className="header" />
            <section className="section">
              <section className="logo">
                <img src={logo} alt="头部logo" />
                <p>商家后台管理系统</p>
              </section>
              <section className="navigation">
                <div>Navigation</div>
              </section>
            </section>
            <section className="body">
              <div>body</div>
            </section>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
