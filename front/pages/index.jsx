import ScrollAnim from "rc-scroll-anim"; //滚动动画
import QueueAnim from "rc-queue-anim"; //进出场动画
import Layout from "../components/layout/layout";
import "../static/style/page/index.less";

const ScrollOverPack = ScrollAnim.OverPack;

const Home = () => (
    <Layout>
        <div className="banner ">
            <div className="join">Join us</div>
            <div className="join-one">加入我们</div>
        </div>
        <div className="each">
            <div className="datum">
                <div className="position">
                    <div>UI/UE 设计师</div>
                    <div>6k-7k</div>
                </div>
                <div className="specification">
                    <div>研发</div>
                    <div>辅助</div>
                    <div>3人</div>
                </div>
                <div className="time">
                    <div>2019-11-11</div>
                    <div>12:11:11</div>
                </div>
            </div>
            <div className="details">查看详细<img src={"/arrows.png"} alt=""/></div>
        </div>
    </Layout>
);

// Home.getInitialProps = async () => {
//     const res = await fetch("https://api.github.com/repos/zeit/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

export default Home;
