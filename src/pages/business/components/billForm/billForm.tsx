import * as React from "react";
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

export const BillForm:any = Form.create()((props:any) => {
  
  // const { getFieldDecorator } = props.form;
  const { form: { getFieldDecorator }, bank, account, payee } = props
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
        {getFieldDecorator('bank', {
          initialValue: `${bank}`,
          rules: [{ required: false, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('account', {
          initialValue: `${account}`,
          rules: [{ required: false, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款人">
        {getFieldDecorator('payee', {
          initialValue: `${payee}`,
          rules: [{ required: false, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      {/* <div>{finance_state}</div> */}
      {/* <FormItem {...formItemLayout} label="信息状态">
        {getFieldDecorator('status', {
          initialValue: `${finance_state}`,
          rules: [{ required: false, message: 'Username is required!' }],
        })(<div></div>)}
      </FormItem> */}
      
      <Button htmlType="submit">
        保存
      </Button>
    </Form>
  );
});
