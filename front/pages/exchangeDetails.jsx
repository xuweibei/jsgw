//资讯中心内容页
import Layout from "../components/layout/layout";
import React from "react";
import { Input, Button } from 'antd';

class ExchangeDetails extends React.PureComponent {

    // static async getInitialProps(props) {
    // const data = await fetch('http://localhost:8000/api/talk_detail', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: {id}
    // });

    //     // console.log(dep.data)
    //     const ans = await res.json();
    //     return {
    //         products: ans.data,
    //     }
    // }

    state = {
        data: {}
    }

    componentDidMount() {
        this.getDetail()
    }

    formatDate = (timestamp, pass) => {
        const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        if (pass === 1) {
            return Y + M + D
        } else if (pass === 2) {
            return h + m + s
        }
        return Y + M + D + h + m + s;
    }

    getDetail = () => {
        const id = window.location.search.substr(1).split('=')[1]
        const data = fetch('http://localhost:8000/api/talk_detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(responst => responst.json())
            .then(res => {
                if (res && res.status === 0) {
                    this.setState({
                        data: res.data
                    })
                }
            })
    }

    render() {
        const { data } = this.state;
        console.log(data)
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">{data && data.exchange_title}</div>
                        <div className="assistant">删除</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>{this.formatDate(data.create_time, 1)}</span>
                            <span>{this.formatDate(data.create_time, 2)}</span>
                            <span>{`${data.department_id} ${data.username}`}</span>
                        </div>
                        <div className="preview">浏览量：1000</div>
                    </div>
                    <div className="consult-img"><img src={data.exchange_pic} alt="" /></div>
                    <div className="content">{data.exchange_content}</div>
                    <div className="discuss">
                        <Input placeholder="请输入您要评论的内容" />
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
