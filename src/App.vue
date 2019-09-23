<template>
  <div id="app">
    <vue-drawer-layout ref="drawer" :enable="enable" :drawer-width="300">
      <div class="drawer-menu" slot="drawer">
        <v-menu @sign-in="signIn" @sign-out="signOut" @close="toggleDrawer"></v-menu>
      </div>
      <div slot="content" class="drawer-content-wrap">
        <el-container>
          <el-header height="60px" style="position: relative;z-index: 1;">
            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <transition name="el-zoom-in-top">
                    <div class="top-logo hidden-sm-and-up" >
                      <div class="menu-icon" @click="toggleDrawer" ><i class="icon-menu iconfont"></i></div>
                     <div class="logo-pic"><img width="130" src="./common/image/09.png" alt=""></div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </el-header>
          <el-main style="padding:0">
            <div class="nav-wrap hidden-sm-and-down">
              <nav-bar @sign-in="signIn" @sign-out="signOut"></nav-bar>
            </div>
            <div class="share-wrap  hidden-sm-and-down">
              <share :show="transition.share"></share>
            </div>
            <player :show="transition.cd"></player>
            <div class="view">
              <el-scrollbar class="scroll">
              <transition name="slide" mode="out-in">
                <keep-alive>
                  <router-view/>
                </keep-alive>
              </transition>
              </el-scrollbar>
            </div>
            <el-backtop target=".view"></el-backtop>
            <div id="captcha" ref="captcha" style="display:none"></div>
            <login ref="loginCom"/>
          </el-main>
        </el-container>
      </div>
    </vue-drawer-layout>
  </div>
</template>
<script>
  import NavBar from "components/nav";
  import Share from "components/share";
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
    Share,
    Player,
    Login,
    VMenu
  },
  data() {
    return {
      transition: {
        cd: true,
        share: true
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
      signIn(){
          this.$refs.loginCom._captchas();
          this.$refs.loginCom.showModel()
      },
      signOut(){
          this.$refs.loginCom._sign_out()
      },
      toggleDrawer(){
          this.$refs.drawer.toggle()
      }
  },
    computed: {},
  watch: {
    $route(to) {
      this.route = to.name;
      if (to.name !== "home") {
        this.transition.share = false;
        this.transition.cd = false;
      } else {
        this.transition.share = true;
        this.transition.cd = true;
      }
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
  font-family: Avenir,Chinese Quote,PingFang SC,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
}


#app {
  box-sizing: border-box;
  height 100%;
  display flex
  .drawer-menu {
    background-color #ffffff
    height 100%
  }
  .top-logo {
    display flex

    .menu-icon{
      margin-left -20px
      .iconfont{
        display inline-block
        font-size 20px
        padding 6px
        margin-top 16px
        cursor pointer
      }
    }
    .logo-pic{
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
    z-index: 3;
  }

  .share-wrap {
    position: fixed;
    right: 0;
    top: 290px;
    z-index: 3;
  }

  .view {
    height 100%
  }
}

.el-textarea__inner {
  border-radius: 0;
  overflow: auto;
  word-break: break-all;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate(-10px, 0);
  opacity: 0;
}

.drawer-content-wrap {
  height 100%
  display flex
}
</style>
