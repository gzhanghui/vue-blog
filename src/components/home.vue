<template>
  <div class="home-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 col-sm-2">
          <div class="logo-wrap  hidden-print hidden-xs pull-right">
            <div class="logo">
              <img src="../common/image/03.png" width="60" alt/>
            </div>
          </div>
        </div>
        <div class="col-md-11 col-sm-10">
          <div class="hot-comment" v-if="data.comment_content">
            <p>{{data.comment_content}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-wrapper">
      <div class="content">
        <div class="ball"></div>
        <div class="text">
          <span>Picture</span>
          <span>Language</span>
          <span>Code</span>
          <span>Story</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      data: {}
    };
  },

  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios.get("https://api.comments.hk/").then(res => {
        console.log(res);
        this.data = res.data;
        this.setHotComment(res.data);
      });
    },
    ...mapMutations({
      setHotComment: "SET_HOT_COMMENT"
    })
  },
  components: {}
};
</script>

<style scoped lang="stylus">
@import '~common/styles/variable.styl';

.home-wrapper {
  height: 100%;
  width: 100%;
  flex 1
  position relative
  .hot-comment {
    display: inline-block;
    writing-mode: vertical-rl;
    max-height: 400px;
    line-height: 32px;
    color: $color-text-d;
  }
  .logo {
    display: inline-block;
    padding-bottom: 20px;
    margin-top: -20px
    background: url('../common/image/05.png') no-repeat bottom;
  }
  .bg-wrapper {
    position: absolute;
    top: -60px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url('../common/image/01.png') no-repeat center center;
    background-size: 30%;

    .content {
      position: absolute;
      width: 100%;
      height: 43px;
      top: 50%;
      background: url('../common/image/06.png') no-repeat center;
      background-size: 30%;

      .ball {
        position: absolute;
        left: 59%;
        top: -160px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: $color-hightlight url('../common/image/08.png') no-repeat center;
        background-size: cover;
      }

      .text {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        font-size: 12px;
        color: #4e4200;
        overflow: hidden;

        span {
          box-sizing: border-box;
          display: inline-block;
          width: 25%;
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
