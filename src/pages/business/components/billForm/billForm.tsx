import * as React from "react";
import { Form, Input } from 'antd';
const FormItem = Form.Item;

export const BillForm:any = Form.create({
  onFieldsChange(props: any, changedFields: any) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props: any) {
    return {
      openingBank: Form.createFormField({
        ...props.openingBank,
        value: props.openingBank.value,
      }),
      account: Form.createFormField({
        ...props.account,
        value: props.account.value,
      }),
      receiver: Form.createFormField({
        ...props.receiver,
        value: props.receiver.value,
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value,
      })
    };
  },
  onValuesChange(values: any) {
    console.log(values);
  },
  
})((props) => {
  console.log(props, "ttt")
  const { getFieldDecorator } = props.form;
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
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('account', {
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
