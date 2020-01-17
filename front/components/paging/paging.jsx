import React from "react";
import {Pagination} from 'antd';

class Paging extends React.PureComponent {
    //切换页码
    pageChange = (page, pagesize) => {
        const {port} = this.props;
        fetch(`http://localhost:8000/api/${port}`,{method:'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify({
                limit:pagesize,offset:0,page
            })}).then(res=>{
            res.json().then(res=>{
                if(res && res.status === 0){
                    this.props.pageChange(res.data)
                }
            })
        });
    }
    render() {
        const {total} = this.props;
        return (
            <div className="distance">
                {/*分页器*/}
                <Pagination
                    showSizeChanger
                    showQuickJumper
                    total={total}
                    onChange={(page, pagesize) => this.pageChange(page, pagesize)}
                    onShowSizeChange={(page, pagesize) => this.pageChange(page, pagesize)}
                />
            </div>
        )
    }
}

export default Paging;
