<template>
  <div id="app">
    <vue-drawer-layout ref="drawer" :enable="enable" :drawer-width="300">
      <div class="drawer-menu" slot="drawer">
        <v-menu @sign-in="signIn" @sign-out="signOut" @close="toggleDrawer"/>
      </div>
      <div slot="content" class="drawer-content-wrap" id="scroll">
        <el-scrollbar class="scroll">
          <div class="header">
            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <transition name="el-zoom-in-top">
                    <div class="top-logo hidden-sm-and-up">
                      <div class="menu-icon" @click="toggleDrawer"><i class="icon-menu iconfont"></i></div>
                      <div class="logo-pic"><img width="130" src="./common/image/09.png" alt=""></div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>

          <div class="nav-wrap hidden-sm-and-down">
            <nav-bar @sign-in="signIn" @sign-out="signOut"/>
          </div>

          <player :show="transition.cd"/>
          <div class="router-view">
            <transition name="slide" mode="out-in">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </transition>
          </div>
          <el-backtop target=".el-scrollbar__wrap" :visibility-height="100"/>
          <div id="captcha" ref="captcha" style="display:none"></div>
          <login ref="loginCom"/>
          <div class="record">
            <a href="http://www.beian.miit.gov.cn" target="_blank" class="record">陇ICP备19003149号</a>
          </div>
        </el-scrollbar>
      </div>
    </vue-drawer-layout>
  </div>
</template>
<script>
  import NavBar from "components/nav";
  import Player from "components/player";
  import Login from "components/login";
  import VMenu from "components/menu";

  const _isMobile = function () {
    const UA = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return UA !== null;
  };
  export default {
    components: {
      NavBar,
      Player,
      Login,
      VMenu
    },
    data() {
      return {
        transition: {
          cd: true
        },
        enable: _isMobile(),
        route: 'home'
      };
    },
    mounted() {
      this.route = this.$route.name;
      window.addEventListener('resize', () => {
        //  const width=document.body.clientWidth;
        this.enable = !!_isMobile();
      })
    },
    methods: {
      signIn() {
        this.$refs.loginCom._captchas();
        this.$refs.loginCom.showModel()
      },
      signOut() {
        this.$refs.loginCom._sign_out()
      },
      toggleDrawer() {
        this.$refs.drawer.toggle()
      }
    },
    computed: {},
    watch: {
      $route(to) {
        this.route = to.name;
        this.transition.cd = to.name === "home";
      },
      enable() {
        //TODO refresh
      }
    }
  };
</script>

<style lang="stylus">
  @import 'common/styles/index.styl';
  @import "https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
  html {
    height 100%
  }

  body {
    height 100%
    color $color-theme
    font-size $font-size
    font-family: Avenir, Chinese Quote, PingFang SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .record {
    position: fixed;
    z-index: 999;
    bottom: 20px;
    left: 0;
    text-align: center;
    width: 100%;

    a {
      color: #b0b0b0;

      &:hover {
        color: #d93f30
      }
    }
  }

  #app {
    box-sizing: border-box;
    height 100%;

    .drawer-menu {
      background-color #ffffff
      height 100%
    }

    .header {
      height 60px
      padding: 0;
      margin: 0;
      width: 100%;
      z-index: 10;
      background: #fff;
      position: fixed;

      &.s_down {
        box-shadow: 0 0 5px #888;
      }
    }

    .el-scrollbar__bar {
      &.is-vertical {
        z-index 11
      }
    }

    .top-logo {
      display flex

      .menu-icon {
        margin-left -20px

        .iconfont {
          display inline-block
          font-size 20px
          padding 6px
          margin-top 16px
          cursor pointer
        }
      }

      .logo-pic {
        flex 1
        margin-left 20px

        img {
          margin-top 18px
        }
      }
    }

    .scroll {
      height 100%

      .el-scrollbar__wrap {
        overflow-x hidden
      }
    }

    .nav-wrap {
      position: fixed;
      right: 70px;
      top: 0;
      z-index: 11;
    }

    .share-wrap {
      position: fixed;
      right: 0;
      top: 290px;
      z-index: 10;
    }
  }

  .el-textarea__inner {
    border-radius: 0;
    overflow: auto;
    word-break: break-all;
  }

  .drawer-content-wrap {
    height 100%
    overflow auto
    position relative
    z-index 1
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate(-10px, 0);
    opacity: 0;
  }

  @keyframes bounce-in {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
      opacity: 0;
      transform: translate3d(200px, 0, 0);
    }

    60% {
      opacity: 1;
    }

    75% {
      transform: translate3d(10px, 0, 0);
    }

    90% {
      transform: translate3d(-5px, 0, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .bounce-enter-active {
    animation: bounce-in .2s;
  }

  .bounce-leave-active {
    animation: bounce-in .2s reverse;
  }

</style>
