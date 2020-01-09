import Layout from "../components/layout/layout";
import {Button, DatePicker, Input, Select, Pagination} from 'antd';
const { Option } = Select;
const {RangePicker} = DatePicker;
// import "../static/style/page/exchange.less";

export default () => (
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
                <div className="bulletin-board">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="issuer">纸质书</div>
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="issuer">纸质书</div>
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="issuer">纸质书</div>
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="issuer">纸质书</div>
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
                <div className="bulletin-board">
                    <div className="explain">【公告】公告公告公告公告公告公告公告公告...</div>
                    <div className="time-date">
                        <div className="issuer">纸质书</div>
                        <div className="data">2019.30.20</div>
                        <div className="time">15:30:02</div>
                    </div>
                </div>
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
);
