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
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
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
    <Form onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="开户行">
        {getFieldDecorator('bank', {
          initialValue: `${bank}`,
          rules: [{ required: true, message: '请填写开户行!' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款账号">
        {getFieldDecorator('account', {
          initialValue: `${account}`,
          rules: [
            { required: true, message: '请填写收款账户!' },
            {
              validator: (rule, value, callback) => {
                if (value && (/[^0-9]+/.test(value))) {
                  callback('收款账号只能输入数字！');
                } else {
                  callback()
                }
              },
              message: '收款账号只能输入数字！'
            } 
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="收款人">
        {getFieldDecorator('payee', {
          initialValue: `${payee}`,
          rules: [{ required: true, message: '请填写收款人!' }],
        })(<Input />)}
      </FormItem>
      <Button style={{width: '130px', marginTop:"60px"}} type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
});
