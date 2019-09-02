<template>
  <el-dialog
    title=" "
    :append-to-body="true"
    :visible="loginModel"
    custom-class="login-style"
    width="480px"
    @close="close"
  >
    <div class="login-wrapper" style="display: flex;">
      <div class="left-img">
        <img src="../common/image/03.png" />
      </div>
      <div class="right" style="flex: 1 1 0%;">
        <div class="title" style>
          <img src="http://img-home.7yue.pro/images/login/登录.png" style="width: 40px;" />
        </div>
        <div class="input-item">
          <el-input placeholder="请输入注册邮箱" type="text" prefix-icon="el-icon-user" />
        </div>
        <div class="input-item">
          <el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </div>
        <div class="input-text">
          <div>
            <el-link>忘记密码</el-link>
          </div>
          <div>
            <el-link>注册</el-link>
          </div>
        </div>

        <el-button
          type="primary"
          style="width:100%;border-radius:0"
          size="medium"
          :loading="loading"
          @click="click"
        >{{waitMsg}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import { getArticle, captchas, login } from "api/api";
import "../common/js/gt";
export default {
  data() {
    return {
      loading: true,
      waitMsg: "正在加载验证码......"
    };
  },
  mounted() {
    this._captchas();
  },
  computed: {
    ...mapGetters(["loginModel", "loginState"])
  },
  watch: {},
  methods: {
    click() {
      const dom = document.getElementsByClassName("geetest_btn")[0];
      dom && dom.click();
    },
    close() {
      this.setLoginModel(false);
    },
    _captchas() {
      captchas().then(res => {
        const captcha = res.data;
        console.log(res.data);
        initGeetest(
          {
            gt: captcha.gt,
            challenge: captcha.challenge,
            product: "popup",
            offline: captcha.offline,
            new_captcha: 0
          },
          captchaObj => {
            captchaObj.appendTo(document.getElementById("captcha"));
            this.waitMsg = "登 录";
            this.loading = false;
            captchaObj
              .onSuccess(() => {
                const validate = captchaObj.getValidate();
                if (validate.geetest_validate) {
                  console.log("验证通过");
                }
                validate.gt = captcha.gt;
                this._login(validate);
              })
              .onError(() => {
                console.log("错了");
              });
          }
        );
      });
    },
    _login(getValidate) {
      this.waitMsg = "正在登录...";
      this.loading = true;
      login(getValidate).then(res => {
        console.log(res);
        if (res.code === 0) {
          const data = res.data;
          this.setLoginState(data.user_signed_in);

          if (data.user_signed_in) {
            this.setLoginModel(false);
            this.$message.info("登录成功");

            localStorage.setItem("authenticity_token", data.authenticity_token);
          }
        }
      });
    },
    ...mapMutations({
      setLoginModel: "SET_LONGIN_MODEL",
      setLoginState: "SET_LONGIN_STATE"
    })
  }
};
</script>

<style    lang="stylus">
.left-img {
  min-width: 110px;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f6ff;

  img {
    width: 42px;
  }
}

.right {
  padding: 30px;
  flex: 1 1 0%;

  .title {
    text-align: center;
    margin-bottom: 60px;
  }

  .input-item {
    margin-top: 20px;

    input {
      border-radius: 0;
    }
  }

  .input-text {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin: 10px 0 20px 0;
  }
}

.login-style {
  .el-dialog__header, .el-dialog__body {
    padding: 0;
  }
}
</style>
