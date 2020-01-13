//加入我们
import Layout from "../components/layout/layout";
import fetch from 'isomorphic-unfetch';
import {Button, DatePicker, Input, Pagination, Select,Modal} from "antd";
// import "../static/style/page/join.less";
const { Option } = Select;
const {RangePicker} = DatePicker;

export default class Join extends React.Component{

    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/get_recruit',{method:'POST'}); //获取招聘信息
        const data = await res.json();
        const job = await fetch('http://localhost:8000/api/get_classify',{method:'POST'}); //获取职位分类
        const dataJob = await job.json();
        const workData = [];//储存option的列表
        data.data.rows.forEach(item=>{
            if(!workData.some(aa=> item.address_name === aa)){
                workData.push(item)
            }
        })
        return {
            data:data.data,
            dataJob,
            workData
        }
    }
    constructor(props) {
        super(props);
        const {data,dataJob,workData} = props;
        // 定义state数据
        this.state = {
            data,//招聘信息
            dataJob,//职位分类
            workData,//工作地点
            detail:false // 是否显示详情
        }
    }

    //时间格式更改
    formatDate = (timestamp) => {
        const date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '年';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        const D = date.getDate() + '日 ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        return Y + M + D + h + m + s;
    }

    //点击搜索
    search = () => {
        const {post_name,job_class,address_name,start_time} = this.state;
        const keyArr = ['post_name','job_class','address_name','start_time','end_time'];
        const arr = [post_name,job_class,address_name];
        const datas = new FormData();
        if(start_time && start_time.length>1){
            arr.push(start_time[0].format('YYYY-MM-DD'));
            arr.push(start_time[1].format('YYYY-MM-DD'));
        }
        keyArr.forEach((item,index)=>{
            arr.forEach((data,num)=>{
                if(data && index === num){
                    datas.append(item,data);
                }
            })
        })
        fetch('http://localhost:8000/api/get_recruit',{method:'POST',body: datas
        }).then(res=>{
            res.json().then(datal=>{
                if(datal && datal.status === 0){
                    this.setState({
                        data:datal.data
                    })
                }
            })
        });
    }

    //清除筛选条件
    clearSearch = () => {
        this.setState({
            post_name:'',
            job_class:'',
            address_name:'',
            start_time:''
        });
    }


    //查看详情
    seeDetail = (data) => {
        this.setState({
            detail:true,
            detailInfo:data
        })
    }

    handleCancel =()=>{
        this.setState({
            detail:false,
        })
    }

    render(){
        const {data,dataJob,workData,post_name,job_class,address_name,start_time,detail,detailInfo} = this.state;
        console.log(data)
        return (
            <Layout title="人才招聘">
                <div className="join">
                    {/*banner图*/}
                    <div className="banner">
                        <div className="join-one">加入我们</div>
                        <div className="join">Join us</div>

                    </div>
                    {/*表单搜索栏*/}
                    <div className="sizer distance">
                        <div className="screen">
                            <Input className="fill" value={post_name} placeholder="请输入职位关键字" onChange={(res)=>this.setState({post_name:res.target.value})} />
                            <Select
                                placeholder="-请选择职位分类-"
                                optionFilterProp="children"
                                value={job_class}
                                onChange={(res)=>this.setState({job_class:res})}
                            >
                                <Option value="">全部</Option>
                                {
                                    dataJob && dataJob.data && dataJob.data.length>0 && dataJob.data.map(item=><Option key={item.id} value={item.classify}>{item.classify}</Option>)
                                }
                            </Select>
                            <Select
                                placeholder="-请选择工作地点-"
                                optionFilterProp="children"
                                value={address_name}
                                onChange={(res)=>this.setState({address_name:res})}
                            >
                                <Option value="">全部</Option>
                                {
                                    workData && workData.length >0 && workData.map(item=><Option key={item.start_time} value={item.address_name}>{item.address_name}</Option>)
                                }
                            </Select>
                            <RangePicker
                                placeholder={['发布开始时间','发布结束时间']}
                                onChange={(res)=>this.setState({start_time:res})}
                                value={start_time}
                            />
                        </div>
                        <div className="search">
                            <span className="empty" onClick={this.clearSearch}>清空筛选条件</span>
                            <Button type="primary" onClick={this.search}>搜索</Button>
                        </div>
                    </div>
                    {/*每项数据内容*/}
                    <div>
                        {
                            data && data.rows &&  data.rows.length >0 && data.rows.map(item=>{
                                return  <div className="each" key={item.start_time}>
                                    <div className="datum">
                                        <div className="position">
                                            <div>{item.post_name}</div>
                                            <div>{item.salary}k</div>
                                        </div>
                                        <div className="specification">
                                            <div>{item.job_class}</div>
                                            <div>{item.detail_address}</div>
                                            <div>{item.require_num || 0}人</div>
                                        </div>
                                        <div className="time">
                                            <div>{this.formatDate(item.start_time)}</div>
                                        </div>
                                    </div>
                                    <div className="details" onClick={()=>this.seeDetail(item)}>查看详细<img src={"/arrows.png"} alt=""/></div>
                                </div>
                            })
                        }
                        <div className="distance">
                            <Pagination
                                showSizeChanger
                                showQuickJumper
                                // onShowSizeChange={this.onShowSizeChange}
                                defaultCurrent={1}
                                Pagination={5}
                                total={(data && data.rows)?data.rows.length:0}
                            />
                        </div>
                        {
                            detailInfo &&
                            <Modal
                                title="Basic Modal"
                                visible
                                visible={detail}
                                okText="关闭"
                                closeIcon
                                title={detailInfo.post_name}
                                className="detail-main"
                                onOk={this.handleCancel}
                            >
                               <div className="detail-top">
                                    <div className="detail">
                                        <div>
                                            <label>职位类型：</label>
                                            <span>{detailInfo.job_class}</span>
                                        </div>
                                        <div>
                                            <label>薪资：</label>
                                            <span className="money">{detailInfo.salary}</span>
                                        </div>
                                        <div>
                                            <label>电话：</label>
                                            <span>{detailInfo.phone}</span>
                                        </div>
                                    </div>
                                    <div className="detail">
                                        <div>
                                            <label>工作地点：</label>
                                            <span>{detailInfo.address_name}</span>
                                        </div>
                                        <div>
                                            <label>人数：</label>
                                            <span>{detailInfo.require_num}</span>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="detail">
                                        <div>
                                            <label>详细地址：</label>
                                            <span>{detailInfo.detail_address}</span>
                                        </div>
                                        <div>
                                            <label>邮箱：</label>
                                            <span>{detailInfo.email}</span>
                                        </div>
                                        <div></div>
                                    </div>
                               </div>
                               <div className="detail-bottom">
                                   <div>
                                       <label>工作内容：</label>
                                       <p>{detailInfo.work_content}</p>
                                   </div>
                                   <div>
                                       <label>岗位职责：</label>
                                       <p>{detailInfo.post_job}</p>
                                   </div>
                               </div>
                            </Modal>
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}
