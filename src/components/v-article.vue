<template>
    <div class="article-wrapper container">
      <div class="row">
        <div class="col-md-8">
          <div v-html="articleHtml" ref="content" class="content"></div>
          <div class="comment-wrap">
              <comment @send="send"/>
              <div class="comment-title" v-if="comment.comments&&comment.comments.length>0">
                <h3>全部评论({{commentSize}})</h3>
              </div>
              <div class="comment-list">
                <transition-group name="el-zoom-in-top">
                  <comment-list v-for="(item,index) in comment.comments"
                                :comment="item"
                                :key="item.id"
                                @send="send(arguments,index)"
                                @like="like(item.id)"
                                @del="del(item.id)"
                  >
                    <div class="children" style="padding-left: 30px">
                      <transition-group name="el-zoom-in-top">
                        <comment-list v-for="(children) in item.children"
                                      :comment="children"
                                      :key="children.id"
                                      :islike="false"
                                      @send="send(arguments,index)"
                                      @del="del(children.id)"
                        />
                      </transition-group>
                    </div>
                  </comment-list>
                </transition-group>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  /*import hljs from "highlight.js";
  */
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/xml";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", html);
import {mapGetters} from 'vuex';
import {getArticle, getComments, comments, deleteComment, like} from "api/api";
import Comment from "components/comment.vue";
import CommentList from "components/comment-list.vue"
export default {
  data() {
    return {
      articleHtml: "",
      comment: {},
      commentSize:0
    };
  },
  mounted() {
    this._getArticle();
    this._getComments()
  },
  components:{
    Comment,
    'CommentList': CommentList
  },
  computed: {
    ...mapGetters(["loginInfo"])
  },
  methods: {
    _getArticle() {
      const noteData = this.$route.params.noteData;
      let routeParams = null;
      if (!noteData) {
        return;
      }
      routeParams = JSON.parse(noteData);
      this.commentSize=routeParams.comments;
      const id = this.$route.query.id;
      getArticle(id).then(res => {
        this.articleHtml = res.data;
        this.$nextTick(() => {
          let blocks = this.$refs.content.querySelectorAll("pre code");
          blocks.forEach(block => {
            hljs.highlightBlock(block);
          });
        });
      });
    },
    _getComments() {
      const noteId = this.$route.query.noteId;
      getComments(noteId).then(res => {
        this.comment = res;
      })
    },
    send(content, index) {
      const noteId = this.$route.query.noteId;
      let id = null;
      let text = '';
      if (index !== undefined) {
        id = this.comment.comments[index].id;
        text = content[0]
      } else {
        text = content
      }

      comments(noteId, text, id).then(res => {
        const data = JSON.parse(res);
        data.user.avatar = this.loginInfo.current_user.avatar;
        if (data.parent_id) {
          this.$message.success('发表评论成功');
          this.comment.comments.forEach((item, index) => {
            if (data.parent_id === item.id) {
              this.comment.comments[index].children.unshift(data)
            }
          })
        } else {
          this.comment.comments.unshift(data)
        }
      });
    },
    like(id) {
      let fuck = null;
      const index = this.comment.comments.findIndex((item) => {
        return item.id === id
      });
      if (index > -1) {
        if (this.comment.comments[index].liked === false) {
          fuck = 1
        }
      }
      like(id, fuck).then(res => {
        if (index > -1) {
          if (res === 'dislike_ok') {
            this.comment.comments[index].liked = false;
            this.comment.comments[index].likes_count -= 1
          }
          if (res.data === 'like_ok') {
            this.comment.comments[index].liked = true;
            this.comment.comments[index].likes_count += 1
          }

        }
      })
    },
    del(id) {
      deleteComment(id).then(res => {
        if (res) {
          const data = res;
          if (data.parent_id === -1) {
            const index = this.comment.comments.findIndex((item) => {
              return item.id === data.id
            });
            if (index > -1) {
              this.comment.comments.splice(index, 1);
              this.$message.success('删除成功')
            }
          } else if (data.parent_id !== -1) {
            const index = this.comment.comments.findIndex((item) => {
              return item.id === data.parent_id
            });
            if (index > -1) {
              const i = this.comment.comments[index].children.findIndex(item => {
                return item.id === data.id
              });
              if (i > -1) {
                this.comment.comments[index].children.splice(i, 1);
                this.$message.success('删除成功')
              }
            }
          }
        }
      })
    }
  },

};
</script>

<style   lang="stylus">
@import '~highlight.js/styles/atom-one-dark.css';
.article-wrapper
  padding-top 122px

  .note .post
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 40px;
    width: 620px;

  .comment-title
    background #F2F6FC
    margin-top 20px;

    h3
      font-size 16px
      font-weight 600
      padding: 10px 20px;

  .comment-list, .children
    transition all .3s

  .content
    p
      line-height: 2;
      margin-bottom: 1.2em;

    .title
      word-break: break-word !important;
      word-break: break-all;
      margin: 20px  0;
      font-size: 22px;
      font-weight: 600;
      line-height: 1.3;


  .content .follow, .content .follow-cancel, .content .follow-each, .content .following, .content .user-follow-button-header
    padding 0 7px 0 5px
    font-size 12px

  .content
    .author
      .meta
        margin-top 5px
        font-size 12px

        span
          padding-right 5px

      .edit
        float right
        margin-top 8px
        padding 0 12px
        font-size 14px
        border 1px solid #dcdcdc
        color #9b9b9b
        line-height 30px
        border-radius 50px

        &:hover
          background-color hsla(0, 0%, 71%, 0.1)

    .show-content
      word-break break-word !important
      word-break break-all
      font-size 16px
      font-weight 400
      line-height 1.7

      .video-package
        position relative
        margin -20px auto 20px
        text-align center

        .video-description
          min-width 20%
          min-height 22px
          display none
          padding 10px
          margin 0 auto
          border-bottom 1px solid #d9d9d9
          font-size 13px
          color #999
          line-height 1.7

          &:empty
            display none

        .video-placeholder-area
          position relative
          display inline-block
          height 110px
          padding 10px
          padding-left 120px
          box-sizing border-box
          border 1px solid #d9d9d9
          background-color hsla(0, 0%, 71%, 0.1)
          text-align left
          cursor pointer

          &:after
            content ' '
            position absolute
            top -1px
            left -1px
            display block
            width 110px
            height 110px
            background-color rgba(0, 0, 0, 0.3)
            background-image url('//cdn2.jianshu.io/assets/common/play-btn-c4bc06b9dfe063495b6b8277b14bc5c3.png')
            background-position 30px
            background-size 50px
            background-repeat no-repeat
            transition all 0.1s linear

          &:hover
            &:after
              background-color transparent

          .video-cover
            position absolute
            top -1px
            left -1px
            display block
            width 110px
            height 110px
            opacity 0.8
            transition opacity 0.1s linear

        .video-provider-button
          float right

      li
        p
          overflow visible

      a
        color #3194d0

        &:hover
          color #3194d0
          text-decoration underline

      hr
        margin 0 0 20px
        border-top 1px solid #ddd

      img
        max-width 100%

      blockquote
        padding 20px
        margin-bottom 25px
        background-color #f7f7f7
        border-left 6px solid #b4b4b4
        word-break break-word !important
        word-break break-all
        font-size 16px
        font-weight 400
        line-height 30px

        p
          font-size 16px
          font-weight 400
          line-height 1.7

        .image-package
          width auto
          margin-left 0

      pre
        margin-bottom 20px
        font-size 13px
        word-wrap normal
        word-break break-word !important
        word-break break-all
        white-space pre
        overflow auto
        border-radius 4px

        code
          padding 12px
          white-space pre

      code
        padding 2px 4px
        border none
        font-size 13px
        white-space pre-wrap
        vertical-align middle

      table
        width 100%
        margin-bottom 20px
        border 1px solid #ddd
        border-collapse collapse
        border-left none
        word-break normal

        tr
          &:nth-of-type(2n)
            background-color hsla(0, 0%, 71%, 0.1)

        thead
          th
            vertical-align middle
            text-align inherit

        th
          font-weight 700

        .image-package
          width auto
          margin-left 0

      .image-package
        padding-bottom 25px
        width 700px
        margin-left -40px
        text-align center

        .image-container
          z-index 100
          position relative
          background-color #eee
          transition background-color 0.1s linear
          margin 0 auto

          .image-container-fill
            z-index 50

          .image-view
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            overflow hidden

            img
              display block
              transition all 0.15s linear
              z-index 100
              -webkit-filter blur(0)
              filter blur(0)
              opacity 1

              &.image-loading
                -webkit-filter blur(4px)
                filter blur(4px)
                opacity 0.3

        img
          max-width 100%
          height auto
          vertical-align middle
          border 0
          cursor -webkit-zoom-in
          transition all 0.25s ease-in-out

        .image-caption
          min-width 20%
          max-width 80%
          min-height 22px
          display inline-block
          padding 10px
          margin 0 auto
          border-bottom 1px solid #d9d9d9
          font-size 14px
          color #969696
          line-height 1.7

          &:empty
            display none

    .show-content-paid
      -webkit-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none

  .content .show-content blockquote h1:last-child, .content .show-content blockquote h2:last-child, .content .show-content blockquote h3:last-child, .content .show-content blockquote h4:last-child, .content .show-content blockquote h5:last-child, .content .show-content blockquote h6:last-child, .content .show-content blockquote li:last-child, .content .show-content blockquote ol:last-child, .content .show-content blockquote p:last-child, .content .show-content blockquote ul:last-child
    margin-bottom 0

  .content .show-content a.active, .content .show-content a:active, .content .show-content a:focus
    color #3194d0

  .content .show-content a.disabled, .content .show-content a.disabled.active, .content .show-content a.disabled:active, .content .show-content a.disabled:focus, .content .show-content a.disabled:hover, .content .show-content a[disabled], .content .show-content a[disabled].active, .content .show-content a[disabled]:active, .content .show-content a[disabled]:focus, .content .show-content a[disabled]:hover
    cursor not-allowed

  .content .show-content ol, .content .show-content p, .content .show-content ul
    word-break break-word !important
    word-break break-all

  .content .show-content h1, .content .show-content h2, .content .show-content h3, .content .show-content h4, .content .show-content h5, .content .show-content h6
    margin 0 0 15px
    font-weight 700
    color #2f2f2f
    line-height 1.7
    text-rendering optimizelegibility

  .content .show-content ol, .content .show-content ul
    padding 0
    margin -5px 0 20px 20px

  .content .show-content ol li, .content .show-content ul li
    line-height 30px

  .content .show-content ol li ol, .content .show-content ol li ul, .content .show-content ul li ol, .content .show-content ul li ul
    margin-top 15px

  .content .show-content ol .image-package, .content .show-content ul .image-package
    width auto !important
    margin-left 0 !important

  .content .show-content table td, .content .show-content table th
    padding 8px
    border 1px solid #ddd
    line-height 20px
    vertical-align middle

  .content .show-content .video-package .video-close-button, .content .show-content .video-package .video-provider-button
    text-align left
    font-size 14px
    padding 0
    line-height 14px
    cursor pointer
    transition opacity 0.1s linear

  .content .show-content .video-package .video-close-button i, .content .show-content .video-package .video-provider-button i
    position relative
    top 1px
</style>
