//创建公共组件的第一种方式：页头组件
import React from "react";
import Link from "next/link";

const links = [
    { href: "/", label: "首页", as: "/home" },
    { href: "/about", label: "关于我们" },
    { href: "/product", label: "产品资讯" },
    { href: "/join", label: "加入我们", as: "/join-us" }
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
});

export default () => (
    <div className="header distance">
        <img className="header-logo" src="/zzha.png" alt=""/>
        <div className="header-tab">
            {links.map(({ href, label, key, as }) => (
                <div>
                    <Link href={href} as={as}>
                        <a key={key}>{label}</a>
                    </Link>
                </div>
            ))}
        </div>
        <div className="staff">员工登陆</div>
    </div>
);
