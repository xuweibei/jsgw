
// http常量
const base = "http://localhost:8000/"
const url = {
    delDep: base + "api/del_dep", // 删除部门分组
    addDep: base + 'api/add_dep', //添加部门分组
    editDep: base + 'api/edit_dep', // 编辑分组
    insertStf: base + 'api/insert_stf',
    getTable:base + 'api/get_tab', // 获取员工
    editEmp: base + 'api/edit_emp', //编辑员工
    delEmp: base + 'api/del_emp', //编辑员工
    changeStatus: base + 'api/change_status', //编辑员工
    getRecreuit: base + 'api/get_recruit', //获取招聘信息
    addMen: base + 'api/add_recruiter', //获取招聘信息
    getPcatBak: base + 'api/pcat_bak', //获取获取省市
    delEmp: base + 'api/del_emp', //删除员工
    changeStatus: base + 'api/change_status', //编辑员工状态
    addCententTitle: base + 'api/add_centent_title', //产品中心（存储[志强]）
    changeStatus: base + 'api/change_status', //编辑员工
    getClassify: base + 'api/get_classify', //获取职业分类
    addClassify: base + 'api/add_classify', //新增职业分类
    editClassify: base + 'api/edit_classify',//编辑职业分类
    delClassify:  base + 'api/del_classify',//删除职业分类
    changeClassifyStatus:  base + 'api/change_classify_status',//禁用职业分类
    getProducts: base + 'api/get_products', //获取产品信息
    delProduct: base + 'api/del_product', //删除产品
    showItem: base + 'api/show_item' //设置产品是否显示
}
