import Layout from "../components/layout/layout";
import "../static/style/page/about.less";
import React from "react";

export default () => (
    <Layout title="关于我们">
        <div className="about">
            <img className="banner" src="/introduce.png" alt="" />
            <div className="synopsis">
                <div className="synopsis-left">
                    <img className="synopsis-img" src="/introduce.png" alt="" />
                </div>
                <div className="synopsis-right">
                    <div className="across"/>
                    <div className="synopsis-name">中战科技网络有限公司</div>
                    <div className="synopsis-content">中战科技网络有限公司中战科技网络有限公司中战科技网络有限公司中战科技网络有限公司</div>
                </div>
            </div>
            <div className="deed">
                <div>中战大事记</div>
                <div></div>
            </div>
        </div>
    </Layout>
);
