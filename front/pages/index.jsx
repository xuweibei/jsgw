// import fetch from "isomorphic-unfetch";
import ScrollAnim from "rc-scroll-anim"; //滚动动画
import QueueAnim from "rc-queue-anim"; //进出场动画
import Layout from "../components/layout/layout";
import Banner from "../components/banner/banner";
const ScrollOverPack = ScrollAnim.OverPack;

const Home = () => (
    <Layout>
        <Banner />
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
