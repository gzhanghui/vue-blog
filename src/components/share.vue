<template>
  <transition name="el-zoom-in-center">
    <div class="share" v-show="show">
      <ul>
        <li class="share-item share-item-3">
          <i class="iconfont icon-github"></i>
        </li>
        <li class="share-item share-item-2">
          <i class="iconfont icon-QQ"></i>
        </li>
        <li class="share-item share-item-1">
          <i class="iconfont icon-weibo1"></i>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/styles/variable.styl';

.share {

  background-color: $color-background-d;
  padding: 32px 0;
  z-index 4

  .share-item {
    width: 70px;
    text-align: center;
    vertical-align: middle;
    transition: all 0.1s;
    cursor: pointer;

    &:hover {
      background-color: $color-text-l;

      .icon-QQ {
        color: #00a0e9;
      }

      .icon-github {
        color: #8799a3;
      }

      .icon-weibo1 {
        color: #fb373a;
      }
    }
    .iconfont {
      font-size: 26px;
      line-height: 70px;
      color: $color-text-d;
      transition: color 0.3s;
    }

  }
}
</style>
