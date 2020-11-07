<template>
  <!--  -->
  <div class="m-">
    <!-- 新增客户 -->
    <div id="head">
      <el-button id="newCustomer" type="primary" @click="newCustomer">新增客户</el-button>
    </div>
    <Table :tableData="tableData" @transdata="getRefresh(arguments)" @edit="getEdit(arguments)"></Table>
    <div id="foot">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageNum"
        :page-count="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog title="新增客户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址:" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房屋地址:" :label-width="formLabelWidth">
          <el-input v-model="form.houseInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员信息:" :label-width="formLabelWidth">
          <el-input v-model="form.peopleInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主营产品信息:" :label-width="formLabelWidth">
          <el-input v-model="form.productInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否意向客户:" :label-width="formLabelWidth">
          <el-select v-model="form.cooperationStatus" placeholder="是否意向客户">
            <el-option label="未合作" value="0"></el-option>
            <el-option label="已合作" value="1"></el-option>
            <el-option label="意向客户" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Table from "../../components/table";
export default {
  components: {
    Table,
  },
  data() {
    return {
      dialogFormVisible: false,
      flag:0,
      form: {
        name: "",
        phone: "",
        address: "",
        houseInfo: "",
        peopleInfo: "",
        productInfo: "",
        cooperationStatus: "",
      },
      forms: {
        name: "",
        phone: "",
        address: "",
        houseInfo: "",
        peopleInfo: "",
        productInfo: "",
        cooperation: "",
      },
      formLabelWidth: "120px",
      pageNum: 1, //当前页
      pageSize: 2, //总页数
      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化表格数据
    init() {
      console.log(this.pageNum)
      this.$http
        .get("http://118.178.254.125:8081/mall/client/getClientList", {
          params: {
            page: this.pageNum,
          },
        })
        .then((params) => {
          console.log(params);
          this.tableData = params.data.data;
          this.pageSize = params.data.totalPages;
          // console.log(this.tableData, this.pageSize);
        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
    newCustomer(){
      this.form = {};
    this.dialogFormVisible = true;
    this.flag = 0;
    },
    //新增客户||编辑
    primary() {
      let url = ''
      if(this.flag == 0){
       url = "http://118.178.254.125:8081/mall/client/addClient";
      }else{
       url = "http://118.178.254.125:8081/mall/client/modifyClient"
      }
      let params = this.form;
      this.$http.post(url, params).then((res) => {
        console.log(res);
        if (res.data.state == 1) {
          this.dialogFormVisible = false;
          this.init();
          setTimeout(() => {
            this.$message({
              message: "成功",
              type: "success",
            });
          }, 1);
        } else {
          setTimeout(() => {
            this.$message.error(res.data.message);
          }, 1);
        }
      });
    },
    //点击当前页信息
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
    },
    //获取子传父的修改值
    getRefresh(val) {
      this.init();
    },
    //编辑传值
    getEdit(val){
      this.dialogFormVisible = true;
      val[0].cooperationStatus = String(val[0].cooperationStatus)
      this.form = val[0];
      this.flag = 1;
      console.log(val);
    }
  },
};
</script>
<style lang="scss" scoped>
.m- {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#head {
  width: 100%;
  height: 6%;
  text-align: right;
}
// #main {
//   flex: 1;
//   overflow-y: scroll;
//   background: #858585;
// }
#foot {
  width: 100%;
  height: 6%;
  background: #808080;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.el-form-item__label {
  text-align: center !important;
}
#newCustomer {
}
</style>