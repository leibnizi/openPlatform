import * as React from "react";
// import { Tabs, Row, Col, Button } from 'antd';
// const TabPane = Tabs.TabPane;
import { Form, Input } from 'antd';
const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props :any, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
});


export default class Bill extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     // cardList: [1, 2, 3, 4]
  //   }
  // }
  state = {
    fields: {
      username: {
        value: 'benjycui',
      },
    },
  };
  handleFormChange = (changedFields :any) => {
    this.setState(({ fields }: any) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  changeTabFun() {

    console.log(1)
  }

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={ this.handleFormChange } />
        <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    );
  }
}
