//首页
import Layout from "../components/layout/layout";
import {Button, DatePicker, Input, Select, Pagination} from 'antd';
import React from "react";
import ExchangeDetails from "./exchangeDetails";
import Link from "next/link";
import fetch from "./index";
const { Option } = Select;
const {RangePicker} = DatePicker;


class Exchange extends React.PureComponent {
    // static async getInitialProps(props){
    //     const res = await fetch('http://localhost:8000/api/communicate_list', {method: 'POST'});
    //     const ans = await res.json();
    //     return {
    //         products: ans.data,
    //     }
    // }
    //
    // constructor(props){
    //     super(props);
    //     const {products} = props;
    //     this.state = {
    //         products
    //     }
    // }

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

    render() {
        const {products} = this.state;
        console.log(products);
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
                    <div>
                        <Link href="/exchangeDetails" as="/exchangeDetails">
                            <div className="bulletin-board">
                                <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                                <div className="time-date">
                                    <div className="issuer">纸质书</div>
                                    <div className="data">2019.30.20</div>
                                    <div className="time">15:30:02</div>
                                </div>
                            </div>
                        </Link>
                        <Link href="/exchangeDetails" as="/exchangeDetails">
                            <div className="bulletin-board">
                                <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                                <div className="time-date">
                                    <div className="issuer">纸质书</div>
                                    <div className="data">2019.30.20</div>
                                    <div className="time">15:30:02</div>
                                </div>
                            </div>
                        </Link>
                        <Link href="/exchangeDetails" as="/exchangeDetails">
                            <div className="bulletin-board">
                                <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                                <div className="time-date">
                                    <div className="issuer">纸质书</div>
                                    <div className="data">2019.30.20</div>
                                    <div className="time">15:30:02</div>
                                </div>
                            </div>
                        </Link>
                        <Link href="/exchangeDetails" as="/exchangeDetails">
                            <div className="bulletin-board">
                                <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                                <div className="time-date">
                                    <div className="issuer">纸质书</div>
                                    <div className="data">2019.30.20</div>
                                    <div className="time">15:30:02</div>
                                </div>
                            </div>
                        </Link>
                    </div>

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
