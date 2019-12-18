import ScrollAnim from "rc-scroll-anim"; //滚动动画
import QueueAnim from "rc-queue-anim"; //进出场动画
import Layout from "../components/layout/layout";
import "../static/style/page/index.less";
import {Form} from 'react-bootstrap';
const ScrollOverPack = ScrollAnim.OverPack;

const Home = () => (
    <Layout>
        <div className="banner">
            <div className="join">Join us</div>
            <div className="join-one">加入我们</div>
        </div>
        <div className="list distance">
            <Form.Row>
                <Form.Group controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="请输入职位关键字" />
                </Form.Group>

                <Form.Group controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </div>
    </Layout>
);

// Home.getInitialProps = async () => {
//     const res = await fetch("https://api.github.com/repos/zeit/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

export default Home;
