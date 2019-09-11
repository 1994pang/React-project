import React, {Component} from 'react';

import {Form, Icon, Input, Button} from 'antd';

import logo from './logo.png';
import './index.less';

@Form.create()
class Login extends Component {
    //自定义校验将表单的方法
    validator=(rule, value, callback)=>{
        const name=rule.field==='username'? '用户名':'密码';
        if(!value){
          return callback(`请输入${name}`)
        }
        if(value.length>13){
            return callback(`${name}长度小于13位`)
        }
        if(value.length<3){
            return callback(`${name}长度大于3位`)
        }
        const reg=/^[a-zA-Z0-9_]{3,13}$/;
      if(!reg.test(value)){
          return callback(`${name}只能为英文字母，数字，下划线`)
      }
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