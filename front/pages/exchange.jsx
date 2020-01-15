//首页
import Layout from "../components/layout/layout";
import { Button, DatePicker, Input, Select, Pagination, Modal, Upload, Form, Icon, message } from 'antd';
import React from "react";
import ExchangeDetails from "./exchangeDetails";
import Paging from '../components/paging/paging'
import Link from "next/link";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class Exchange extends React.PureComponent {
    static async getInitialProps(props) {
        const data = await fetch('http://localhost:8000/api/give_dep', { method: 'POST' });

        const res = await fetch('http://localhost:8000/api/communicate_list', { method: 'POST' });
        const talkData = await fetch('http://localhost:8000/api/re_talk', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                limit: 10,
                page: 1
            })
        });
        // console.log(dep.data)
        const ans = await res.json();
        const dep = await data.json();
        const talk = await talkData.json();
        return {
            products: ans.data,
            dep: dep.data,
            talk: talk.data
        }
    }

    constructor(props) {
        super(props);
        const { products, dep, talk } = props;
        // console.log(talk)
        this.state = {
            products,
            visible: false,
            loading: false,
            imageUrl: '',
            dep,
            talk
        }
    }

    //时间格式更改
    formatDate = (timestamp, pass) => {
        const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        if (pass === 1) {
            return Y + M + D
        } else if (pass === 2) {
            return h + m + s
        }
        return Y + M + D + h + m + s;
    }

    reception = (arr) => {
        // console.log('执行了');
        // console.log(arr, '1');
        this.setState({
            products: arr
        })
    }

    changeModal = () => {
        this.setState({
            visible: true
        })
    }

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        const formData = new FormData();
        formData.append("files", info.file.originFileObj, info.file.originFileObj.name)
        fetch('http://localhost:8000/api/talk_pic', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
        }).then(response => response.json())
            .then(res => {
                if (res && res.status === 0) {
                    this.setState({
                        imageUrl: res.data.pic
                    })
                }
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { imageUrl } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:8000/api/up_talk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pic: imageUrl, content: values.content, title: values.title }),
                }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                    })
            }
        });
    }

    render() {
        const { products, imageUrl, dep, talk } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // console.log(products.rows);
        return (
            <Layout title="部门交流">
                <div className="exchange distance">
                    <div className="exchange-head">
                        <div>部门交流</div>
                        <Button className="exchange-button" type="primary" onClick={this.changeModal}>发布新分享</Button>
                    </div>
                    <div className="sizer">
                        <div className="screen">
                            <div className="screen-left">
                                <Select
                                    placeholder="-请选择职位分类-"
                                    optionFilterProp="children"
                                >
                                    {
                                        dep && dep.length > 0 && dep.map(item => (
                                            <Option value={item.department} key={item.id}>{item.department}</Option>
                                        ))
                                    }
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
                    {
                        talk && talk.length > 0 && talk.map(item => (
                            <div>
                                <Link href={{
                                    pathname: '/exchangeDetails', query: {
                                        id: 1
                                    }
                                }}>
                                    <div key={item.id} className="bulletin-board">
                                        <div className="explain" >{item.exchange_title}</div>
                                        <div className="time-date">
                                            <div className="issuer">
                                                {item.username}
                                            </div>
                                            <div className="data">{this.formatDate(item.create_time, 1)}</div>
                                            <div className="time">{this.formatDate(item.create_time, 2)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }


                    {/*分页器*/}
                    {/*<Pagination*/}
                    {/*showSizeChanger*/}
                    {/*showQuickJumper*/}
                    {/*// onShowSizeChange={this.onShowSizeChange}*/}
                    {/*defaultCurrent={3}*/}
                    {/*total={500}*/}
                    {/*/>*/}
                    <Modal
                        title="分享动态"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        closable={false}
                        onOk={this.handleSubmit}
                    >
                        <Form wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

                            <Form.Item wrapperCol={{ span: 23 }} s>
                                {
                                    getFieldDecorator(
                                        'pic', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Input something!',
                                            },
                                        ]
                                    }
                                    )(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    )
                                }
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 23 }}>
                                {
                                    getFieldDecorator(
                                        'title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入标题!',
                                            },
                                        ]
                                    }
                                    )(
                                        <Input
                                            placeholder="输入分享标题"
                                            maxLength={20}
                                        // autoSize
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 23 }}>
                                {
                                    getFieldDecorator(
                                        'content', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入分享内容!',
                                            },
                                        ]
                                    }
                                    )(
                                        <TextArea
                                            placeholder="输入分享内容"
                                            allowClear
                                            maxLength={300}
                                            autoSize
                                        />
                                    )
                                }
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Paging
                        pageChange={this.reception.bind(this)}
                        total={products.count}
                        port="communicate_list"
                    />
                </div>
            </Layout>
        )
    }
}

export default Form.create()(Exchange);
