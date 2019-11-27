//创建公共组件的第二种方式：布局组件
import "./styles.less";

const Layout = props => <div className="layout">{props.children}</div>;

export default Layout;
