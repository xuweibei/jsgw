//资讯中心详情页
import Layout from "../components/layout/layout";
import React from "react";
import {Input, Button} from 'antd';
import fetch from 'isomorphic-unfetch';

class InfoDetails extends React.Component {
    static async getInitialProps(props) {
        const res = await fetch('http://localhost:8000/api/get_info_detail',{method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id: 1})});
        const info = await res.json();
        return {
            info: info.data
        }
    }

    constructor(props) {
        super(props)
        const {info} = props
        this.state = {
            info
        }
    }

    render() {
        const {info} = this.state;
        console.log(info)
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">{info[0].info_title}</div>
                        <div className="assistant">删除</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>{info[0].updatedAt}</span>
                            <span>11:11</span>
                            <span>产品组：庄宇坤</span>
                        </div>
                        <div className="preview">浏览量：1000</div>
                    </div>
                    <div className="consult-img"><img src="./consult.png" alt=""/></div>
                    <div className="content" dangerouslySetInnerHTML={{__html: info[0].info_content}}></div>
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

export default InfoDetails;
