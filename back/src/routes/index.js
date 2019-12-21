const router = require('koa-router')()
const Logincheck = require('../middleware/checkLogin')
const login = require('./login')
const department = require('./department')
const resuirc = require('./methods/recruit')
const intro = require('./intro')
const invite = require('./invite')
const edit = require('./edit')
const job = require('./job')
const home = require('./home')
const exchange = require('./exchange')
const consult = require('./consult')
const product = require('./product')
const carousel = require('./carousel')
const postApi = require('./postApi')
const helpContent = require('./helpContent')
router.get('/', login.home)
      .post('/api/login', login.login)
      // 员工部门
      .get('/delivery/department-structur', department['departmentStructur'])
      .post('/api/add_dep', department["add-dep"])
      .post('/api/del_dep', department["del_dep"])
      .post('/api/edit_dep', department["edit_dep"])
      .post('/api/insert_stf', department["insert_stf"])
      .post('/api/get_tab', department["get_tab"])
      .post('/api/edit_emp', department["edit_emp"])
      .post('/api/del_emp', department["del_emp"])
      .post('/api/change_status', department["change_status"])
      .post('/api/get_recruit', resuirc["get_recruit"]) //获取招聘信息
      .post('/api/pcat_bak', resuirc["pcat_bak"]) //获取省市级信息
      .post('/api/add_recruiter', resuirc["add_recruiter"]) //添加招聘信息
      .post('/api/get_classify', postApi["get_classify"])
      .post('/api/add_centent_title', helpContent["add_centent_title"])
      .post('/api/add_classify',postApi['add_classify'])   //新增职业分类
      .post('/api/edit_classify',postApi['edit_classify'])   //新增职业分类
      .post('/api/del_classify',postApi['del_classify'])   //删除职·业分类
      .post('/api/change_classify_status',postApi['change_status'])   //禁用职业分类
      .post('/api/del_product',product['del_product']) //删除产品
      .post('/api/show_item',product['show_item']) //设置产品是否展示
      .post('/api/new_product',product['new_product']) //新增产品
      // 招聘
      .get('/delivery/invite', invite['invite'])
      // 公司简介
      .get('/delivery/intro', intro['intro'])
      // .get('/delivery/richText', intro['richText'])
      .post('/api/get_rich', intro['get_rich'])
      .post('/api/insert_intro', intro['insert_intro'])
      .post('/api/render_html', intro['render_html'])
      // 富文本
      // .get('/delivery/edit', Logincheck, edit['edit'])
      // 职位分类
      .get('/delivery/job', job['jobClass'])
      // 首页展示
      .get('/delivery/home', home['indexManage'])
      // 公司公告
      .get('/delivery/notice', exchange['companyTalk'])
      // 公司交流
      .get('/delivery/exchange', exchange['companyTalk'])
      // 产品中心
      .get('/delivery/products', product['productsCenter'])
      // 咨询中心
      .get('/delivery/consult', consult['infoCenter'])
      // 插入资讯
      .post('/api/insert_info', consult['insert_info'])
      .post('/api/get_info', consult['get_info'])
      .post('/api/del_info', consult['del_info'])
      .post('/api/hide_info', consult['hide_info'])
      .post('/api/edit_info', consult['edit_info'])
      // 轮播管理
      .get('/delivery/carousel', carousel['turnManage'])
      //职业分类
      .get('/delivery/postClassify', postApi['postClassify'])
      //产品中心[志强]
      .get('/delivery/helpContent', helpContent['helpContent'])
      .get('/api/get_products',product['get_products']) //获取产品信息
module.exports = router
