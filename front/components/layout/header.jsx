//创建公共组件的第一种方式：页头组件
import React from "react";
import Link from "next/link";
import { Menu, Dropdown, Icon } from 'antd';

const links = [
    { href: "/", label: "首页", as: "/home" },
    { href: "/about", label: "关于我们" },
    { href: "/product", label: "产品资讯" },
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
        {/* <Menu.Item>
            <Link href="/exchange" as="/exchange">
                <a>内部交流</a>
            </Link>
        </Menu.Item> */}
    </Menu>
);

export default () => (
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
        <div className="staff">员工登陆</div>
    </div>
);
