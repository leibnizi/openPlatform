import * as React from "react";
import { Form, Input } from 'antd';
const FormItem = Form.Item;

export const AccountForm: any = Form.create({
  onFieldsChange(props: any, changedFields: any) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props: any) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
      phone: Form.createFormField({
        ...props.phone,
        value: props.phone.value,
      }),
      e_mail: Form.createFormField({
        ...props.e_mail,
        value: props.e_mail.value,
      }),
      address: Form.createFormField({
        ...props.address,
        value: props.address.value,
      })
    };
  },
  onValuesChange(values: any) {
    console.log(values);
  },

})((props) => {
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
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款人">
        {getFieldDecorator('e_mail', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="信息状态">
        {getFieldDecorator('address', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
});
