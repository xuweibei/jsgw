//公司简介
import React from "react";
import {Input, DatePicker, Button} from 'antd';
const {RangePicker} = DatePicker;
import Paging from '../../components/paging/paging'
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

class InfoModule extends React.PureComponent {
    state = {
        infoAns: [],  //数据条
        gross: '' ,  //总共多少条
        key_val: '',
        start_time: []
    }
    componentDidMount() {
        this.getNotice()
    }

    getNotice = () => {
        console.log('執行了');
        fetch('http://localhost:8000/api/get_info', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                limit:10,offset:0,page:1
            })}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    console.log(datal);
                    this.setState({
                        infoAns: datal.data.rows,
                        gross: datal.data.total
                    })
                }
            })
        })
    }

    //筛选按钮
    getSelect = () => {
        const {key_val, start_time} = this.state;
        const arr = []
        if(start_time && start_time.length > 1){
            arr.push(start_time[0].format('YYYY-MM-DD'))
            arr.push(start_time[1].format('YYYY-MM-DD'))
        }
        const datas = {
            post_name: key_val,
            arr
        }
        console.log(key_val);
        console.log(start_time);
        fetch('http://localhost:8000/api/get_info', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(datas)}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    console.log(datal);
                    this.setState({
                        infoAns: datal.data.rows,
                        gross: datal.data.total
                    })
                }
            })
        })
    }

/*    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/get_products',{method:'POST'});   //产品接口
        const ans = await res.json();
        const infoAns = await infoRes.json();
        return {
            products: ans.data,
            infoAns: infoAns.data,
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
    }*/

    reception = (arr) => {
        this.setState({
            infoAns: arr.rows,
            gross: arr.total
        })
    }

    render() {
        const {infoAns, gross, key_val, start_time} = this.state;
        console.log(infoAns.rows);
        return (
            <div>
                {/*表单搜索栏*/}
                <div className="sizer distance">
                    <div className="screen">
                        <div>
                            <Input className="fill" value={key_val} onChange={(res)=>this.setState({key_val:res.target.value})} placeholder="输入关键字" />
                            <RangePicker
                                placeholder={['发布开始时间','发布结束时间']}
                                onChange={(res)=>this.setState({start_time:res})}
                                value={start_time}
                            />
                        </div>
                        <Button onClick={() => this.getSelect()} type="primary">搜索</Button>
                    </div>
                </div>
                {/*公告栏*/}
                <div>
                    {
                        infoAns.rows && infoAns.rows.length > 0 && infoAns.rows.map(item => (
                            <Link href={{pathname: '/infoDetail', query: {id: item.id}}}>
                                <div key={item.id} className="bulletin-board distance">
                                    <div className="explain">{item.info_title}</div>
                                    <div className="time-date">
                                        <div className="data">{item.updatedAt.split('T')[0]}</div>
                                        <div className="time">{item.updatedAt.split('T')[1].split('.')[0]}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/*分页器*/}
                <Paging
                    pageChange={this.reception.bind(this)}
                    total={gross.total}
                    port="get_info"
                />
            </div>
        )
    }
}

export default InfoModule;
