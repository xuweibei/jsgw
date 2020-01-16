//创建公共组件的第一种方式：页头组件
import React from "react";
import Link from "next/link";
import {Menu, Dropdown, Icon, Modal, Input, Form, Button, Checkbox} from 'antd';
import fetch from 'isomorphic-unfetch';
import md5 from "md5";

const links = [
    { href: "/", label: "首页", as: "/home" },
    { href: "/about", label: "关于我们" },
    { href: "/info", label: "资讯中心" },
    { href: "/join", label: "加入我们", as: "/join" },
    // { href: "/exchange", label: "内部交流", as: "/exchange" }
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
});

const menu = (
    <Menu>
        <Menu.Item>
            <Link href="/bulletin" as="/bulletin">
                <a>公司公告</a>
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link href="/exchange" as="/exchange">
                <a>内部交流</a>
            </Link>
        </Menu.Item>
    </Menu>
);

class Header extends React.Component {
    state = {
        visible: false,
        report: '',
        cipher: '',
        register: false,
        accountName: ''
    };

    close = () => {
        this.setState({
            visible: false
        })
    };

    account = (e) => {//input输入什么，就监听这个方法，然后再修改state，然后返回到视图
        this.setState({
            report:e.target.value
        }, () => {
            console.log(this.state.report);
        })
    }
    password = (e) => {//input输入什么，就监听这个方法，然后再修改state，然后返回到视图
        this.setState({
            cipher:e.target.value
        }, () => {
            console.log(this.state.cipher);
        })
    }

    handleSubmit = () => {
        const {report, cipher} = this.state;
        fetch('http://localhost:8000/api/login', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                account: report ,password: md5(cipher)
            })}).then(res => {
                return res.json()
            }).then(res => {
                if (res && res.status === 0) {
                   sessionStorage.setItem('statusCode', JSON.stringify(res.data));
                    this.setState({
                        register: true,
                        accountName: res.data.name + `(${res.data.identity})`,
                        visible: false
                    })
                }
            })
    }

    render() {
        const {visible, register, accountName} = this.state;
        return (
            <div className="header distance">
                <img className="header-logo" src="/zzha.png" alt=""/>
                <div className="header-tab">
                    {links.map(({ href, label, key, as }) => (
                        <div key={href}>
                            <Link href={href} as={as}>
                                <a key={key}>{label}</a>
                            </Link>
                        </div>
                    ))}
                    <div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                内部板块 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                {
                    register ? (
                        <div className="staff">
                            <span>{accountName}</span>
                            <span>退出</span>
                        </div>
                        ) : (
                        <div className="staff" onClick={this.examine}>员工登录</div>
                    )
                }
                {
                    visible && (
                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            onCancel={this.close}
                            footer={null}
                        >
                            <Form className="login-form">
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                        onChange={(e)=>this.account(e)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e)=>this.password(e)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleSubmit} type="primary" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    )
                }

            </div>
        )
    }
}

export default Header;
