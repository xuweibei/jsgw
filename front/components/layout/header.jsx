//创建公共组件的第一种方式：页头组件
import React from "react";
import Link from "next/link";

const links = [
    { href: "/", label: "首页", as: "/home" },
    { href: "/about", label: "关于我们" },
    { href: "/product", label: "产品资讯" },
    { href: "/join", label: "人才管理", as: "/join-us" },
    { href: "/group", label: "机构了解" }
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
});

export default () => (
    <div style={{ borderBottom: "10px solid #000 ", height: 50 }}>
        <div style={{ display: "flex", float: "left", marginRight: 200 }}>
            <h1>中战科技</h1>
        </div>
        <div style={{ marginTop: 20 }}>
            <nav>
                <ul style={{ display: "flex", justifyContent: "space-around" }}>
                    {links.map(({ href, label, key, as }) => (
                        <li>
                            <Link href={href} as={as}>
                                <a key={key}>{label}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </div>
);
