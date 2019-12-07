//创建公共组件的第二种方式：布局组件
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import "../../static/style/styles.less";

export default ({ children, title = "公司官网" }) => (
    <div className="layout">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/favicon.png" />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossorigin="anonymous"
            />
        </Head>
        <Header />
        <div className="content">{children}</div>
        <Footer />
    </div>
);
