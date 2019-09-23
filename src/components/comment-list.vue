<template>
  <div class="comment-wrap">
    <div class="comment-list">
      <div class="content-wrap">
        <div class="user">
          <a href="#" class="avatar" :data-id="comment.user.id" :data-slug="comment.user.slug">
            <img :src="comment.user.avatar" alt="">
          </a>
          <div class="note-name"><span>{{comment.user.nickname}}</span><span class="floor" v-if="comment.floor"> {{comment.floor}}楼</span></div>
          <div class="time"> {{comment.created_at}}</div>
        </div>
        <div class="bottom-wrap">
          <div class="content" v-html="comment.compiled_content">
          </div>
          <div class="tool">
            <div>
              <button class="button"  v-if="islike" @click="like"><i class="iconfont icon-likefill" :class="{liked:comment.liked}"></i><span>{{comment.likes_count}}</span></button>
              <button class="button" @click="toggleComment"><i class="iconfont icon-huifu"></i><span>{{reply}}</span>
              </button>
              <el-popover
                placement="top"
                width="160"
                v-model="delVisible">
                <p>确定删除评论吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="delVisible = false">取消</el-button>
                  <el-button type="text" size="mini" @click="del">确定</el-button>
                </div>
                <button class="button"   slot="reference"> <i class="iconfont icon-deletefill" ></i><span>删除</span></button>
              </el-popover>
            </div>
            <el-collapse-transition>
              <div class="comment" v-show="show">
                <comment ref="comment"  @send="send"></comment>
              </div>
            </el-collapse-transition>
          </div>
        </div>

      </div>
      <div class="children">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from 'components/comment'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'
  // eslint-disable-next-line
  const {name} = CollapseTransition;
  Vue.component(name, CollapseTransition);
  export default {
    name: "comment-list",
    data() {
      return{
        reply:'回复',
        show:false,
        delVisible:false
      }
    },
    props: {
      comment: {
        type: Object,
        default() {
          return {};
        }
      },
      islike:{
        type: Boolean,
        default() {
          return true;
        }
      }
    },

    components: {
      Comment
    },
    methods: {
      toggleComment() {
        let show = this.show;
        if(show){
          this.show =false;
          this.reply= "回复"
        }else{
          this.show =true;
          this.reply="取消回复"
        }
      },
      send(val){
        this.$emit('send',val)
      },
      del(){
        this.$emit('del')
      },
      like(){
        this.$emit('like')
      }
    }
  }
</script>



<style scoped lang="stylus">

  .comment-list {
    display: flex;
    flex-direction column
    line-height: 1.7;
    padding: 12px 0 20px 10px;
    font-size: 15px;
    .content-wrap {
      padding-top: 12px
      position: relative;

      .user {
        display flex
        justify-content: space-between
        align-comments center
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
        margin-left 36px
        padding-bottom: 10px
        border-bottom 1px solid #DCDFE6
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
        i.liked{
          color red
        }
      }
    }
  }

</style>
