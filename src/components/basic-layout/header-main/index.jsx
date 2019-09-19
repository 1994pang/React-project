import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import './index.less';
import screenFull from 'screenfull';
import {withTranslation,getI18n} from "react-i18next";



@withTranslation()
class HeaderMain extends Component {
    state = {
        isScreenFull: false,
        isEnglish: getI18n().language === 'en',
    };

    screenFull = () => {
        if (screenFull.isEnabled) {
            screenFull.toggle();
        }

    };
    change = () => {
        this.setState({isScreenFull: !this.state.isScreenFull});
    };

    componentDidMount() {
        //绑定事件（全屏改变）
        screenFull.on('change', this.change)
    }

    componentWillMount() {
        screenFull.off('change', this.change);
    }

    changeLanguage = () => {
        const isEnglish = ! this.state.isEnglish;
        console.log(isEnglish);
        this.setState({isEnglish});
        this.props.i18n.changeLanguage(isEnglish ? 'en':'zh-CN');
    };

    render() {
        const {isScreenFull,isEnglish} = this.state;
        return <div className='header-main'>
            <div className='header-main-top'>
                <Button size="small" onClick={this.screenFull}><Icon
                    type={isScreenFull ? "fullscreen-exit" : "fullscreen"}/></Button>
                <Button size="small" className='header-main-top-btn' onClick={this.changeLanguage}>{ isEnglish ? '中文':'English'}</Button>
                <span>欢迎：XXX</span>
                <Button type="link">退出</Button>
            </div>
            <div className='header-main-bottom'>
                <h3>首页</h3>
                <span>2019.9.18 15:12</span>

            </div>

        </div>


    }
};
export default HeaderMain;