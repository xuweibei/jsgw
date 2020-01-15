//公司公告
import Layout from "../components/layout/layout";
import BulletinModule from '../components/bulletin-module/bulletinModule'
import React from "react";

class Bulletin extends  React.PureComponent{
    render(){
        return(
            <Layout>
                <BulletinModule/>
            </Layout>
        )
    }
}




export default Bulletin;
