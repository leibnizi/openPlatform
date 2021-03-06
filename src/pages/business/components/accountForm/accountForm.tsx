import * as React from "react";
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
import './accountForm.less'
import { validateUsername, validateMobile, validateMail } from '../../../../utils'

export const AccountForm: any = Form.create()((props: any) => {

  const { form, form: { getFieldDecorator }, mobile, email, name, } = props
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

  return (
    <Form className="account-form-box" onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="用户名">
        {getFieldDecorator('name', {
          initialValue: `${name}`,
          rules: [
            { required: true, message: '请输入用户名!' },
            {
              validator: validateUsername,
              message: '用户名含有非法字符！'
            } 
          ],
        })(<Input disabled={true}/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="手机号">
        {getFieldDecorator('mobile', {
          initialValue: `${mobile}`,
          rules: [
            { required: true, message: '请输入手机号' },
            {
              validator: validateMobile,
              message: '手机号码格式有误！'
            }
          ],
        })(<Input type="number" disabled={true}/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱">
        {getFieldDecorator('email', {
          initialValue: `${email}`,
          rules: [
            {
              type: 'email', message: '无效的E-mail地址!',
            },
            { 
              required: true, message: '请输入邮箱！' 
            },
          ],
        })(<Input />)}
      </FormItem>
      <div className="btn-box">
        {/* <Button onClick={cancelEdit}>
          取消
        </Button> */}
        <Button style={{width: '150px',marginBottom: '10px'}} type="primary" htmlType="submit">
          提交
        </Button>
      </div>
    </Form>
  );
});
