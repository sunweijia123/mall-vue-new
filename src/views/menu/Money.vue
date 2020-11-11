<template>
  <div class="Money">
    <div>
      <el-select v-model="customerSelect" clearable placeholder="请选择客户列表">
        <el-option
            v-for="item in customerList"
             :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select class="clearanceCell" clearable v-model="productSelect" placeholder="请选择产品列表">
        <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="selectTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-button  class="clearanceCell" type="primary" @click="selectFlowing">查询</el-button>
      <el-button class="clearanceCell" type="primary" @click="addFlowing">新增</el-button>
    </div>
      <el-table
          :data="tableData">
        <el-table-column
            type="index"
            label="序号">
        </el-table-column>
        <template v-for="(item,index) in titleList">
          <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
        </template>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button @click="updateItemSee(scope.row)" type="text" size="small">修改</el-button>
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
    <el-dialog :title="moealTitle" :visible.sync="isShow"  @close="closeMoeal">
      <div>
        <div class="itemCell" v-show="moealType == 'add'">
          <span>客户名称:</span>
          <el-select v-model="moneyInfo.customerName" placeholder="请选择客户列表">
            <el-option
                v-for="item in customerList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="itemCell" v-show="moealType == 'add'">
          <span>产品名称:</span>
          <el-select  v-model="moneyInfo.productName" @change="productChange" placeholder="请选择产品列表">
            <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="itemCell" v-show="moneyInfo.productPackage && moealType == 'add'">
          <span>包装规格:</span>
          <el-input v-model="moneyInfo.productPackage" :disabled="moneyInfo.productPackage != ''"  placeholder="请输入包装规格"></el-input>
        </div>
        <div class="itemCell" v-show="moneyInfo.price && moealType == 'add'">
          <span>单价(桶):</span>
          <el-input v-model="moneyInfo.price" :disabled="moneyInfo.price != ''"  placeholder="请输入单价(桶)"></el-input>
        </div>
        <div class="itemCell" v-show="moealType == 'add'">
          <span>售价:</span>
          <el-input v-model="moneyInfo.priceBox"  placeholder="请输入售价"></el-input>
        </div>
        <div class="itemCell">
          <span>数量:</span>
          <el-input v-model="moneyInfo.num"  placeholder="请输入数量"></el-input>
        </div>
        <div class="itemCell">
          <span>实际收款:</span>
          <el-input v-model="moneyInfo.actualCollection" placeholder="请输入实际收款"></el-input>
        </div>
        <div class="itemCell">
          <span>促销备注:</span>
          <el-input v-model="moneyInfo.promotionText" placeholder="请输入促销备注"></el-input>
        </div>
        <div class="itemCell">
          <span>欠款备注:</span>
          <el-input v-model="moneyInfo.arrearsText" placeholder="请输入欠款备注"></el-input>
        </div>
        <div class="itemCell">
          <span>其他备注:</span>
          <el-input v-model="moneyInfo.otherText" placeholder="请输入其他备注"></el-input>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeMoeal()">取消</el-button>
        <el-button type="primary" @click="determine()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDealInfoList,
  getCustomerList,
  getProductDataList,
  getProductAttrById,
  addDealInfo,
  updateDealInfo
} from '../../utils/requestUrl'
export default {
  name:"Money",
  data() {
    return {
      customerList:[],
      customerSelect:"", //客户select
      productList:[],
      productSelect:"",//产品select
      selectTime:"",//选择时间
      titleList: [
        {label: "客户名称", prop: 'customerName'},
        {label: "产品名称", prop: 'productName'},
        {label: "包装规格", prop: 'productPackage'},
        {label: "单价", prop: 'price'},
        {label: "售价（箱）", prop: 'priceBox'},
        {label: "数量", prop: 'num'},
        {label: "总价", prop: 'totalPrice'},
        {label: "实际收款", prop: 'actualCollection'},
        {label: "欠款", prop: 'arrears'},
        {label: "折扣", prop: 'discount'},
        {label: "促销备注", prop: 'promotionText'},
        {label: "欠款备注", prop: 'arrearsText'},
        {label: "其他备注", prop: 'otherText'},
      ],
      tableData: [{

      }],
      moneyInfo:{
        customerName:"",
        productName: "",
        productPackage: "",
        price: "",
        priceBox:"",
        num: '',
        actualCollection:'',
        promotionText:"",
        arrearsText:"",
        otherText:"",
      },
      pageIndex: 1,
      totalCount: 0,
      isShow: false,
      moealTitle:"",
      moealType:"add", //模态框类型\
      activeId:0,//点击修改的id
    }
  },
  methods:{
    //网络请求
    /***
     * 获取list数据
     */
    getDealInfoList(startDate=null,endDate=null,clientId=null,productId=null){
      this.tableData = [];
      this.$http.get(getDealInfoList, {
        params: {
          page: this.pageIndex,
          startDate,
          endDate,
          clientId,
          productId
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          let datalist= res.data.data;
          this.totalCount =res.data.total;
          this.pageIndex = res.data.page;
          this.tableData = datalist.map(item => {
            return {
              id:item.id,
              clientId:item.clientId,
              customerName:item.clientName,
              productId:item.productId,
              productName:item.productName,
              productPackage:item.pack,
              price:item.price,
              priceBox:item.sellPrice,
              num:item.amount,
              totalPrice:item.totalPrice,
              actualCollection:item.proceeds,
              arrears:item.debt,
              discount:item.discount,
              promotionText:item.saleRemark,
              arrearsText:item.debtRemark,
              otherText:item.remark
            }
          })
        }
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 获取客户list
     */
    getCustomerList(){
      this.customerList = [];
      this.$http.get(getCustomerList, {
        params: {},
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.customerList = res.data.data;
        }
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 获取产品list
     */
    getProductDataList(){
      this.customerList = [];
      this.$http.get(getProductDataList, {
        params: {},
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.productList = res.data.data;
        }
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      })
    },
    /***
     * 获取包装和单价
     */
    getProductAttrById(id){
      this.$http.get(getProductAttrById, {
        params: {
          id
        },
      }).then((res) => {
        if (res.status == 200) {
          if(res.data.data == null){
            this.moneyInfo.productPackage ="";
            this.moneyInfo.price="";
            return;
          }
          this.moneyInfo.productPackage = res.data.data.pack;
          this.moneyInfo.price = res.data.data.price;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 添加方法
     */
    addDealInfo(){
      this.$http.post(addDealInfo, {
        clientId:this.moneyInfo.customerName,
        productId:this.moneyInfo.productName,
        pack:this.moneyInfo.productPackage,
        price:parseInt(this.moneyInfo.price),
        sellPrice:parseInt(this.moneyInfo.priceBox),
        amount:parseInt(this.moneyInfo.num),
        proceeds:parseInt(this.moneyInfo.actualCollection),
        saleRemark:this.moneyInfo.promotionText,
        debtRemark:this.moneyInfo.arrearsText,
        remark:this.moneyInfo.otherText,
      }).then((res) => {
        if(res.data.message == "ok"){
          this.isShow=false;
          this.closeMoeal();
          this.getDealInfoList();
          this.$message.success('添加成功!');
        }
      });
    },
    /**
     * 修改方法
     * updateDealInfo
     */
    updateDealInfo(){
      this.$http.post(updateDealInfo,{
        id:this.activeId,
        clientId:this.moneyInfo.customerName,
        productId:this.moneyInfo.productName,
        pack:this.moneyInfo.productPackage,
        price:parseInt(this.moneyInfo.price),
        sellPrice:parseInt(this.moneyInfo.priceBox),
        amount:parseInt(this.moneyInfo.num),
        proceeds:parseInt(this.moneyInfo.actualCollection),
        saleRemark:this.moneyInfo.promotionText,
        debtRemark:this.moneyInfo.arrearsText,
        remark:this.moneyInfo.otherText,
      }).then((res) => {
        if(res.data.message == "ok"){
          this.isShow=false;
          this.closeMoeal();
          this.getDealInfoList();
          this.$message.success('修改成功!');
        }
      });
    },



    /**
     * 获取回显信息
     */
    productChange(){
      if(this.moneyInfo.productName != null && this.moneyInfo.productName != "" && this.moneyInfo.productName != undefined){
        this.getProductAttrById(this.moneyInfo.productName);
      }
    },
    /**
     *  关闭moeal
     */
    closeMoeal(){
      this.moneyInfo={
        customerName:"",
            productName: "",
            productPackage: "",
            price: "",
            priceBox:"",
            num: '',
            actualCollection:'',
            promotionText:"",
            arrearsText:"",
            otherText:"",
      }
      this.isShow=false;
    },
    /**
     * 整数验证
     */
    numberIsCheck(value){
        if(/^\+?[1-9][0-9]*$/.test(value)){
          return false;
        }else{
          return true;
        }
    },
    /**
     * 检查对象方法
     */
    checkInfo(){
      if(this.moneyInfo.customerName== ""){
        this.$message.error("请输入客户名称");
        return false;
      }else if(this.moneyInfo.productName == ''){
        this.$message.error("请输入产品名称");
        return false;
      }else if(this.moneyInfo.priceBox == ''){
        this.$message.error("请输入售价");
        return false;
      }else if(this.numberIsCheck(this.moneyInfo.priceBox)){
        this.$message.error("请输入整数售价");
        return false;
      } else if(this.moneyInfo.num == ''){
        this.$message.error("请输入数量");
        return false;
      }else if(this.numberIsCheck(this.moneyInfo.num)){
        this.$message.error("请输入整数数量");
        return false;
      } else if(this.moneyInfo.actualCollection == ''){
        this.$message.error("请输入实际收款");
        return false;
      }else if(this.numberIsCheck(this.moneyInfo.actualCollection)){
        this.$message.error("请输入整数实际收款");
        return false;
      } else if(this.moneyInfo.promotionText == ''){
        this.$message.error("请输入促销备注");
        return false;
      }else if(this.moneyInfo.arrearsText == ''){
        this.$message.error("请输入欠款备注");
        return false;
      }else if(this.moneyInfo.otherText == ''){
        this.$message.error("请输入其他备注");
        return false;
      }
      return true
    },
    determine(){
      if(this.moealType == 'add'){
        if(this.checkInfo()){
          this.addDealInfo();
        }
      }else {
        if(this.checkInfo()){
          this.updateDealInfo();
        }
      }
    },
    /**
     * 切换分页
     */
    changePage(pageindex){
      this.pageIndex=pageindex;
      if(this.selectTime != null && this.selectTime.length >= 1 ){
        this.getDealInfoList(this.selectTime[0],this.selectTime[1],this.customerSelect,this.productSelect);
        return;
      }
      this.getDealInfoList(null,null,this.customerSelect,this.productSelect);
    },
    /**
     * 新增流水
     */
    addFlowing(){
      this.isShow=true;
      this.moealType= 'add';
      this.moealTitle= '新增记录'
    },
    /**
     * 查询流水
     */
    selectFlowing(){
      if(this.selectTime != null && this.selectTime.length >= 1 ){
        this.getDealInfoList(this.selectTime[0],this.selectTime[1],this.customerSelect,this.productSelect);
        return;
      }
      this.getDealInfoList(null,null,this.customerSelect,this.productSelect);
    },
    /***
     * 修改流水
     */
    updateItemSee(info){
      this.isShow=true;
      this.moealType= 'update';
      this.moealTitle= '修改记录';
      this.activeId=info.id;
      this.moneyInfo={
        customerName:info.clientId,
        productName: info.productId,
        productPackage: info.productPackage,
        price: info.price,
        priceBox:info.priceBox,
        num: info.num,
        actualCollection:info.actualCollection,
        promotionText:info.promotionText,
        arrearsText:info.arrearsText,
        otherText:info.otherText,
      }
    }
  },
  created() {
    this.getDealInfoList();
    this.getCustomerList();
    this.getProductDataList();
  }
}
</script>
<style>
.clearanceCell{
  margin: 0px 20px;
}
.itemCell{
  margin: 10px 0px;
}
.itemCell >span{
  display: inline-block;
  width: 20%;
}
.itemCell > .el-input ,.itemCell > .el-select{
  width: 80%;
}
.itemList >  .el-input{
  width: 70%;
}
.itemList > i{
  font-size: 20px;
}
.el-date-editor .el-range-separator{
  width: 10%;
}
</style>
