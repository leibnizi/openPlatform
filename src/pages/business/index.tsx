import * as React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Infos from './infos';

export default class Business extends React.Component <any, {}> {
  constructor(props:any) {
    super(props)
  }

  render() {

    return (
      <div>
        <Infos/>
      </div>
    )
  }
}
