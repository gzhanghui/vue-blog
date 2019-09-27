<template>
  <div class="nav-wrapper">
    <div class="nav">
      <ul class="nav-ul">
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
        <router-link tag="li" class="nav-item" to="/project">
          <span>项目</span>
        </router-link>
        <router-link tag="li" class="nav-item" to="/about">
          <span>关于</span>
        </router-link>
      </ul>
    </div>
    <div class="share">
      <ul>
        <li class="share-item share-item-3">
          <a href="https://github.com/13029678009" target="_blank">
            <i class="iconfont icon-github-outline" style="font-weight: 300"></i>
            <span>github</span>
          </a>
        </li>
        <li class="share-item share-item-3">
          <i class="iconfont icon-weixin"></i>
          <span>微信</span>
        </li>
        <li class="share-item share-item-2"
            @click="handleLoginBtn"
            v-if="loginInfo.user_signed_in === false">
          <i class="iconfont icon-user"></i>
          <span>登录</span>
        </li>
        <el-popover
          transition="bounce"
          v-if="loginInfo.user_signed_in === true"
          trigger="hover"
          popper-class="user-popover"
          placement="left-start"
          width="200"
          v-model="visible">
          <div class="user-panel">
            <div class="info">
              <img :src="loginInfo.current_user.avatar" alt="" class="avatar" width="42">
              <div class="nickname">{{loginInfo.current_user.nickname}}</div>
            </div>
            <el-button style="text-align: center" type="text" size="medium" @click="signOut">退出登录<i
              class="iconfont icon-tuichu"></i></el-button>
          </div>
          <li
            slot="reference"
            v-if="loginInfo.user_signed_in === true"
            class="share-item share-item-1">
            <i class="iconfont icon-tuichu"></i>
            <span>已登录</span>
          </li>
        </el-popover>

      </ul>
    </div>
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
    padding 10px 0 !important

    .user-panel {
      text-align center

      .info {
        display flex
        flex-direction column
        justify-items center
        align-items center
        border-bottom 1px solid #e8e8e8
        padding-bottom 10px
        margin-bottom 10px

        .avatar {
          border-radius 50%
          margin 10px 0
        }

      }

      .iconfont {
        margin-left 4px
      }
    }
  }


  .nav-wrapper {

    .nav {
      background-color: $color-highlight-background;

      .nav-ul {
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

    .share {
      position relative
      left: 76px
      background-color: $color-background-d;
      padding: 32px 0;
      z-index 4

      .share-item {
        color rgba(0, 0, 0, .65);
        margin 6px 0
        padding 6px 0
        display flex;
        flex-direction column
        text-align: center;
        vertical-align: middle;
        transition: all 0.1s;
        cursor: pointer;

        span {
          font-size 12px
        }

        &:hover {
          background-color: #e4ecfd;

        }

        a {
          display flex
          flex-direction column
          flex 1
          text-decoration: none
        }

        .iconfont {
          font-size: 24px;
          transition: color 0.3s;
        }

      }
    }

  }

</style>
