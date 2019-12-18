const router = require('koa-router')()
const Logincheck = require('../middleware/checkLogin')
const login = require('./login')
const department = require('./department')
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
      .post('/api/get_classify', postApi["get_classify"])
      .post('/api/add_centent_title', department["add_centent_title"])
      .post('/api/add_classify',postApi['add_classify'])   //新增职业分类
      .post('/api/edit_classify',postApi['edit_classify'])   //新增职业分类
      .post('/api/del_classify',postApi['del_classify'])   //删除职·业分类
      .post('/api/change_classify_status',postApi['change_status'])   //禁用职业分类
      // 招聘
      .get('/delivery/invite', invite['invite'])
      // 公司简介
      .get('/delivery/intro', intro['intro'])
      // 富文本
      .get('/delivery/edit', Logincheck, edit['edit'])
      // 职位分类
      .get('/delivery/job', job['jobClass'])
      // 首页展示
      .get('/delivery/home', home['indexManage'])
      // 公司交流
      .get('/delivery/exchange', exchange['companyTalk'])
      // 产品中心
      .get('/delivery/products', product['productsCenter'])
      // 咨询中心
      .get('/delivery/consult', consult['infoCenter'])
      // 轮播管理
      .get('/delivery/carousel', carousel['turnManage'])
      //职业分类
      .get('/delivery/postClassify', postApi['postClassify'])
      //产品中心[志强]
      .get('/delivery/helpContent', helpContent['helpContent'])
module.exports = router
