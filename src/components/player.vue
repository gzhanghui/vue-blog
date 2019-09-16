<template>
  <div class="player">
    <transition name="el-fade-in">
      <div class="avatar-wrapper">
        <aplayer autoplay :float="true" :mini="true" :music="music" v-if="music.src"></aplayer>
      </div>
    </transition>
    <!-- <div class="arrow" style="display:none">
      <i class="icon icon-xiala"></i>
      <span class="text">05/30</span>
      <i class="icon icon-shangla"></i>
    </div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
import Aplayer from "vue-aplayer";
export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  components: {
    Aplayer
  },
  computed: {
    music() {
      const data = this.comment;
      return {
        src: data["mp3_url"],
        title: data.title,
        artist: data.author,
        pic: data.images,
        lrc: null
        // author: data.author
        // theme
      };
    },
   
    ...mapGetters(["comment"])
  },
  methods: {
    load() {
      console.log('load')
    },
    canplay(a) {
      console.log(a, 'canplay')
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/styles/variable.styl';

.player {
  .avatar-wrapper {
    display: inline-block;
    position: fixed;
    bottom: 50px;
    left: 64px;
    z-index: 4;

    @media screen and (max-width: 750px) {
      left: -5px;
      bottom: -5px;
    }
    .icon {
      font-size: 38px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -19px;
      margin-left: -19px;
      color: #ffffff;
      cursor: pointer;
    }

    img {
      margin-top: 10%;
      margin-left: 10%;
      border-radius: 50%;
    }
  }

  .arrow {
    position: absolute;
    right: 120px;
    bottom: 50px;
    z-index: 4;
    cursor: pointer;
    text-align: center;

    .text {
      display: block;
      writing-mode: vertical-rl;
      padding: 8px 2px;
    }

    .icon {
      font-size: 24px;
      color: $color-hightlight;
      font-weight: 700;
    }
  }
}
</style>
