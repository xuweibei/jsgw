//资讯中心
import Layout from "../components/layout/layout";
import React from "react";
import {Input, Select, DatePicker, Button, Pagination} from 'antd';
const {RangePicker} = DatePicker;
const { Option } = Select;

class Product extends React.PureComponent {

    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/get_products',{method:'POST'});
        const infoRes = await fetch('http://localhost:8000/api/get_info', {method: 'POST',headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            limit:5,offset:0,page:1
        })});
        const ans = await res.json();
        const infoAns = await infoRes.json();
        return {
            products: ans.data,
            infoAns: infoAns.data ? infoAns.data.rows : []
        }
    }

    constructor(props){
        super(props);
        const {products, infoAns} = props;
        this.state = {
            products,
            infoAns,
            spaceNum: 0, //偏移距离
            spaceAmount: 0, //点击数量
        }
    }

    render() {
        const {products, infoAns} = this.state;
        console.log(infoAns)
        return (
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
                        {
                            infoAns.map(item => (
                                <div key={item.id} className="bulletin-board distance">
                                    <div className="explain" dangerouslySetInnerHTML={{__html:item.info_content}}/>
                                    <div className="time-date">
                                        <div className="data">{item.createdAt.split('T')[0]}</div>
                                        <div className="time">{item.createdAt.split('T')[1].split('.')[0]}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/*分页器*/}
                    <div className="distance">
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            // onShowSizeChange={this.onShowSizeChange}
                            defaultCurrent={1}
                            total={100}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Product;
