import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {reqLogin} from '../../api';
import {connect} from 'react-redux';
import {saveUser} from '@redux/action-creators';
import withCheckLogin from '../with-check-login';

import logo from '../../assets/image/logo.png';
import './index.less';
@withCheckLogin
@connect(
    null,
    {saveUser}
)
@Form.create()
class Login extends Component {
    /**
     * 自定义表单校验的方法
     * @param rule 包含表单项字段
     * @param value 表单项的值
     * @param callback 当callback传参时，说明校验失败，并提示传入参数。 当callback没有参数，说明校验成功
     */
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
        // callback必须调用
        callback();
    };
//登录函数
    login = (e) => {
        e.preventDefault();
        // 校验表单
        this.props.form.validateFields((error, values) => {
            if (!error) {
                //如果校验成功，拿到表单数据，发送请求
                const {username, password} = values;
                reqLogin(username, password)
                    .then((result) => {
                        //登录成功
                        message.success('登录成功了~');
                        //跳转之前保存用户数据到redux中，localStorage/sessionStorage
                        this.props.saveUser(result);
                        //跳转到home组件
                        this.props.history.replace('/');

                    })
                    .catch(() => {

                        // 清空密码
                        this.props.form.resetFields(['password'])

                    })
            }
        })
    };

    render() {
        // getFieldDecorator 专门表单校验的方法。 高阶组件
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