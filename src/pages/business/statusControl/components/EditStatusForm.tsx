import * as React from "react";
import { Form, Input, Button } from 'antd';
import { validateUsername, validateMobile } from '../../../../utils'
const FormItem = Form.Item;

export const EditStatusForm: any = Form.create()((props: any) => {

  const { form: { getFieldDecorator }, mobile, name, } = props
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

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <FormItem {...formItemLayout} label="用户名">
        {getFieldDecorator('name', {
          initialValue: `${name}`,
          rules: [
            { required: true, message: '请输入用户名！' },
            {
              validator: validateUsername,
              message: '用户名格式有误！'
            }
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="手机号">
        {getFieldDecorator('mobile', {
          initialValue: `${mobile}`,
          rules: [
            { required: true, message: '请输入手机号！' },
            {
              validator: validateMobile,
              message: '手机号码格式有误！'
            }
          ],
        })(<Input />)}
      </FormItem>
      <Button htmlType="submit">
        保存
      </Button>
    </Form>
  );
});
