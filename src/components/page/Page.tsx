import * as React from "react";
// import classnames from 'classnames'
import Loader from '../Loader'

interface PageProps {
  className?: string;
  children?: any;
  loading: boolean;
  inner?: boolean;
}

export default class Page extends React.Component<PageProps, {}> {

  constructor(props: PageProps) {
    super(props)
  }

  render() {
    const { children, loading = false } = this.props
    // const loadingStyle = {
    //   height: 'calc(100vh - 184px)',
    //   overflow: 'hidden',
    // }
    return (
      <div>
        {loading ? <Loader spinning={true} /> : ''}
        {children}
      </div>
    )
  }
}
