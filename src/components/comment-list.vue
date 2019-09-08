<template>
  <div class="comment-wrap">
    <div class="comment-list">
      <div class="content-wrap">
        <div class="user">
          <a href="#" class="avatar">
            <img src="https://pic1.zhimg.com/7c3f1f24c_xs.jpg" alt="">
          </a>
          <div class="note-name"><span>张辉_8f48</span><span class="floor">28楼</span></div>
          <div class="time"> 09.08 01:55</div>
        </div>
        <div class="bottom-wrap">
          <div class="content">react 调用函数组件内部方法作为公开传播的内容，从法律角度是否有义务标识其传播的危险内容？<br>
            若以喜洋洋案为依据，则似乎需要。<br>
            但考虑到诸多电视剧或电影等传播形式，实际上并未标注。
          </div>
          <div class="tool">
            <div>
              <button class="button"><i class="iconfont icon-dianzan2-copy"></i><span>23</span></button>
              <button class="button" @click="toggleComment"><i class="iconfont icon-huifu1"></i><span>{{reply}}</span>
              </button>
              <button class="button"><i class="el-icon-delete-solid"></i><span>删除</span></button>
            </div>
            <el-collapse-transition>
              <div class="comment" v-show="show">
                <comment></comment>
              </div>
            </el-collapse-transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Comment from 'components/comment'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'
  Vue.component(CollapseTransition.name, CollapseTransition);
  export default {
    name: "comment-list",
    data() {
      return {
        show: false,
        reply: "回复"
      }
    },
    components: {
      Comment
    },
    methods: {
      toggleComment() {
        const show = this.show;
        this.show = !show;
        this.reply = show ? "回复" : "取消回复"
      }

    }
  }
</script>

<style scoped lang="stylus">
  .comment-list {
    position: relative;
    display: flex;
    align-items flex-start
    line-height: 1.7;
    flex-shrink: 0;
    padding: 12px 20px 10px;
    font-size: 15px;

    .user {
      display flex
      justify-content: space-between
      align-items center
      margin-bottom: 4px;

      .avatar {
        img {
          width: 24px;
          height: 24px;
          border: 1px solid #eee;
          border-radius: 2px;
          overflow: hidden;
          vertical-align middle
        }
      }

      .note-name {
        flex 1
        padding-left 12px
      }

      .floor {
        padding-left 12px
      }
    }

    .bottom-wrap {
      padding-left 36px

      .content {
        word-break: break-word;
        line-height: 1.6;
      }

      .tool {
        margin-top 4px

        .comment {
          margin-top 6px
        }
      }
    }

    .content-wrap {
      padding-bottom: 10px
      border-bottom 1px solid #DCDFE6
    }

    .button {
      padding: 0;
      font: inherit;
      color: inherit;
      cursor: pointer;
      background: none;
      outline: none;
      appearance: none;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      border-radius: 3px;
      height: auto;
      line-height: inherit;
      background-color: transparent;
      border: none;
      margin-right 10px

      &:focus {
        outline: none;
        transition: box-shadow .3s;
      }

      i, span {
        color #76839b
      }
    }
  }
</style>
