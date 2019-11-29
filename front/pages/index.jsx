// import fetch from "isomorphic-unfetch";
import React from "react";
import Texty from "rc-texty";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import ScrollAnim from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import Layout from "../components/layout/layout";

const BgElement = Element.BgElement;
const ScrollOverPack = ScrollAnim.OverPack;
const Home = () => (
    <Layout>
        <div style={{ margin: 30 }}>
            <h1>
                <Texty type="bounce" mode="random">
                    文字动画qwretydhgfjkdgkfjgdkfgdlk22222222222222222222222222222222
                </Texty>
            </h1>
        </div>

        <h1>banner动画+单元素动画</h1>
        <BannerAnim prefixCls="banner-user" autoPlay>
            <Element prefixCls="banner-user-elem" key="0">
                <BgElement
                    id="bg"
                    className="bg"
                    style={{
                        background: "#364D79"
                    }}
                />
                <TweenOne
                    className="banner-user-title"
                    animation={{
                        y: 30,
                        opacity: 0,
                        type: "from",
                        blur: "20px"
                    }}
                >
                    Ant Motion Banner
                </TweenOne>
                <TweenOne
                    className="banner-user-text"
                    animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
                >
                    The Fast Way Use Animation In React
                </TweenOne>
            </Element>
            <Element prefixCls="banner-user-elem" key="1">
                <BgElement
                    id="bg"
                    className="bg"
                    style={{
                        background: "#64CBCC"
                    }}
                />
                <TweenOne
                    className="banner-user-title"
                    animation={{ y: 30, opacity: 0, type: "from" }}
                >
                    Ant Motion Banner
                </TweenOne>
                <TweenOne
                    className="banner-user-text"
                    animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
                >
                    The Fast Way Use Animation In React
                </TweenOne>
            </Element>
        </BannerAnim>
        <h1>页面滚动动画+进出场动画</h1>
        <ScrollOverPack hideProps={{ tweenOne: { reverse: true } }}>
            <QueueAnim key="queueAnim">
                <div key="a">依次进入</div>
                <div key="b">依次进入</div>
                <div key="b">依次进入</div>
            </QueueAnim>
        </ScrollOverPack>
    </Layout>
);

// Home.getInitialProps = async () => {
//     const res = await fetch("https://api.github.com/repos/zeit/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

export default Home;
