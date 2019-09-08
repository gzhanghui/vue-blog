<template>
  <transition name="el-zoom-in-center">
    <div class="share" v-show="show">
      <ul>
        <li class="share-item share-item-3">
          <i class="iconfont icon-github-fill"></i>
        </li>
        <li class="share-item share-item-2">
          <i class="iconfont icon-QQ-circle-fill"></i>
        </li>
        <li class="share-item share-item-1">
          <i class="iconfont icon-weibo-circle-fill"></i>
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
  position: fixed;
  right: 0;
  top: 290px;
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

      .icon-QQ-circle-fill {
        color: #00a0e9;
      }

      .icon-weixin {
        color: #0ab70e;
      }

      .icon-weibo-circle-fill {
        color: #fb373a;
      }
    }

    .iconfont {
      font-size: 32px;
      line-height: 70px;
      color: $color-text-d;
      transition: color 0.1s;
    }
  }
}
</style>
