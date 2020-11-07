<template>
  <!--  -->
  <div class="m-">
    <el-table :data="tableData" border style="width: 100%;margin-top: 20px;">
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column prop="address" label="地址" width="120"></el-table-column>
      <el-table-column prop="houseInfo" label="房屋地址" width="300"></el-table-column>
      <el-table-column prop="peopleInfo" label="人员信息" width="150"></el-table-column>
      <el-table-column prop="productInfo" label="主营产品信息" width="150"></el-table-column>
      <el-table-column prop="cooperation" label="是否意向客户" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="addRecord(scope.row)" type="text" size="small">增加拜访记录</el-button>
          <el-button @click="handRecord(scope.row)" type="text" size="small">查看拜访记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData"],
  data() {
    return {
      pageNum: 1, //当前页
    };
  },
  methods: {
    handleClick(row) {
      this.$emit('handleClick',row)
    },
    //删除
    delClick(row) {
      let id = row.id;
      console.log(id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delInterface(id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //编辑
    editClick(row){
      this.$emit('edit',row)
    },
    //删除接口
    delInterface(id) {
      this.$http
        .get("http://118.178.254.125:8081/mall/client/delClient", {
          params: {
            id,
          },
        })
        .then((params) => {
          // console.log(params);
      this.$emit("transdata",this.pageNum);

        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
    //增加拜访
    addRecord(row){
      this.$emit('addRecord',row)
    },
    //查看拜访
    handRecord(row){
      this.$emit('handRecord',row)
    }
  },
};
</script>
<style scoped>
.m- {
  display: block !important;
  flex: 1;
  overflow-y: scroll;
}
</style>