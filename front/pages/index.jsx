import Layout from "../components/layout/layout";
// import "../static/style/page/index.less";
import fetch from 'isomorphic-unfetch';

class Index extends React.Component {

    state = {
        spaceNum: 0, //偏移距离
        spaceAmount: 0, //点击数量
    };

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

    render() {
        const {spaceNum} = this.state;
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
                                <div className="carousel-wrap-list">
                                    <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                    <div className="carousel-content">
                                        <div className="carousel-title">
                                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                                        </div>
                                        <div className="carousel-time">2019-12-05</div>
                                        <div className="carousel-btn">立即查看</div>
                                    </div>
                                </div>
                                <div className="carousel-wrap-list">
                                    <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                    <div className="carousel-content">
                                        <div className="carousel-title">
                                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                                        </div>
                                        <div className="carousel-time">2019-12-05</div>
                                        <div className="carousel-btn">立即查看</div>
                                    </div>
                                </div>
                                <div className="carousel-wrap-list">
                                    <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                    <div className="carousel-content">
                                        <div className="carousel-title">
                                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                                        </div>
                                        <div className="carousel-time">2019-12-05</div>
                                        <div className="carousel-btn">立即查看</div>
                                    </div>
                                </div>
                                <div className="carousel-wrap-list">
                                    <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                    <div className="carousel-content">
                                        <div className="carousel-title">
                                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                                        </div>
                                        <div className="carousel-time">2019-12-05</div>
                                        <div className="carousel-btn">立即查看</div>
                                    </div>
                                </div>
                                <div className="carousel-wrap-list">
                                    <img className="carousel-img" src="/hong-bg.png" alt=""/>
                                    <div className="carousel-content">
                                        <div className="carousel-title">
                                            标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                                        </div>
                                        <div className="carousel-time">2019-12-05</div>
                                        <div className="carousel-btn">立即查看</div>
                                    </div>
                                </div>
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
                            <div className="list">
                                <img className="list-img" src="/hong-bg.png" alt=""/>
                                <div className="list-name">中卖网</div>
                            </div>
                            <div className="list">
                                <img className="list-img" src="/hong-bg.png" alt=""/>
                                <div className="list-name">中卖网</div>
                            </div>
                            <div className="list">
                                <img className="list-img" src="/hong-bg.png" alt=""/>
                                <div className="list-name">中卖网</div>
                            </div>
                            <div className="list">
                                <img className="list-img" src="/hong-bg.png" alt=""/>
                                <div className="list-name">中卖网</div>
                            </div>
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

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:8000/api/communicate_list',{method:'POST'});

    const json = await res.json();
    console.log(json);
    return { data: json }
}

export default Index;
