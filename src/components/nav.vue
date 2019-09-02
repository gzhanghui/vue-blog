<template>
  <div class="nav-wrap">
    <div class="logo">
      <img src="../common/image/03.png" alt />
    </div>
    <div class="nav">
      <ul>
        <router-link tag="li" class="nav-item" to="/">
          <span>首页</span>
        </router-link>
        <router-link
          tag="li"
          class="nav-item"
          to="/note-list"
          :class="$route.name==='article'?'router-link-exact-active router-link-active':''"
        >
          <span>文章</span>
        </router-link>
        <router-link tag="li" class="nav-item" to="/about">
          <span>关于</span>
        </router-link>
        <li @click="showModel" class="nav-item">
          <span v-if="loginState === false">登录</span>
          <span v-else>退出</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import { sign_out } from "api/api";

export default {
  computed: {
    ...mapGetters(["loginModel", "loginState"])
  },
  methods: {
    showModel() {
      if(!this.loginState){
        this.setLoginModel(true);
      }else{
        this._sign_out()
      }
    },
     _sign_out() {
      const token = localStorage.getItem("authenticity_token");
      sign_out(token).then(res => {
        if (res.code === 0) {
          const data = res.data;
          if (!data.user_signed_in) {
            this.setLoginState(data.user_signed_in);
            this.$message.info("退出成功");
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

<style scoped lang="stylus">
@import '~common/styles/variable.styl';

.logo {
  display: inline-block;
  position: relative;
  left: 74px;
  top: 80px;
  padding-bottom: 20px;
  background: url('../common/image/05.png') no-repeat bottom;
}

.nav {
  position: fixed;
  right: 70px;
  top: 0;
  z-index: 3;
  background-color: $color-highlight-background;

  ul {
    padding-top: 80px;
    padding-bottom: 15px;
  }

  .nav-item {
    padding: 16px 24px;
    color: $color-theme-d;
    cursor: pointer;

    &.router-link-exact-active {
      color: $color-hightlight;
      background: url('../common/image/07.png') no-repeat 40px 15px;
    }
  }
}
</style>
