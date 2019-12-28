import Layout from "../components/layout/layout";
import {Button, DatePicker, Input, Pagination, Select} from "antd";
import "../static/style/page/join.less";
const { Option } = Select;
const {RangePicker} = DatePicker;

const join = () => {
    return (
        <Layout title="人才招聘">
            <div className="join">
                {/*banner图*/}
                <div className="banner">
                    <div className="join">Join us</div>
                    <div className="join-one">加入我们</div>
                </div>
                {/*表单搜索栏*/}
                <div className="sizer distance">
                    <div className="screen">
                        <Input className="fill" placeholder="Basic usage" />
                        <Select
                            placeholder="-请选择职位分类-"
                            optionFilterProp="children"
                        >
                            <Option value="jack">UI</Option>
                            <Option value="front">前端</Option>
                            <Option value="after">后端</Option>
                        </Select>
                        <Select
                            placeholder="-请选择工作地点-"
                            optionFilterProp="children"
                        >
                            <Option value="fuZhou">福州</Option>
                            <Option value="sanMing">三明</Option>
                        </Select>
                        <RangePicker />
                    </div>
                    <div className="search">
                        <span className="empty">清空筛选条件</span>
                        <Button type="primary">搜索</Button>
                    </div>
                </div>
                {/*每项数据内容*/}
                <div>
                    <div className="each">
                        <div className="datum">
                            <div className="position">
                                <div>UI/UE 设计师</div>
                                <div>6k-7k</div>
                            </div>
                            <div className="specification">
                                <div>研发</div>
                                <div>辅助</div>
                                <div>3人</div>
                            </div>
                            <div className="time">
                                <div>2019-11-11</div>
                                <div>12:11:11</div>
                            </div>
                        </div>
                        <div className="details">查看详细<img src={"/arrows.png"} alt=""/></div>
                    </div>
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
            </div>
        </Layout>
    )
}

export default join;
