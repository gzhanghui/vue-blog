<template>
  <div class="menu">
    <ul>
      <router-link tag="li" class="menu-item" to="/">
        <i class="icon-QQ iconfont"></i><span>首页</span>
      </router-link>
      <router-link
        tag="li"
        class="menu-item"
        to="/note-list"
        :class="$route.name==='article'?'router-link-exact-active router-link-active':''"
      >
        <div><i class="icon-QQ iconfont"></i><span>文章</span></div>
      </router-link>
      <router-link tag="li" class="menu-item" to="/about">
        <div><i class="icon-QQ iconfont"></i><span>关于</span></div>
      </router-link>
      <li @click="handleLoginBtn" class="menu-item">
        <div v-if="loginState === false"><i class="icon-QQ iconfont"></i><span>登录</span></div>
        <div v-if="loginState === true" ><i class="icon-QQ iconfont"></i><span  @click="signOut">退出</span></div>
      </li>
      <li  class="menu-item">
        <div ><i class="icon-QQ iconfont"></i><span>GITHUB</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  export default {
    computed: {
      ...mapGetters(["loginModel", "loginState"])
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      handleLoginBtn(){
        this.$emit('sign-in')
      },
      signOut(){
        this.$emit('sign-out')
      }
    }
  };
</script>

<style   lang="stylus">
  @import '~common/styles/variable.styl';
  .menu {
    ul {
      padding-bottom: 15px;
    }

    .menu-item {
      padding: 16px 24px;
      color: $color-theme;
      cursor: pointer;

      &.router-link-exact-active {
        color: $color-sub-theme;
      }
    }
  }
</style>
