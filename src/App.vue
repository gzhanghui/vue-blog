<template>
  <div id="app">
    <nav-bar></nav-bar>
    <share :show="transition.share"></share>
    <player :show="transition.cd"></player>
    <div class="view">
      <transition name="slide" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
    <el-backtop target=".view"></el-backtop>
    <div id="captcha" ref="captcha" style="display:noqne"></div>

    <login />
  </div>
</template>
<script>
import NavBar from "components/nav";
import Share from "components/share";
import Player from "components/player";
import Login from "components/login";
export default {
  components: {
    NavBar,
    Share,
    Player,
    Login
  },
  data() {
    return {
      transition: {
        cd: true,
        share: true
      }
    };
  },
  mounted() {},
  methods: {},
  watch: {
    $route(to, from) {
      console.log(to.name);
      if (to.name !== "home") {
        this.transition.share = false;
        this.transition.cd = false;
      } else {
        this.transition.share = true;
        this.transition.cd = true;
      }
    }
  }
};
</script>

<style lang="stylus">
@import 'common/styles/index.styl';

#app {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .container:after, .container:before {
    content: ' ';
    display: table;
  }

  .container:after {
    clear: both;
  }

  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }

  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }

  @media (min-width: 1081px) {
    .container {
      width: 960px;
    }
  }

  .container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .container-fluid:after, .container-fluid:before {
    content: ' ';
    display: table;
  }

  .container-fluid:after {
    clear: both;
  }

  .view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    overflow-x: hidden;
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
</style>
