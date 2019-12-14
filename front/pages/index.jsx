import ScrollAnim from "rc-scroll-anim"; //滚动动画
import QueueAnim from "rc-queue-anim"; //进出场动画
import { DatePicker } from 'antd';
import moment from 'moment'
import Layout from "../components/layout/layout";
import "../static/style/page/index.less";

const ScrollOverPack = ScrollAnim.OverPack;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const Home = () => (
    <Layout>
        <div className="banner">
            <div className="join">Join us</div>
            <div className="join-one">加入我们</div>
        </div>
        <div className="list distance">
        <RangePicker
            defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
        />
        </div>
    </Layout>
);

// Home.getInitialProps = async () => {
//     const res = await fetch("https://api.github.com/repos/zeit/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

export default Home;
