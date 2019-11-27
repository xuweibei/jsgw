//创建公共组件的第一种方式：页头组件

import Link from "next/link";

export default () => (
    <header>
        <ul>
            <h3>静态路径</h3>
            <li>
                <Link href="/">
                    <a className="home">首页</a>
                </Link>
            </li>
            <li>
                <Link href="/about">
                    <a>关于</a>
                </Link>
            </li>
            <li>
                <Link href="/image">
                    <button>点击发车</button>
                </Link>
            </li>
            <h3>动态路径</h3>
            <li>
                <Link href="/post/[id]" as="/post/123">
                    <a>first</a>
                </Link>
            </li>
            <li>
                <Link href="/post/[id]" as="/post/abc">
                    <a>second</a>
                </Link>
            </li>
        </ul>
    </header>
);
