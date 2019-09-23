<template>
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
          <span v-if="loginInfo.user_signed_in === false">登录</span>
          <el-popover
                  v-if="loginInfo.user_signed_in === true"
                  trigger="hover"
                  popper-class="user-popover"
                  placement="left-start"
                  width="200"
                  v-model="visible">
            <div class="user-panel">
              <div class="info">
                <img width="42" class="avatar" :src="loginInfo.current_user.avatar" alt="">
                <div class="nickname">{{loginInfo.current_user.nickname}}</div>
              </div>
            </div>
            <el-button type="text" @click="signOut">退出登录</el-button>
            <span v-if="loginInfo.user_signed_in === true" slot="reference">退出</span>
          </el-popover>
        </li>
      </ul>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    export default {
        computed: {
            ...mapGetters(["loginModel", "loginInfo"])
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
