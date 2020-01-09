import Layout from "../components/layout/layout";
import React from "react";
import "../static/style/page/bulletin.less";
import {Input, Select, DatePicker, Button, Pagination} from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

export default () => (
    <Layout>
        <div className="bulletin">
            <div className="banner">
                <div className="join-one">资讯中心</div>
                <div className="join">Information Center</div>
            </div>
            {/*表单搜索栏*/}
            <div className="sizer distance">
                <div className="screen">
                    <div>
                        <Input className="fill" placeholder="Basic usage" />
                        <RangePicker />
                    </div>
                    <Button type="primary">搜索</Button>
                </div>
            </div>
            {/*公告栏*/}
            <div>
                <div className="bulletin-board distance">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board distance">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board distance">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board distance">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board distance">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
            </div>
            {/*分页器*/}
            <div className="distance">
                <Pagination
                    showSizeChanger
                    showQuickJumper
                    // onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={3}
                    total={500}
                />
            </div>
        </div>
    </Layout>
);
