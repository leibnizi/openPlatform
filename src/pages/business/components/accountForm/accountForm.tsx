import * as React from "react";
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
import './accountForm.less'

export const AccountForm: any = Form.create()((props: any) => {

  const { form, form: { getFieldDecorator }, mobile, email, name, address, } = props
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        props.onChange(values)
      }
    });
  }

  const cancelEdit = () => {
    props.cancelEdit()
  }

  const validateMail = (rule, value, callback) => {
    if (value && !value.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
      callback('邮箱格式有误！');
    } else {
      callback()
    }
  }
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="用户名">
        {getFieldDecorator('name', {
          initialValue: `${name}`,
          rules: [{ required: true, message: '请输入用户名!' }],
        })(<Input disabled={true}/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="手机号">
        {getFieldDecorator('mobile', {
          initialValue: `${mobile}`,
          rules: [{ required: true, message: '请输入手机号' }],
        })(<Input disabled={true}/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱">
        {getFieldDecorator('email', {
          initialValue: `${email}`,
          rules: [
            { required: false, message: '请输入邮箱' },
            {
              validator: validateMail,
              message: '邮箱格式有问题！'
            }
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="地址">
        {getFieldDecorator('address', {
          initialValue: `${address}`,
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <div className="btn-box">
        <Button onClick={cancelEdit}>
          取消
        </Button>
        <Button type="primary" style={{margin: "0 40px 0 40px"}} htmlType="submit">
          保存
        </Button>
      </div>
    </Form>
  );
});
