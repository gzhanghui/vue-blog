<template>
  <div class="comment-wrap">
    <div class="comment-block">
      <div class="textarea" :class="{active:showSend}">
        <el-input
          ref="input"
          @focus="showSend = true"
          v-model="content.content"
          type="textarea"
          autosize
          resize="none"
          style="border-radius:0"
          placeholder="请输入你的评论"
        ></el-input>
        <el-popover
          placement="bottom-end"
          width="366"
          trigger="click">
          <div class="emoji-panel">
            <ul class="indicator">
              <li v-for="(count,index) in emojiTabCount" :key="count"
                  class="indicator-item" :class="{active:index===tabActive}"
                  @click="switchTab(index)"></li>
            </ul>
            <div class="emoji-container">
              <ul>
                <li v-for="(item,index) in emojiList"
                    :key="index"
                    @click="select"
                    v-show="index===tabActive">
                  <span class="emoji-item" :key="code.code" v-for="(code,i) in item" :data-index="i">{{code.text}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="emoji" slot="reference">
            <i class="iconfont icon-emoji" id="emoji"></i>
          </div>
        </el-popover>
      </div>
      <transition name="slide" mode="out-in">
        <div class="send" v-show="showSend">
          <el-button type="primary" @click="send">发送</el-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {emoji} from 'common/emoji/emoji'

  export default {
    data() {
      return {
        showSend: false,
        content: {
          content: ""
        },
        emojiTabCount: 4,
        tabActive: 0
      };
    },
    mounted() {
      document.body.addEventListener('click', (e) => {
        if (e.target.id === 'emoji' || e.target.nodeName === 'TEXTAREA') {
          return false
        } else {
          this.showSend = false
        }
      })
    },
    computed: {
      emojiList() {
        const arr = [];
        const count = emoji.length / this.emojiTabCount;
        for (let i = 0; i < this.emojiTabCount; i++) {
          const _arr = emoji.slice(count * i, count * (i + 1));
          arr.push(_arr)
        }
        return arr
      }
    },
    methods: {
      select(e) {
        if (e.target.nodeName.toLowerCase() === 'span') {
          parseInt(e.target.dataset.index);
          const val = this.content.content;
          this.content.content = val + e.target.innerText
        }
      },
      switchTab(index) {
        this.tabActive = index
      },
      send() {
        this.$emit('send',this.content.content);
      }
    },
    components: {}
  };
</script>

<style scoped lang="stylus">
  @import '~common/styles/variable.styl';
  .comment-block {
    position relative
  }

  .emoji-panel {
    padding 10px

    .indicator {
      padding 10px 0
      display flex
      align-items: center;
      justify-content: center;

      .indicator-item {
        width: 8px;
        height: 8px;
        background-color: #8c8c8c;
        margin: 0 5px;
        border-radius: 50%;
        cursor: pointer;

        &.active {
          background-color $color-sub-theme
        }
      }

    }

    .emoji-container {
      margin-top 10px

      .emoji-item {
        user-select none
        transition background-color .3s
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #404040;
        width: 32px;
        height: 32px;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          background-color rgba(0, 0, 0, .075)
        }
      }
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: scale(0);
  }

  .width-enter-active, .width-leave-active {
    transition: all 0.3s;
  }

  .textarea {
    position: relative;
    z-index 2;
    font-family Microsoft YaHei
    transition: all 0.3s;

    &.active {
      margin-right: 80px !important
    }
    .emoji {
      line-height normal
      position: absolute;
      right: 10px;
      bottom: 6px;

      .iconfont {
        user-select none
        font-size 20px
        cursor pointer
        &:hover {
        }
      }
    }
  }

  .send {
    position absolute
    right 0
    top 0
    z-index 1;
  }
</style>
