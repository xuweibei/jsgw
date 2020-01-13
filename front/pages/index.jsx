//首页
import Layout from "../components/layout/layout";
import { Modal, Button } from 'antd';
import fetch from 'isomorphic-unfetch';

class Index extends React.PureComponent {

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
            visible: false,  //弹窗
            type: [
                {font: '职位类型：', explain: '研发类'},
                {font: '薪资：', explain: '6k-7k'},
                {font: '电话：', explain: '187-9878-0987'},
                {font: '工作地点：', explain: '福州'},
                {font: '人数：', explain: '10'},
                {font: '详细地址：', explain: '福州仓山区山亚大厦B座1218'},
                {font: '邮箱：', explain: '348957@qq.com'},
            ]
        }
    }

    removal = (site) => {
        const {spaceNum, spaceAmount} = this.state;
        console.log(spaceNum);
        console.log(spaceAmount);
        if (site === 'left') {
            if (spaceNum >= 0) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum + 335,
                spaceAmount: prevState.spaceAmount - 1,
            }));
        } else {
            if (spaceAmount >= 2) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum - 335,
                spaceAmount: prevState.spaceAmount + 1,
            }));
        }
    };

    examine = () => {
        console.log('执行了');
        this.setState({
            visible: true
        })
    };

    close = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        const {spaceNum, products, infoAns, visible, type} = this.state;
        return(
            <Layout>
                <div className="home">
                    <img className="banner" src="/hong-bg.png" alt=""/>
                    <div className="distance">
                        {/*最新动态*/}
                        <div className="dynamic">
                            <div className="headline">最新动态</div>
                            <div className="carousel-wrap">
                                <div className="carousel-wrap-abs" style={{left: spaceNum}}>
                                    {
                                        infoAns.map((item, index) => (
                                            <div className="carousel-wrap-list" key={index}>
                                                <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                                <div className="carousel-content">
                                                    <div className="carousel-title">
                                                        {item.info_title}
                                                    </div>
                                                    <div className="carousel-time">{item.createdAt}</div>
                                                    <div className="carousel-btn" onClick={this.examine}>立即查看</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="arrow-left" onClick={() => this.removal('left')}>
                                <div className="arrow-lines"/>
                                <div className="arrow-line"/>
                            </div>
                            <div className="arrow-right" onClick={() => this.removal('right')}>
                                <div className="arrow-line"/>
                                <div className="arrow-lines"/>
                            </div>
                        </div>
                        {/*产品中心*/}
                        <div className="product">
                            <div className="headline">产品中心</div>
                            <div className="product-list">
                                {
                                    products.map((item, index) => (
                                        <div className="list" key={index}>
                                            <img className="list-img" src={item.logo} alt=""/>
                                            <div className="list-name">{item.pro_name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {/*加入我们*/}
                    <div>
                        <div className="headline">加入我们</div>
                        <div className="participate">
                            <div className="possess-box">
                                <div className="possess">
                                    <img src="possess.png" alt=""/>
                                </div>
                                <div>全部岗位</div>
                            </div>
                            <div className="computers-box">
                                <div className="computers">
                                    <img src="computers.png" alt=""/>
                                </div>
                                <div>研发岗位</div>
                            </div>
                            <div className="manage-box">
                                <div className="manage">
                                    <img className="manage-img" src="product.png" alt=""/>
                                </div>
                                <div>行政岗位</div>
                            </div>
                        </div>
                    </div>
                    {
                        visible && (
                            <div >
                                <Modal
                                    className="home-window"
                                    title="Basic Modal"
                                    closable={false}
                                    footer={[
                                        <Button key="submit" type="primary" onClick={this.close}>
                                            关闭
                                        </Button>,
                                    ]}
                                    visible={this.state.visible}
                                >
                                    {
                                        type.map((item, index) => (
                                            <div key={index} className={`details ${item.font === '人数：' ? 'num' : ''}`}>
                                                <span>{item.font}</span>
                                                <span>{item.explain}</span>
                                            </div>
                                        ))
                                    }
                                    <div className="work">
                                        <div>工作内容：</div>
                                        <div>工作内容工作内容：工作内容：工作内容：工作内容：工作内容：工作内容：工作内容：工作内容：工作内容：</div>
                                    </div>
                                </Modal>
                            </div>
                        )
                    }
                </div>
            </Layout>
        )
    }
}

// Index.getInitialProps = async () => {
//     const res = await fetch('http://localhost:8000/api/get_tab',{method:'POST'})
//     const json = await res.json()
//     console.log(json)
//     return { data: json }
// }

// Index.getInitialProps = async () => {
//     const res = await fetch('http://localhost:8000/api/communicate_list',{method:'POST'});

//     const json = await res.json();
//     console.log(json);
//     return { data: json }
// }

export default Index;
