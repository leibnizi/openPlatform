import * as React from "react";
import './statusCard.less'
import { Button, Popconfirm, message } from "antd"

// interface NavProps {
//   routes: RouteType[];
// }

export const StatusCard = (props: any) => {
  const { file, id } = props
  function edit(file: string, id: string) {
    console.log(file, id, 112)
  }
  function deleteFun(file: string, id: string) {
    console.log(file, id, 112)
    props.deleteFun(id)
  }

  // function showDeleteFun(e:any) {
  //   e.preventDefault();
  //   // message.success('Click on Yes');
  // }
  // function confirm(e) {
  //   console.log(e);
  //   message.success('Click on Yes');
  // }

  function hideFun() {
    message.error('Click on No');
  }

  return (
    <div className="card-box">
      <img src={file} alt="" />
      <div className="btn-box">
        <Button onClick={(e) => { edit(file, id) }} >编辑</Button>
        
        <Popconfirm 
          title="确认删除?" 
          onConfirm={(e) => { deleteFun(file, id) }} 
          onCancel={(e) => { hideFun() }} 
          okText="Yes" 
          cancelText="No"
        >
          <Button>删除</Button>
        </Popconfirm>
      </div>
    </div>
  )
}
