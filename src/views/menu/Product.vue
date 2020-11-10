<template>
  <div>
    <div>
      <el-button class="addCustomer" type="primary" @click="addCustomer">新增产品</el-button>
      <el-table
          :data="tableData">
          <el-table-column
              type="index"
              label="序号">
          </el-table-column>
        <el-table-column
            label="产品图片">
          <template slot-scope="scope">
            <img :src="getProductImg(scope)" style="width: 60%;height: 60px;"/>
          </template>
        </el-table-column>
        <template v-for="(item,index) in titleList">
          <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
        </template>
        <el-table-column
            label="价格信息">
          <template slot-scope="scope">
            <el-button @click="getItmeSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button @click="updateItemSee(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deldateItemSee(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="10"
          @current-change="changePage"
          class="paginationShow">
      </el-pagination>
    </div>
      <el-dialog :title="moealTitle" :visible.sync="isShow"  @close="closeMoeal">
        <div v-if="moealType == 'add' || moealType == 'update'">
          <div class="itemCell">
            <span>产品名称:</span>
            <el-input v-model="productInfo.productName" placeholder="请输入产品名称"></el-input>
          </div>
          <div class="itemCell">
            <span>产品图片:</span>
            <el-upload
                class="upload-demo"
                style="display: inline-block"
                :file-list="filelist"
                accept="image/png,image/jpg,image/jpeg,image/gif,image/PNG,image/JPG,image/JPEG,image/GIF"
                action="http://118.178.254.125:8081/images/upload"
                :on-success = 'uploadSuccess'
                :limit="1"
                :disabled="filelist.length >= 1"
                :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" :disabled="filelist.length >= 1" type="primary">点击上传</el-button>
              <span>只能上传一张</span>
            </el-upload>
          </div>
          <div class="itemCell">
            <span>粘度规格:</span>
            <el-input v-model="productInfo.productViscosity" placeholder="请输入粘度规格"></el-input>
          </div>
          <div class="itemCell">
            <span>质量级别:</span>
            <el-input v-model="productInfo.productLevel" placeholder="请输入质量级别"></el-input>
          </div>
          <div class="itemCell">
            <span>产品类型:</span>
            <el-input v-model="productInfo.productType" placeholder="请输入产品类型"></el-input>
          </div>

          <div v-if="moealType  == 'add'">
            <el-divider></el-divider>
            <div class="packingList" v-for="(item,index) in productInfo.productPackingList">
              <div class="itemCell itemList" >
                <span>包装规格:</span>
                <el-input v-model="item.pack" placeholder="请输入包装规格"></el-input>
                <i  v-if="index >= 1" class="el-icon-error"  @click="deletePacking(index)"></i>
                <i  class="el-icon-circle-plus" @click="addPacking"></i>
              </div>
              <div class="itemCell">
                <span>出厂价格:</span>
                <el-input v-model="item.price" placeholder="请输入出厂价格"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div v-if="moealType == 'getBy'">
          <el-button  @click="addPrice(priceActiveId)">新增价格</el-button>
          <el-table
              :data="priceData">
            <el-table-column
                type="index"
                label="序号">
            </el-table-column>
            <template v-for="(item,index) in priceList">
              <el-table-column
                  :key="index"
                  :prop="item.prop"
                  :label="item.label">
              </el-table-column>
            </template>
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-button @click="updateItemPrice(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deldateItemPrice(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeMoeal()">取消</el-button>
          <el-button type="primary" @click="determine()">确定</el-button>
        </div>
      </el-dialog>
    <!--二层弹框-->
    <el-dialog :title="moealPiceTitle" :visible.sync="priceIsShow"   @close="closePriceMoeal">
      <div>
        <div class="packingList">
          <div class="itemCell" >
            <span>包装规格:</span>
            <el-input  v-model="priceInfo.pricePacking" placeholder="请输入包装规格"></el-input>
          </div>
          <div class="itemCell">
            <span>出厂价格:</span>
            <el-input v-model="priceInfo.priceEx" placeholder="请输入出厂价格"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePriceMoeal()">取消</el-button>
        <el-button type="primary" @click="determinePirce()">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {getProductAttrList,getProductList,addProduct,modifyProduct,delProduct,addProductAttr,delProductAttr,modifyProductAttr} from '../../utils/requestUrl'

export default {
  name: 'Product',
  data() {
    return {
      titleList: [
        {label: "产品名称", prop: 'productName'},
        {label: "粘度规格", prop: 'productViscosity'},
        {label: "质量级别", prop: 'productLevel'},
        {label: "产品类别", prop: 'productType'},
      ],
      tableData: [{

      }],
      productInfo:{
        productId:"",
        productName: "",
        productImg: "",
        productLevel: "",
        productType: '',
        productViscosity: "",
        productPackingList:[
          {pack:"",price:""}
        ]
      },
      priceData:[],
      priceList:[
        // {label: "序号", prop: 'priceId'},
        {label: "包装规格", prop: 'pricePacking'},
        {label: "出厂价格", prop: 'priceEx'},
      ],
      priceInfo:{
        id:"",
        priceId :"",
        pricePacking:"",
        priceEx:"",
      },
      priceActiveId:0,
      pageIndex: 1,
      totalCount: 0,
      isShow: false,
      moealTitle:"",
      moealType:"add", //模态框类型
      moealPiceTitle:"",
      moealPiceType:"add",
      priceIsShow:false,
      filelist:[],//文件参数
    }
  },
  methods: {
    /***
     *  所有网络请求***/
    getList() {
      this.tableData = [];
      this.$http.get(getProductList, {
        params: {
          page: this.pageIndex,
        },
      }).then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              let datalist= res.data.data;
              this.totalCount =res.data.total;
              this.pageIndex = res.data.page;
              this.tableData = datalist.map(item => {
                return {
                  productId: item.id ? item.id : "",
                  productName: item.name ? item.name : " ",
                  productImg: item.avatar ? item.avatar : "",
                  productViscosity:item.viscosity ? item.viscosity : "",
                  productLevel:item.qualityLevel ? item.qualityLevel : "",
                  productType: item.type ? item.type : "",
                }
              })
            }
            this.$forceUpdate();
            console.log(res);
          }).catch(err => {
        console.log(err);
      })
    },
    addProduct(){
      if(this.checkInfo()){
        this.$http.post(addProduct, {
          name:this.productInfo.productName,
          avatar:this.productInfo.productImg,
          viscosity:this.productInfo.productViscosity,
          type:this.productInfo.productType,
          qualityLevel:this.productInfo.productLevel,
          productAttributes:this.productInfo.productPackingList,
        }).then((res) => {
          if(res.data.message == "ok"){
              this.isShow=false;
              this.getList();
            this.$message.success('添加成功!');
          }
        });
      }
    },
    /**
     * 修改方法
     */
    modifyProduct(){
      if(this.checkInfo()){
        this.$http.post(modifyProduct, {
          id:this.productInfo.productId,
          name:this.productInfo.productName,
          avatar:this.productInfo.productImg,
          viscosity:this.productInfo.productViscosity,
          type:this.productInfo.productType,
          qualityLevel:this.productInfo.productLevel,
          productAttributes:this.productInfo.productPackingList,
        }).then((res) => {
          if(res.data.message == "ok"){
            this.isShow=false;
            this.getList();
            this.$message.success('修改成功!');
          }
        });
      }
    },
    /**
     *  删除方法
     */
    delProduct(id){
      this.$http.get(delProduct, {
        params: {
          id: id,
        },
      }).then((res) => {
        if(res.data.message == "ok"){
          this.getList();
          this.$message.success('删除成功!');
        }
      })
    },
    /**
     *  删除包装信息方法
     */
    delPrice(id){
      this.$http.get(delProductAttr, {
        params: {
          id: id,
        },
      }).then((res) => {
        if(res.data.message == "ok"){
          this.getProductAttrList(this.priceActiveId);
          this.$message.success('删除成功!');
        }
      })
    },
    /**
     * 获取价格
     */
    getProductAttrList(id){
      this.priceData=[];
      this.$http.get(getProductAttrList, {
        params: {
          proId: id,
        },
      }).then((res) => {
            if (res.status == 200) {
              let datalist=res.data.data;
              this.priceData = datalist.map(item => {
                return {
                  priceId: item.id ? item.id : "",
                  pricePacking: item.pack ? item.pack : " ",
                  priceEx: item.price ? item.price : "",
                }
              })
            }
      })
    },
    /**
     * 添加包装规则和工厂价格
     */
    addProductAttr(){
      if(this.checkInfoPirce()){
        this.$http.post(addProductAttr, {
          productId:this.priceInfo.priceId,
          pack:this.priceInfo.pricePacking,
          price:parseInt(this.priceInfo.priceEx),
        }).then((res) => {
          if(res.data.message == "ok"){
            this.priceIsShow=false;
            this.closePriceMoeal();
            this.getProductAttrList(this.priceActiveId);
            this.$message.success('添加成功!');
          }
        });
      }
    },
    /***
     * 修改包装规则
     */
    modifyProductAttr(){
      if(this.checkInfoPirce()){
        let this_=this;
        this.$http.post(modifyProductAttr, {
          id:this_.priceInfo.id,
          productId:this_.priceInfo.priceId,
          pack:this_.priceInfo.pricePacking,
          price:parseInt(this_.priceInfo.priceEx),
        }).then((res) => {
          if(res.data.message == "ok"){
            this.priceIsShow=false;
            this.closePriceMoeal();
            this.getProductAttrList(this.priceActiveId);
            this.$message.success('修改成功!');
          }
        });
      }
    },


    /**
     * 添加产品检验方法
     */
    checkInfo(){
      if(this.productInfo.productName == ""){
        this.$message.error("请输入产品名称");
        return false;
      }else if(this.productInfo.productImg == "" ){
        this.$message.error("请输入产品图片");
        return false;
      }else if(this.productInfo.productViscosity == "" ){
        this.$message.error("请输入粘度规格");
        return false;
      }else if(this.productInfo.productLevel == "" ){
        this.$message.error("请输入质量级别");
        return false;
      }else if(this.productInfo.productType == "" ){
        this.$message.error("请输入产品类别");
        return false;
      }
      // let keys = Object.keys(this.productInfo);
      // for(let i in keys){
      //   console.log(this.productInfo[keys[i]]);
      //   this.productInfo[keys[i]] = this.productInfo[keys[i]].replace(/\s+/g,"");
      // }
      // this.productInfo.productPackingList= this.productInfo.productPackingList.map((item,index)=>{
      //   let keys = Object.keys(item);
      //   for(let i in keys){
      //     item[keys[i]] =item[keys[i]].replace(/\s+/g,"");
      //   }
      //   return item;
      // })
      return true;
    },
    /**
     * 添加包装规则检验方法
     */
    checkInfoPirce(){
      if(this.priceInfo.pricePacking == ""){
        this.$message.error("请输入包装规格");
        return false;
      }else if(this.priceInfo.priceEx == ""){
        this.$message.error("请输入出厂价格");
        return false;
      }
      return true;
    },
    //查看方法
    getItmeSee(item) {
      this.moealType='getBy'
      this.moealTitle="查看价格信息"
      this.isShow=true;
      this.priceActiveId=item.productId
      this.getProductAttrList(item.productId);
    },
    getProductImg(item){
      return item.row.productImg;
    },
    /**
     * 添加用户
     */
    addCustomer() {
      this.moealType='add'
      this.moealTitle="新增产品信息"
      this.isShow=true;
    },
    /**
     * 修改
     */
    updateItemSee(info) {
      this.moealType='update'
      this.moealTitle="修改产品信息"
      this.isShow=true;
      this.productInfo={
        productId:info.productId,
        productName: info.productName,
        productImg: info.productImg,
        productLevel: info.productLevel,
        productType: info.productType,
        productViscosity: info.productViscosity,
        productPackingList:[
          {pack:"",price:""}
        ]
      }
    },
    /**
     * 删除产品信息
     */
    deldateItemSee(info){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delProduct(info.productId);

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /**
     *  close 关闭
     */
    closeMoeal(){
      this.isShow=false;
      this.productInfo={
        productId:"",
        productName: "",
        productImg: "",
        productLevel: "",
        productType: '',
        productViscosity: "",
        productPackingList:[
          {pack:"",price:""}
        ]
      }
      this.filelist=[];
    },
    /**
     * 模态框添加
     */
    determine(){
      if(this.moealType == 'add'){
        this.addProduct();
      }else if(this.moealType == 'update'){
        this.modifyProduct();
      }else {
        this.isShow=false;
      }
    },
    //添加input 框
    addPacking(){
        this.productInfo.productPackingList.push( {pack:"",price:""});
    },
    deletePacking(index){
      this.productInfo.productPackingList.splice(index,1);
    },
    changePage(pageindex){
      this.pageIndex=pageindex;
      this.getList();
    },
    /**
     * 修改价格规格
     */
    updateItemPrice(info){
      this.priceInfo={
        id:info.priceId,
        priceId :this.priceActiveId,
        pricePacking:info.pricePacking,
        priceEx:info.priceEx,
      }
      this.moealPiceType='update'
      this.moealPiceTitle="修改包装规格和出厂价格"
      this.priceIsShow=true;
    },
    /**
     * 删除价格规格
     */
    deldateItemPrice(info){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delPrice(info.priceId);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    closePriceMoeal(){
      this.priceInfo={
        id:"",
        priceId :"",
        pricePacking:"",
        priceEx:"",
      }
      this.priceIsShow = false;
    },
    determinePirce(){
        if(this.moealPiceType == 'add'){
          this.addProductAttr();
        }else if(this.moealPiceType == 'update'){
          this.modifyProductAttr();
        }else {
          this.priceIsShow=false;
        }
    },
    /**
     * 添加方法
     */
    addPrice(){
      this.priceInfo.priceId = this.priceActiveId;
      this.priceIsShow=true;
      this.moealPiceTitle="添加包装规格和出厂价格"
      this.moealPiceType='add';
    },
    /**
     * 上传图片成功
     */
    uploadSuccess(response, file){
      this.filelist.push({name:file.name, url: response})
      this.productInfo.productImg = response;
    },
    /**
     *  上传验证
     * @param file
     * @returns {boolean}
     */
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
  },
  created() {
    this.getList();
  },
}
</script>
<style>
.addCustomer {
  float: right;
  margin-bottom: 20px;
}
.itemCell{
  margin: 10px 0px;
}
.itemCell >span{
  display: inline-block;
  width: 20%;
}
.itemCell > .el-input {
  width: 80%;
}
.itemList >  .el-input{
  width: 70%;
}
.itemList > i{
  font-size: 20px;
}
</style>
