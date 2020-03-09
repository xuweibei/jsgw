// http常量
// const base = "http://localhost:8000/"
const base = 'http://101.132.180.228:8000/'
// console.log(process.env.NODE_ENV, 'jksahdjksahdjkashdas')
const url = {
  login: base + 'api/login',
  logout: base + 'api/logout',
  delDep: base + 'api/del_dep', // 删除部门分组
  addDep: base + 'api/add_dep', //添加部门分组
  editDep: base + 'api/edit_dep', // 编辑分组
  insertStf: base + 'api/insert_stf',
  getTable: base + 'api/get_tab', // 获取员工
  editEmp: base + 'api/edit_emp', //编辑员工
  delEmp: base + 'api/del_emp', //编辑员工
  changeStatus: base + 'api/change_status', //编辑员工
  getRecreuit: base + 'api/get_recruit', //获取招聘信息
  addMen: base + 'api/add_recruiter', //获取招聘信息
  editMen: base + 'api/edit_recruiter', //编辑招聘信息
  adressAdmin: base + 'api/adress_list', //获取地区管理列表
  deleteAdress: base + 'api/adress_delete', //地区管理列表 删除
  adressEnable: base + 'api/adress_enable', //地区管理列表 启用或停�?  adressAdd: base + 'api/adress_add', //地区管理列表 添加
  adressEdit: base + 'api/adress_edit', //地区管理列表 编辑
  getPcatBak: base + 'api/pcat_bak', //获取获取省市
  deleteRecreit: base + 'api/detelte_recreit', //删除某条招聘信息
  enable: base + 'api/enable_recreit', //启用或停�?  delEmp: base + 'api/del_emp', //删除员工
  changeStatus: base + 'api/change_status', //编辑员工状�?  addCententTitle: base + 'api/add_centent_title', //产品中心（存储[志强]�?  getCententTitle: base + 'api/get_centent_title', //产品中心（存储[志强]�?  changeStatus: base + 'api/change_status', //编辑员工
  getClassify: base + 'api/get_classify', //获取职业分类
  addClassify: base + 'api/add_classify', //新增职业分类
  editClassify: base + 'api/edit_classify', //编辑职业分类
  delClassify: base + 'api/del_classify', //删除职业分类
  changeClassifyStatus: base + 'api/change_classify_status', //禁用职业分类
  getProducts: base + 'api/get_products', //获取产品信息
  delProduct: base + 'api/del_product', //删除产品
  showItem: base + 'api/show_item', //设置产品是否显示
  submitIntro: base + 'api/get_rich', // 富文本上传图�?  insertIntro: base + 'api/insert_intro', // 插入富文�?  renderHtml: base + 'api/render_html', // 获取html
  newProduct: base + 'api/new_product', //新增产品
  insertInfo: base + 'api/insert_info', // 插入资讯
  getInfo: base + 'api/get_info', // 插入资讯
  delInfo: base + 'api/del_info', // 删除资讯
  hideInfo: base + 'api/hide_info', // 删除资讯
  editInfo: base + 'api/edit_info', // 删除资讯
  insertEvent: base + 'api/insert_event', // 插入事件
  delEvent: base + 'api/del_event', // 删除事件
  carouseManage: base + 'api/carousel_manage', //轮播管理
  getModule: base + 'api/get_module', //模块管理
  changeModuleNumber: base + 'api/change_module_number', //更改模块排序
  changeModuleStatus: base + 'api/change_module_status', //展示开�?  setCarouselLink: base + 'api/set_carousel_link', //设置轮播图跳转链�?  setCarouselTimer: base + 'api/set_carousel_timer', //设置轮播时间
  empInfo: base + 'api/emp_info', // 删除事件
  delCarousel: base + 'api/del_carousel', //删除轮播�?  newCarousel: base + 'api/new_carousel', //新增轮播�?  previewProduct: base + 'api/preview_product', //预览产品
  communicateList: base + 'api/communicate_list', //公司交流列表
  editCommunicateList: base + 'api/edit_communicate_list', //添加公司交流列表
  deleteCommunicate: base + 'api/del_communicate_list', //删除公司交流列表
  enableCommu: base + 'api/enable_commu', //隐藏或显示公司交流列�?  getChecked: base + 'api/get_checked', //获取选中状�?  modifyProduct: base + 'api/commit_modify' //修改产品
}
