//资讯中心内容页
import Layout from "../components/layout/layout";
import React from "react";

class ProductDetails extends React.PureComponent {
    render() {
        return (
            <Layout>
                <div className="productDetails distance">
                    <div className="headline">标题标题标题</div>
                    <div className="time">
                        <span>2020年01月03日</span>
                        <span>11:11</span>
                        <span>产品组</span>
                    </div>
                    <div className="consult-img"><img src="./consult.png" alt=""/></div>
                    <div className="content">空间里奋斗着就爱了看空间里奋斗着就爱了看电视剧的解放路撒娇的弗兰克撒娇的法律框架ADSL咖啡机飞拉萨的会计法拉克圣诞节电视剧的解放路撒娇的弗兰克撒娇的法律框架ADSL咖啡机飞拉萨的会计法拉克圣诞节</div>
                </div>
            </Layout>
        )
    }
}

export default ProductDetails;
