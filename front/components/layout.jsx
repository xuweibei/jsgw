//创建公共组件的第二种方式：布局组件
import Link from 'next/link';
import Head from 'next/head';
import Footer from './footer';
import '../static/style/styles.less';

export default ({ children, title = 'This is the default title' }) => (
    <>
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <header className="layout">
            <nav>
                <Link href='/'><a>Home</a></Link> |
                <Link href='/about'><a>About</a></Link> |
                <Link href='/contact'><a>Contact</a></Link>
            </nav>
        </header>

        { children }

        <Footer/>
    </>
)
