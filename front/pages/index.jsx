//首页
import Layout from "../components/layout/layout";
import { Modal, Button} from 'antd';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class Index extends React.Component {

    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/get_products',{method:'POST'});
        const infoRes = await fetch('http://localhost:8000/api/get_info', {method: 'POST'});
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
        const {spaceNum, spaceAmount, infoAns} = this.state;
        console.log(infoAns + 'infoAns');
        console.log(spaceAmount);
        if (site === 'left') {
            if (spaceNum >= 0) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum + 335,
                spaceAmount: prevState.spaceAmount - 1,
            }));
        } else {
            if (spaceAmount >= infoAns.length - 3) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum - 335,
                spaceAmount: prevState.spaceAmount + 1,
            }));
        }
    };

    render() {
        const {spaceNum, products, infoAns, type} = this.state;
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
                                        infoAns.map(item => (
                                            <div className="carousel-wrap-list" key={item.id}>
                                                <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                                <div className="carousel-content">
                                                    <div className="carousel-title">
                                                        {item.info_title}
                                                    </div>
                                                    <div className="carousel-time">{item.createdAt.split('T')[0]}</div>
                                                    <div className="carousel-btn" onClick={this.examine}>
                                                        <Link href={{pathname: '/infoDetail', query: {id: item.id}}}>立即查看</Link>
                                                    </div>
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
                            <Link href="/join">
                                <div className="possess-box">
                                    <div className="possess">
                                        <img src="possess.png" alt=""/>
                                    </div>
                                    <div>全部岗位</div>
                                </div>
                            </Link>
                            <Link href={{pathname: '/join', query: {jobType: '研发类'}}}>
                                <div className="computers-box">
                                    <div className="computers">
                                        <img src="computers.png" alt=""/>
                                    </div>
                                    <div>研发岗位</div>
                                </div>
                            </Link>
                            <Link href={{pathname: '/join', query: {jobType: '行政岗位'}}}>
                                <div className="manage-box">
                                    <div className="manage">
                                        <img className="manage-img" src="product.png" alt=""/>
                                    </div>
                                    <div>行政岗位</div>
                                </div>
                            </Link>
                        </div>
                    </div>
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
