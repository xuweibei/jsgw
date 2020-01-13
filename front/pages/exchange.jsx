//首页
import Layout from "../components/layout/layout";
import {Button, DatePicker, Input, Select, Pagination} from 'antd';
import React from "react";
import ExchangeDetails from "./exchangeDetails";
import Link from "next/link";
const { Option } = Select;
const {RangePicker} = DatePicker;


class Exchange extends React.PureComponent {
    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/communicate_list',{method:'POST'});
        const ans = await res.json();
        return {
            products: ans.data,
        }
    }

    constructor(props){
        super(props);
        const {products} = props;
        this.state = {
            products
        }
    }

    //时间格式更改
    formatDate = (timestamp,pass) => {
        const date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        if(pass === 1){
            console.log(Y,M,D);
            return Y + M + D
        }else if(pass === 2){
            console.log(h,m,s);
            return h + m + s
        }
        return Y + M + D + h + m + s;
    }

    render() {
        const {products} = this.state;
        console.log(products.rows);
        return(
            <Layout title="部门交流">
                <div className="exchange distance">
                    <div className="exchange-head">
                        <div>部门交流</div>
                        <Button className="exchange-button" type="primary">发布新分享</Button>
                    </div>
                    <div className="sizer">
                        <div className="screen">
                            <div className="screen-left">
                                <Select
                                    placeholder="-请选择职位分类-"
                                    optionFilterProp="children"
                                >
                                    <Option value="jack">UI</Option>
                                    <Option value="front">前端</Option>
                                    <Option value="after">后端</Option>
                                </Select>
                                <Input className="fill" placeholder="Basic usage" />
                                <RangePicker />
                            </div>
                            <div className="search">
                                <Button type="primary">搜索</Button>
                            </div>
                        </div>

                    </div>

                    {/*公告栏*/}
                    {
                        products.rows.map(item => (
                            <div>
                                <Link href="/exchangeDetails" as="/exchangeDetails">
                                    <div key={item.id} className="bulletin-board">
                                        <div className="explain" >{item.title}</div>
                                        <div className="time-date">
                                            <div className="issuer" dangerouslySetInnerHTML={{__html:item.describe}}/>
                                            <div className="data">{this.formatDate(item.create_time,1)}</div>
                                            <div className="time">{this.formatDate(item.create_time,2)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }


                    {/*分页器*/}
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        // onShowSizeChange={this.onShowSizeChange}
                        defaultCurrent={3}
                        total={500}
                    />
                </div>
            </Layout>
        )
    }
}

export default Exchange;
