import * as React from "react";
import { Form, Input } from 'antd';
const FormItem = Form.Item;

export const BillForm:any = Form.create()((props:any) => {
  
  // const { getFieldDecorator } = props.form;
  const { form: { getFieldDecorator } } = props
  // bank, account, payee, finance_state,
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  return (
    <Form layout="vertical">
      <FormItem {...formItemLayout} label="开户行">
        {getFieldDecorator('openingBank', {
          // initialValue: `${bank}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('account', {
          // initialValue: `${account}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款人">
        {getFieldDecorator('receiver', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="信息状态">
        {getFieldDecorator('status', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
});
