<template>
  <div id="app">
    <vue-drawer-layout ref="drawer" :enable="enable">
      <div class="drawer-menu" slot="drawer">
        <v-menu @sign-in="signIn" @sign-out="signOut"></v-menu>
      </div>
      <div slot="content" class="drawer-content-wrap">
        <el-container>
          <el-header height="80px">
            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <transition name="el-zoom-in-top">
                    <div class="top-logo" v-show="route!=='home'"><img width="130" src="./common/image/09.png" alt="">
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
              <transition name="slide" mode="out-in">
                <keep-alive>
                  <router-view/>
                </keep-alive>
              </transition>
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
@import "common/styles/docs.min.css"
html {
  height 100%
}

body {
  height 100%
}

.drawer-menu {
  background-color #ffffff
  height 100%
}
#app {
  box-sizing: border-box;
  height 100%;
  display flex

  .top-logo {
    img {
      margin-top 18px
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
