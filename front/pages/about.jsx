import Layout from "../components/layout/layout";
// import "../static/style/page/about.less";
import React from "react";
import { Anchor } from 'antd';
const { Link } = Anchor;

export default () => (
    <Layout title="关于我们">
        <div className="about">
            <div className="banner ">
                <div className="join-one">公司简介</div>
                <div className="join">Company announcement </div>
            </div>
            {/*<img className="banner" src="/introduce.png" alt="" />*/}
            {/*公司简介*/}
            <div id="brief" className="synopsis distance">
                <div className="synopsis-left">
                    <img className="synopsis-img" src="/introduce.png" alt="" />
                </div>
                <div className="synopsis-right">
                    <div className="across"/>
                    <div className="synopsis-name">中战科技网络有限公司</div>
                    <div className="synopsis-content">中战科技网络有限公司中战科技网络有限公司中战科技网络有限公司中战科技网络有限公司</div>
                </div>
                <Anchor className="anchor" affix>
                    <Link href="#brief" title="公司简介" />
                    <Link href="#act" title="大事记" />
                    <Link href="#civil" title="企业文化" />
                </Anchor>
            </div>
            {/*大事记*/}
            <div id="act" className="deed distance">
                <div className="deed-name">中战大事记</div>
                <div className="deed-each-box">
                    <div className="deed-each">
                        <div className="time">
                            <div className="circle cycle">
                                <div className="dot"/>
                            </div>
                            <div className="short">2018年</div>
                        </div>
                        <div className="each-content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
                    </div>
                    <div className="deed-each">
                        <div className="time">
                            <div className="circle">
                                <div className="dot"/>
                            </div>
                            <div className="short">2018年</div>
                        </div>
                        <div className="each-content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
                    </div>
                    <div className="deed-each">
                        <div className="time">
                            <div className="circle">
                                <div className="dot"/>
                            </div>
                            <div className="short">2018年</div>
                        </div>
                        <div className="each-content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
                    </div>
                </div>
            </div>
            {/*公司文化*/}
            <div id="civil" className="culture distance">
                <div className="culture-name">公司文化</div>
                <div className="across"/>
                <div className="culture-content">
                    我们是一群锐意进取、充满激情的人，客户至上是我们的宗旨，勇于创新是我们的信仰，
                    真诚服务是我们的态度，致力于创造更优质的产品，最大限度地满足客户的应用需求是我们的终极目标。
                </div>
                <img className="culture-img" src="/introduce.png" alt="" />
            </div>
        </div>
    </Layout>
);
