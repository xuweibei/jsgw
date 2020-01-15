//公司简介
import React from "react";
import AboutModule from "../components/about-module/aboutModule";
import Layout from "../components/layout/layout";

export default class About extends React.PureComponent {
    render() {
        return (
            <Layout title="关于我们">
                <AboutModule/>
            </Layout>
        )
    }
}
