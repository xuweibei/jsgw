//资讯中心
import Layout from "../components/layout/layout";
import PaginModule from "../components/product-module/productModule";
import React from "react";

class Product extends React.PureComponent {


    render() {
        return (
            <Layout>
                <PaginModule/>
                {/*<div className="bulletin">
                    <div className="banner">
                        <div className="join-one">资讯中心</div>
                        <div className="join">Information Center</div>
                    </div>
                    表单搜索栏
                    <div className="sizer distance">
                        <div className="screen">
                            <div>
                                <Input className="fill" placeholder="Basic usage" />
                                <RangePicker />
                            </div>
                            <Button type="primary">搜索</Button>
                        </div>
                    </div>
                    公告栏
                    <div>
                        {
                            infoAns.rows && infoAns.rows.map(item => (
                                <Link href={{pathname: '/infoDetail', query: {id: item.id}}}>
                                    <div key={item.id} className="bulletin-board distance">
                                        <div className="explain" dangerouslySetInnerHTML={{__html:item.info_content}}/>
                                        <div className="time-date">
                                            <div className="data">{item.createdAt.split('T')[0]}</div>
                                            <div className="time">{item.createdAt.split('T')[1].split('.')[0]}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    分页器
                    <Paging
                        pageChange={this.reception.bind(this)}
                        total={infoAns.total}
                        port="get_info"
                    />
                </div>*/}
            </Layout>
        )
    }
}

export default Product;
