import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';
import withCheckLogin from '@conts/with-check-login';
import HeaderMain from  './header-main';
import LeftNav from './left-nav';
import logo from '../../assets/image/logo.png';
import './index.less';

const {Header, Content, Footer, Sider} = Layout;

// const { SubMenu } = Menu;

@withCheckLogin
class BasicLayout extends Component {
    state = {
        collapsed: false,
        isDisplay: true
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
                collapsed,
                isDisplay: !this.state.isDisplay
            }
        );

    };

    render() {
        const {collapsed, isDisplay} = this.state;
        return <Layout style={{minHeight:'100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="basic-layout-logo">
                    <img src={logo} alt="logo"/>
                    <h1 style={{display: isDisplay ? 'block' : 'none'}}>硅谷后台</h1>
                </div>
                <LeftNav/>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0, height:80}}>
                    <HeaderMain/>
                </Header>
                <Content style={{margin: '25px 16px 0 16px'}}>
                    <div style={{padding: 24, background: '#fff', minHeight: 450}}>
                        {
                            this.props.children
                        }
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>欢迎使用硅谷后台管理系统</Footer>
            </Layout>
        </Layout>

    }
}

export default BasicLayout;