<template>
  <div id="register" class="all_wrap">
    <div id="register_child" class="wrap_child">
    <label for="name" class="el-form-item__label" style="width: 100px; margin-top:14%">上传头像</label>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-upload
        class="avatar-uploader"
        accept="image/png,image/jpg,image/jpeg,image/gif,image/PNG,image/JPG,image/JPEG,image/GIF"
        action="http://118.178.254.125:8081/images/upload"
        :on-success = 'handleAvatarSuccess'
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="账户"
        prop="account"
        :rules="[
               { required: true, message: '账户不能为空'},
               { validator: checkData, trigger: 'blur'},
               {min: 3,max: 20,message: '长度在 3 到 20 个字符',trigger: 'blur',}
             ]"
      >
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    //密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    //确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      imageUrl: "",
      avatar:'',
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        account: "",
        email: "",
      },
      //校验
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //注册请求  注册没校验
    submitForm() {
      var that = this;
      let url = "http://118.178.254.125:8081/mall/register";
      let params = {
        name: this.ruleForm.name,
        password: this.ruleForm.pass,
        loginAccont: this.ruleForm.account,
        email: this.ruleForm.email,
        avatar: this.avatar
      };
      console.log(params);
      this.$http.post(url, params).then((res) => {
        if (res.data.state == 1) {
          setTimeout(() => {
            that.$message({
              message: "注册成功",
              type: "success",
            });
          }, 1);
        } else {
          setTimeout(() => {
            that.$message.error(res.data.message);
          }, 1);
        }
      });
      this.$router.replace("/");
    },
    //头像图片处理上传
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatar = response
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
    //账户名汉字处理
    checkData(rule, value, callback) {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error("账户名不能输入汉字!"));
        } else {
          callback();
        }
      }
      callback();
    },
  },
};
</script>
<style scoped lang="scss">
.avatar-uploader {
  margin-left: 10%;
  font-size: 14px;
  color: #606266;
  margin-bottom: 10%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 10%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>