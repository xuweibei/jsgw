//公司简介
import Layout from "../components/layout/layout";
// import "../static/style/page/about.less";
import React from "react";
import { Anchor } from 'antd';
const { Link } = Anchor;

export default class About extends React.PureComponent {
    static async getInitialProps(props) {
        const res = await fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            id: 2
        })});
        const res2 = await fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            id: 1
        })});
        const eventRes = await fetch('http://localhost:8000/api/get_events', {method: 'POST'});
        const cultureRes = await res.json();
        const introRes = await res2.json();
        const events = await eventRes.json();
        return {
            cultures: cultureRes.data,
            intros: introRes.data,
            events: events.data
        }
    }

    constructor(props){
        super(props);
        const {cultures, intros, events} = props;
        this.state = {
            cultures,
            intros,
            events
        }
    }

    render() {
        const {cultures, intros, events} = this.state;
        console.log(events)
        return (
            <Layout title="关于我们">
                <div className="about">
                    <div className="banner ">
                        <div className="join-one">公司简介</div>
                        <div className="join">Company announcement </div>
                    </div>
                    {/*<img className="banner" src="/introduce.png" alt="" />*/}
                    {/*公司简介*/}
                    <div id="brief" className="synopsis distance">
                        <div className="synopsis-left">
                            <img className="synopsis-img" src="/introduce.png" alt="" />
                        </div>
                        <div className="synopsis-right">
                            <div className="across"/>
                            <div className="synopsis-name">中战科技网络有限公司</div>
                            <div className="synopsis-content" dangerouslySetInnerHTML={{__html:intros.html}}/>
                        </div>
                        <Anchor className="anchor" affix>
                            <Link href="#brief" title="公司简介" />
                            <Link href="#act" title="大事记" />
                            <Link href="#civil" title="企业文化" />
                        </Anchor>
                    </div>
                    {/*大事记*/}
                    <div id="act" className="deed distance">
                        <div className="deed-name">中战大事记</div>
                        <div className="deed-each-box">
                            {
                                events.map(item => (
                                    <div className="deed-each">
                                        <div className="time">
                                            <div className="circle cycle">
                                                <div className="dot"/>
                                            </div>
                                    <div className="short">{item.time.split('/')[0]}年</div>
                                        </div>
                                        <div className="each-content">{item.event_content}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/*公司文化*/}
                    <div id="civil" className="culture distance">
                        {/* <div dangerouslySetInnerHTML={{__html:cultures.html}}/> */}
                        <div className="culture-name">公司文化</div>
                        <div className="across"/>
                        <div className="culture-content" dangerouslySetInnerHTML={{__html:cultures.html}}/>
                        <img className="culture-img" src="/introduce.png" alt="" />
                    </div>
                </div>
            </Layout>
        )
    }
}
