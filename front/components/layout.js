//创建公共组件的第二种方式：布局组件

const Layout = (props) => (
    <div style={{
        margin: 20,
        padding: 20,
        border: '1px solid #DDD',
        background: 'grey'
    }}>
        {props.children}
    </div>
)

export default Layout