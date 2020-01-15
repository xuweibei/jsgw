//公司公告
import Layout from "../components/layout/layout";
import BulletinModule from '../components/bulletin-module/bulletinModule'
import Paging from '../components/paging/paging'
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import {Input, Select, DatePicker, Button, Pagination} from 'antd';
import React from "react";

class Bulletin extends  React.PureComponent{
    render(){
        return(
            <Layout>
                <BulletinModule/>
                {/*<div className="bulletin">
                    <div className="banner ">
                        <div className="join-one">公司公告</div>
                        <div className="join">Company announcement </div>
                    </div>
                    表单搜索栏
                    <div className="sizer distance">
                        <div className="screen">
                            <div>
                                <Input className="fill" placeholder="请输入关键字" onChange={(res)=>this.setState({keyWord:res.target.value})} />
                                <RangePicker
                                    onChange={(res)=>this.setState({create_time:res})}
                                    value={create_time}
                                    placeholder={['发布开始时间','发布结束时间']}
                                />
                            </div>
                            <Button type="primary" onClick={this.sellSearch}>搜索</Button>
                        </div>
                    </div>
                    公告栏
                    <div>
                        {
                           data.rows && data.rows.length>0 && data.rows.map(item=>(
                               <Link href={{pathname: '/bulletinDetail', query: {id: item.id}}}>
                                    <div key={item.create_time} className="bulletin-board distance">
                                        <div className="explain">{item.title}</div>
                                        <div className="time-date">
                                            <div className="data">{this.formatDate(item.create_time,1)}</div>
                                            <div className="time">{this.formatDate(item.create_time,2)}</div>
                                        </div>
                                    </div>
                                </Link>
                           ))
                        }
                    </div>
                    分页器
                    <Paging
                        pageChange={this.reception.bind(this)}
                        total={data.total}
                        port="get_communicate_list"
                    />
                    <div className="distance">
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            // onShowSizeChange={this.onShowSizeChange}
                            defaultCurrent={1}
                            Pagination={5}
                            total={data?data.length:0}
                        />
                    </div>
                </div>*/}
            </Layout>
        )
    }
}




export default Bulletin;
