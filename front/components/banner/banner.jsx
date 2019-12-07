import BannerAnim, { Element } from "rc-banner-anim"; //banner动画
import TweenOne from "rc-tween-one"; //单元素动画

const BgElement = Element.BgElement;

const bannerArr = [{}];

export default () => (
    <BannerAnim prefixCls="banner-user" autoPlay>
        <Element prefixCls="banner-user-elem" key="0">
            <BgElement
                id="bg"
                className="bg"
                style={{
                    background: "url(/banner1.png)"
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
                Join us
            </TweenOne>
            <TweenOne
                className="banner-user-text"
                animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
            >
                加入我们
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
);
