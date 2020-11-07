<template>
  <!--  -->
  <div class="m-">
    <!-- 新增客户 -->
    <div id="head">
      <el-button id="newCustomer" type="primary" @click="newCustomer"
        >新增客户</el-button
      >
    </div>
    <Table
      :tableData="tableData"
      @transdata="getRefresh(arguments)"
      @handleClick="handleClick(arguments)"
      @edit="getEdit(arguments)"
      @addRecord="addRecord(arguments)"
      @handRecord="handRecord(arguments)"
    ></Table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pageNum"
      :page-count="pageSize"
      @current-change="handleCurrentChange"
      class="paginationShow"
    ></el-pagination>
    <!-- 新增弹框 -->
    <el-dialog title="新洲" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="房屋地址:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.houseInfo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="人员信息:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.peopleInfo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="主营产品信息:" :label-width="formLabelWidth">
          <el-input
            :disabled="inputStatus"
            v-model="form.productInfo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否意向客户:" :label-width="formLabelWidth">
          <el-select
            v-model="form.cooperationStatus"
            placeholder="是否意向客户"
            :disabled="inputStatus"
          >
            <el-option label="未合作" value="0"></el-option>
            <el-option label="已合作" value="1"></el-option>
            <el-option label="意向客户" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="inputStatus == false">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增拜访弹框 -->
    <el-dialog title="拜访记录" :visible.sync="recordFlag">
      <el-form
        :model="record"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="record.date1"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="record.date2"
                style="width: 100%"
                value-format="hh:mm:ss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="record.desc" :rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看拜访记录 -->
    <el-dialog title="查看拜访记录弹框" :visible.sync="seeRecord">
      <el-table :data="recordList" border style="width: 100%; margin-top: 20px">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="visitTime" label="时间"></el-table-column>
        <el-table-column prop="visitInfo" label="活动形式"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="recordPageNum"
        :page-count="recordPageSize"
        @current-change="handRecordClick"
        class="paginationShow"
      ></el-pagination>
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
      recordFlag: false,
      seeRecord: false,
      inputStatus: false,
      flag: 0,
      clientId: "",
      recordList: [],
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
      recordPageNum: 1,
      recordPageSize: 10,
      tableData: [],
      record: {
        date1: "",
        date2: "",
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化表格数据
    init() {
      console.log(this.pageNum);
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
    newCustomer() {
      this.form = {};
      this.dialogFormVisible = true;
      this.flag = 0;
    },
    //新增客户||编辑
    primary() {
      let url = "";
      if (this.flag == 0) {
        url = "http://118.178.254.125:8081/mall/client/addClient";
      } else {
        url = "http://118.178.254.125:8081/mall/client/modifyClient";
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
    //点击查看拜访分页信息
    handRecordClick(val) {
      this.recordPageNum = val;
      this.getSeeRecordList()
    },
    //获取子传父的修改值
    getRefresh(val) {
      this.init();
    },
    //编辑传值
    getEdit(val) {
      this.dialogFormVisible = true;
      this.inputStatus = false;
      val[0].cooperationStatus = String(val[0].cooperationStatus);
      this.form = val[0];
      this.flag = 1;
      console.log(val);
    },
    //查看传值
    handleClick(val) {
      let ids = val[0].id;
      let params = {
        id: ids,
      };
      this.$http
        .get("http://118.178.254.125:8081/mall/client/getClient", {
          params: {
            id: ids,
          },
        })
        .then((params) => {
          this.dialogFormVisible = true;
          this.form = params.data.data;
          this.inputStatus = true;
        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
    //查看拜访
    handRecord(val) {
      this.seeRecord = true;
      this.clientId = val[0].id;
      this.getSeeRecordList()
    },
    //查看拜访记录
    getSeeRecordList() {
      this.$http
        .get("http://118.178.254.125:8081/mall/logInfo/getClientLogInfoList",{
          params: {
            id: this.clientId,
            page: this.recordPageNum,
          },
        })
        .then((params) => {
          console.log(params);
          this.recordList = params.data.data;
          this.recordPageSize = params.data.totalPages;
        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
    //增加拜访
    addRecord(val) {
      this.recordFlag = true;
      console.log(val[0].id);
      this.record.id = val[0].id;
    },
    //确认增加拜访
    submitForm(val) {
      let url = "http://118.178.254.125:8081/mall/logInfo/addRecord";
      let params = {
        clientId: this.record.id,
        visitTime: `${this.record.date1} ${this.record.date2}`,
        visitInfo: this.record.desc,
      };
      console.log(params);
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.$http.post(url, params).then((res) => {
            console.log(res);
            if (res.data.state == 1) {
              this.recordFlag = false;
              this.$refs[val].resetFields()
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消增加拜访
    resetForm(val) {
      this.recordFlag = false;
      this.$refs[val].resetFields()
    },
  },
};
</script>
<style lang="scss" scoped>
#head {
  width: 100%;
  height: 6%;
  text-align: right;
}
.el-form-item__label {
  text-align: center !important;
}
</style>
<style>
.el-col-2 {
  width: 10px;
}
.el-dialog {
  height: 75%;
}
</style>