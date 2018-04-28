import * as React from "react";
import { Spin } from 'antd';
import './page.less'

interface PageProps {
  className?: string;
  children?: any;
  pageLoading: boolean;
  inner?: boolean;
}

export default class Page extends React.Component<PageProps, {}> {

  constructor(props: PageProps) {
    super(props)
  }

  render() {
    const { children, pageLoading = false } = this.props
    return (
      <div className='app'>
        {pageLoading ? <div className="page-loading"><Spin size="large" /></div>: ''}
        {children}
      </div>
    )
  }
}
