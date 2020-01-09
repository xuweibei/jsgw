import Layout from "../components/layout/layout";
// import "../static/style/page/bulletin.less";
import fetch from 'isomorphic-unfetch';
import {Input, Select, DatePicker, Button, Pagination} from 'antd';
const {RangePicker} = DatePicker;

class Bulletin extends  React.PureComponent{

    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/communicate_list',{method:'POST'});
        const data = await res.json();
        return {
            data:data.data ? data.data.rows : []
        }
    }

    constructor(props){
        super(props);
        const {data} = props;
        this.state = {
            data
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
            return Y + M + D
        }else if(pass === 2){
            return h + m + s
        }
        return Y + M + D + h + m + s;
    }


    sellSearch = () => {
        const{keyWord,create_time} = this.state;
        const keyArr = ['title','create_time','end_time'];
        const arr = [keyWord];
        const datas = new FormData();
        if(create_time && create_time.length >0){
            arr.push(create_time[0].format('YYYY-MM-DD'));
            arr.push(create_time[1].format('YYYY-MM-DD'));
        }
        keyArr.forEach((item,index)=>{
            arr.forEach((data,num)=>{
                if(data && index === num){
                    datas.append(item,data);
                }
            })
        })
        fetch('http://localhost:8000/api/communicate_list',{method:'POST',body: datas
        }).then(res=>{
            res.json().then(datal=>{
                if(datal && datal.status === 0){
                    this.setState({
                        data:datal.data ? datal.data.rows : []
                    })
                }
            })
        });
    }

    render(){
        const {data,create_time} = this.state;
        return(
            <Layout>
                <div className="bulletin">
                    <div className="banner ">
                        <div className="join-one">公司公告</div>
                        <div className="join">Company announcement </div>
                    </div>
                    {/*表单搜索栏*/}
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
                    {/*公告栏*/}
                    <div>
                        {
                            data && data.length>0 && data.map(item=>{
                                return <div key={item.create_time} className="bulletin-board distance">
                                    <div className="explain">{item.title}</div>
                                    <div className="time-date">
                                        <div className="data">{this.formatDate(item.create_time,1)}</div>
                                        <div className="time">{this.formatDate(item.create_time,2)}</div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    {/*分页器*/}
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
                </div>
            </Layout>
        )
    }
}




export default Bulletin;
