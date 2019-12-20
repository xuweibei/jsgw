const {sequelize} = require('../db/db');

//获取产品信息
const getProducts = async () => {
  const sql = 'select id,serial_number,pro_name,status from gw_product'
  const res = await sequelize.query(sql)
  return res[0]
}
//删除产品
const delProduct = async (id) => {
  const sql = `delete from gw_product where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}
//设置产品是否展示
const showItem = async (id, status) => {
  const sql = `update gw_product set status=${status} where id=${id}`
  const res = await sequelize.query(sql)
  console.log('dsfdsfdsfds', res)
  return res[0]
}
//新增商品
const newProduct = async (data) => {
  const sql = `insert into gw_product (serial_number,pro_name,status,product_desc,logo,link,link_code) values (${data.serial_number},${data.pro_name},${data.status},${data.product_desc},${data.logo},${data.link},${data.link_code})`
  const res = await sequelize.query(sql)
  return res[0]
}
module.exports = {
  getProducts,
  delProduct,
  showItem,
  newProduct
}