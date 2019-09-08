<template>
  <div class="nav-wrap">
    <div class="logo">
      <img src="../common/image/03.png" alt/>
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
        <li @click="handleLoginBtn" class="nav-item">
          <span v-if="loginState === false">登录</span>
          <el-popover
                  v-if="loginState === true"
                  trigger="hover"
                  popper-class="user-popover"
                  placement="left-start"
                  width="200"
                  v-model="visible">
            <div class="user-panel">
              <div class="info">
                <img width="42" class="avatar" src="http://face.cms.7yue.pro/img/avatar.fe758668.png" alt="">
                <div class="nickname">张辉_8f48</div>
              </div>
            </div>
            <el-button type="text" @click="signOut">退出登录</el-button>
            <span v-if="loginState === true" slot="reference">退出</span>
          </el-popover>
        </li>
      </ul>
    </div>
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

<style lang="stylus">
  @import '~common/styles/variable.styl';

  .logo {
    display: inline-block;
    position: relative;
    left: 74px;
    top: 80px;
    padding-bottom: 20px;
    background: url('../common/image/05.png') no-repeat bottom;
  }

  .user-popover {
    padding 16 12px
    background: $color-highlight-background url("../common/image/userbg.png") no-repeat;
    background-size cover;
    border: 0

    .popper__arrow {
      /*border-color #f8ebd7*/
    }
  }

  .user-panel {
    .info {
      display flex
      flex-direction row
    }

    .nickname {
      flex 1
      padding-left 12px
    }
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
