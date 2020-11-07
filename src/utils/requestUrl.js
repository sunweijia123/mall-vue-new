//接口封装
const baseUrl= "http://www.whxzmall.com/";
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