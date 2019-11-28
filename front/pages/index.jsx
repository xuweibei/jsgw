import fetch from "isomorphic-unfetch";
import Layout from "../components/layout/layout";

const Home = ({ stars }) => (
    <Layout>
        <h1>这是首页!</h1>
        <h1>nextjs有{stars}颗星星</h1>
    </Layout>
);

Home.getInitialProps = async () => {
    const res = await fetch("https://api.github.com/repos/zeit/next.js");
    const json = await res.json();
    return { stars: json.stargazers_count };
};

export default Home;
