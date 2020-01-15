//资讯中心
import Layout from "../components/layout/layout";
import PaginModule from "../components/product-module/productModule";
import React from "react";
import {Input, DatePicker, Button} from 'antd';
const {RangePicker} = DatePicker;
import Paging from '../components/paging/paging'

class Product extends React.PureComponent {





    render() {
        return (
            <Layout>
                <PaginModule/>
            </Layout>
        )
    }
}

export default Product;
