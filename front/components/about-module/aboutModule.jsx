//公司简介
import React from "react";
import { Anchor } from 'antd';
const { Link } = Anchor;
import fetch from 'isomorphic-unfetch';

class AboutModule extends React.Component {
    state = {
        cultures: '',
        intros: '',
        events: []
    }
    componentDidMount() {
        this.getCulture();
        this.getSynopsis();
        this.getRecord()
    }

    //公司文化
    getCulture = () => {
        fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                id: 2
            })}).then(res => {
            res.json().then(datal => {
                if(datal && datal.status === 0){
                    console.log(datal.data.html);
                    this.setState({
                        cultures:datal.data.html
                    })
                }
            })
        })
    }
    //公司简介
    getSynopsis = () => {
        fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                id: 1
            })}).then(res => {
            res.json().then(datal => {
                if(datal && datal.status === 0){
                    console.log(datal);
                    this.setState({
                        intros:datal.data.html
                    })
                }
            })
        })
    }

    getRecord = () => {
        fetch('http://localhost:8000/api/get_events', {method: 'POST'}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    this.setState({
                        events: datal.data
                    })
                }
            })
        })
    }

    render() {
        const {cultures, intros, events} = this.state;
        console.log(events)
        return (
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
                        <div className="synopsis-content" dangerouslySetInnerHTML={{__html:intros}}/>
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
                    <div className="culture-content" dangerouslySetInnerHTML={{__html:cultures}}/>
                    <img className="culture-img" src="/introduce.png" alt="" />
                </div>
            </div>
        )
    }
}

export default AboutModule;
