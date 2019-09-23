<template>
  <div class="menu">
    <div class="close-btn pull-right" @click="close"><i class="iconfont icon-close"></i></div>
      <div class="user-info" v-if="loginInfo.current_user">
        <img  width="60" class="avatar"  :src="loginInfo.current_user.avatar" alt="">
        <div class="nickname">{{loginInfo.current_user.nickname}}</div>
    </div>
    <ul>
      <router-link tag="li" class="menu-item" to="/">
        <i class="icon-homefill iconfont"></i><span>首页</span>
      </router-link>
      <router-link
        tag="li"
        class="menu-item"
        to="/note-list"
        :class="$route.name==='article'?'router-link-exact-active router-link-active':''"
      >
        <div><i class="icon-formfill iconfont"></i><span>文章</span></div>
      </router-link>
      <router-link tag="li" class="menu-item" to="/about">
        <div><i class="icon-about iconfont"></i><span>关于</span></div>
      </router-link>
      <li  class="menu-item">
        <div ><i class="icon-github iconfont"></i><span>GITHUB</span></div>
      </li>
      <li @click="handleLoginBtn" class="menu-item">
        <div v-if="loginInfo.user_signed_in === false"><i class="icon-myfill iconfont"></i><span>登录</span></div>
        <div v-if="loginInfo.user_signed_in === true" ><i class="icon-out iconfont"></i><span  @click="signOut">退出</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  export default {
    computed: {
      ...mapGetters(["loginInfo"])
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
      },
      close(){
        this.$emit('close')
      }
    }
  };
</script>

<style   lang="stylus">
  @import '~common/styles/variable.styl';
  .menu {
    border-top:1px solid transparent
    .close-btn{
      padding 6px
      margin-right 10px
      margin-top 10px
      cursor pointer
    }
    .user-info{
      text-align center
      margin-top: 50px
      margin-bottom 30px
      min-height 95px
      .nickname{
        padding-top 15px
      }
    }
    ul {
      padding-bottom: 15px;
      border-top:1px solid transparent
    }

    .menu-item {
      padding: 12px 30px;
      margin: 4px 0
      color: #767676;
      cursor: pointer;
      vertical-align middle
      .iconfont{
        margin-right: 5px;
      }
      .icon-homefill{
        color #e54d42
      }
      .icon-formfill{
        color #1cbbb4
      }
      .icon-about{
        color #f37b1d
      }
      .icon-out{
        color #fbbd08
      }
      .icon-github{
        color #8799a3
      }
      &.router-link-exact-active {
        background-color #fde6d2
        color #f37b1d
      }
    }
  }
</style>
