const router = require('koa-router')()
const Logincheck = require('../middleware/checkLogin')
const pageApi = require('./pageApi')
const depApi = require('./depApi')
const postApi =require('./postApi')
router.get('/', pageApi.home)
      .get('/delivery/store-delivery', pageApi.storeDelivery)
      .get('/delivery/department-structur',Logincheck, pageApi.departmentStructur)
      .get('/delivery/intro', pageApi.intro)
      .get('/delivery/edit', Logincheck, pageApi.edit)
      .post('/api/login', depApi.login)
      .get('/job-class', pageApi.jobClass)
      .get('/index-manage', pageApi.indexManage)
      .get('/company-talk', pageApi.companyTalk)
      .get('/products-center', pageApi.productsCenter)
      .get('/info-center', pageApi.infoCenter)
      .get('/turn-manage', pageApi.turnManage)
      .post('/api/add_dep', depApi["add-dep"])
      .post('/api/del_dep', depApi["del_dep"])
      .post('/api/edit_dep', depApi["edit_dep"])
      .post('/api/insert_stf', depApi["insert_stf"])
      .post('/api/get_tab', depApi["get_tab"])
      .get('/api/post-sort', postApi.postSort)
const login = require('./login')
const department = require('./department')
const intro = require('./intro')
const invite = require('./invite')
const edit = require('./edit')
const job = require('./job')
const home = require('./home')
<<<<<<< HEAD
router.get('/', home.home)
      .get('/delivery/store-delivery', home.storeDelivery)
      .get('/delivery/department-structur', home.departmentStructur)
      .get('/help-content', home.helpContent)  //帮助中心
      .get('/job-class', home.jobClass)
      .get('/index-manage', home.indexManage)
      .get('/companyTalk', home.companyTalk)
      .get('/productsCenter', home.productsCenter)
=======
const exchange = require('./exchange')
const consult = require('./consult')
const product = require('./product')
const carousel = require('./carousel')
router.get('/', login.home)
      .post('/api/login', login.login)
      // 员工部门
      .get('/delivery/department-structur', Logincheck, department['departmentStructur'])
      .post('/api/add_dep', department["add-dep"])
      .post('/api/del_dep', department["del_dep"])
      .post('/api/edit_dep', department["edit_dep"])
      .post('/api/insert_stf', department["insert_stf"])
      .post('/api/get_tab', department["get_tab"])
      .post('/api/edit_emp', department["edit_emp"])
      .post('/api/del_emp', department["del_emp"])
      .post('/api/change_status', department["change_status"])
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
>>>>>>> 7f81036a4f218d572ca2c305cea6ffc9d5204c59
module.exports = router
