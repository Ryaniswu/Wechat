import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { fetchEnd } from '../../util';
import './Login.css';

const FormItem = Form.Item;
const loginUrl = '/teacher/login';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetchEnd(loginUrl, {
          userName: values.userName,
          userPassword: values.password
        }, (data) => {
          if (data.state == 'success') {
            this.props.history.push("/addStudent");
          } else {
            message.error('用户名或密码错误!');
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或者 <a href="">现在注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default withRouter(Login);