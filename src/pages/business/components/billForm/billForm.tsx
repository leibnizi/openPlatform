import * as React from "react";
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

export const BillForm:any = Form.create()((props:any) => {
  
  // const { getFieldDecorator } = props.form;
  const { form: { getFieldDecorator }, bank, account, payee, finance_state, } = props
  // bank, account, payee, finance_state,
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        
        props.onChange(values)
      }
    });
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="开户行">
        {getFieldDecorator('openingBank', {
          initialValue: `${bank}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('account', {
          initialValue: `${account}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款人">
        {getFieldDecorator('receiver', {
          initialValue: `${payee}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="信息状态">
        {getFieldDecorator('status', {
          initialValue: `${finance_state}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <Button htmlType="submit">
        保存
      </Button>
    </Form>
  );
});
