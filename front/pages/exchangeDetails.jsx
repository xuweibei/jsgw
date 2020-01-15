//资讯中心内容页
import Layout from "../components/layout/layout";
import React from "react";
import {Input, Button} from 'antd';

class ExchangeDetails extends React.PureComponent {
    render() {
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">标题标题标题</div>
                        <div className="assistant">删除</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>2020年01月03日</span>
                            <span>11:11</span>
                            <span>产品组：庄宇坤</span>
                        </div>
                        <div className="preview">浏览量：1000</div>
                    </div>
                    {/* <div className="consult-img"><img src="./consult.png" alt=""/></div> */}
                    <div className="content">空间里奋斗着就爱了看空间里奋斗着就爱了看电视剧的解放路撒娇的弗兰克撒娇的法律框架ADSL咖啡机飞拉萨的会计法拉克圣诞节电视剧的解放路撒娇的弗兰克撒娇的法律框架ADSL咖啡机飞拉萨的会计法拉克圣诞节</div>
                    <div className="discuss">
                        <Input placeholder="请输入您要评论的内容"/>
                        <Button type="primary">发送</Button>
                    </div>
                    <div className="comment-box">
                        <div className="comment-name">评论</div>
                        <div className="comment-details">
                            <div>内容圣诞节疯狂送到家了副科级打死了</div>
                            <div>删除</div>
                        </div>
                        <div className="comment-details">
                            <div>内容圣诞节疯狂送到家了副科级打死了</div>
                            <div>删除</div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default ExchangeDetails;
