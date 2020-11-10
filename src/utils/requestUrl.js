//接口封装
const baseUrl= "http://www.whxzmall.com/";
//产品
export  const  getProductAttrList= baseUrl+'product/getProductAttrList' //根据产品id获取包装规格和出厂价格列表
export  const  getProductList= baseUrl+'product/getProductList' //分页获取产品列表页
export  const  addProduct= baseUrl+'product/addProduct' //新增产品
export  const  modifyProduct= baseUrl+'product/modifyProduct' //修改产品
export  const  delProduct= baseUrl+'product/delProduct' //删除产品
export  const  addProductAttr= baseUrl+'product/addProductAttr' //新增包装规格和出厂价格
export  const  modifyProductAttr= baseUrl+'product/modifyProductAttr' //修改包装规格和出厂价格
export  const  delProductAttr= baseUrl+'product/delProductAttr' //删除包装规格和出厂价格
// export  const  getProductById= baseUrl+'product/getProductById' //产品回显（编辑使用）
// export  const  getProductAttrById= baseUrl+'product/getProductAttrById' //产品包装规格和出厂价格回显（编辑使用）


//账户流水接口
export const  getDealInfoList= baseUrl+'mall/dealInfo/getDealInfoList' //列表接口
export const  getCustomerList= baseUrl+'mall/client/getList' //客户名称下拉框
export const  getProductDataList= baseUrl+'product/getList' //产品名称下拉框
export const  addDealInfo= baseUrl+'mall/dealInfo/addDealInfo' //新增流水
export const  updateDealInfo= baseUrl+'mall/dealInfo/updateDealInfo' //修改流水
export const  getProductAttrById= baseUrl+'product/getProductAttrById' //回显2个字段的api
// export const  getDealInfoById= baseUrl+'mall/dealInfo/getDealInfoById' //回显编辑的接口


