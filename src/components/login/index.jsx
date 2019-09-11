import React, {Component} from 'react';

import {Form, Icon, Input, Button, message} from 'antd';
import axios from 'axios';
import {connect} from 'react-redux';
import {saveUser} from '@redux/action-creators'

import logo from './logo.png';
import './index.less';
@connect(
    null,
   { saveUser}
)
@Form.create()
class Login extends Component {
    //自定义校验将表单的方法
    validator = (rule, value, callback) => {
        const name = rule.field === 'username' ? '用户名' : '密码';
        if (!value) {
            return callback(`请输入${name}`)
        }
        if (value.length > 13) {
            return callback(`${name}长度小于13位`)
        }
        if (value.length < 3) {
            return callback(`${name}长度大于3位`)
        }
        const reg = /^[a-zA-Z0-9_]{3,13}$/;
        if (!reg.test(value)) {
            return callback(`${name}只能为英文字母，数字，下划线`)
        }
        callback();
    };
//登录验证函数
    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //如果校验成功，拿到表单数据，发送请求
                const {username, password} = values;
                axios.post('http://localhost:3000/api/login', {username, password})
                    .then((response) => {
                        if (response.data.status === 0) {
                            //登录成功
                            message.success('登录成功了~');
                            //跳转之前保存用户数据到redux中，localStorage/sessionStorage
                            this.props.saveUser(response.data.data);
                            //跳转到home组件
                            this.props.history.replace('/');

                        } else {
                            //登录失败了
                            message.error(response.data.msg);
                        }
                    })
                    .catch((error) => {
                        //请求失败-登录失败
                        message.error('未知错误，请联系管理人员');
                    })
                    .finally(()=>{
                        this.props.form.resetFields(['password'])
                    })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="login"/>
                <h1>React项目：尚硅谷管理系统</h1>
            </header>
            <section className="login-section">
                <h3>用户登录</h3>
                <Form onSubmit={this.login}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{validator: this.validator}],
                        })(
                            <Input
                                prefix={<Icon type="user"/>}
                                placeholder="用户名"
                            />
                        )}


                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{validator: this.validator}]
                        })(<Input type='password'
                                  prefix={<Icon type="lock"/>}
                                  placeholder="密码"/>)}

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                    </Form.Item>

                </Form>
            </section>
        </div>

    }
}

export default Login;