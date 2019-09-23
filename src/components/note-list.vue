<template>
  <div class="list-wrapper ">
    <el-scrollbar class="scroll">
        <div class="list-container container">
          <div class="row">
           <div class="col-md-8">
             <ul class="note-list" v-if="noteList.length>0">
               <li :data-note-id="item.noteId" v-for="item in noteList" :key="item.noteId">
                 <div class="line">
                   <i class="iconfont icon-line"></i>
                 </div>
                 <div class="content">
                   <h3 class="title" @click="goArticle(item)">{{item.title}}</h3>
                   <p class="abstract">{{item.abstract}}</p>
                   <div class="meta">
                     <a class="read-btn " @click="goArticle(item)" href="javascript:;">阅读全文</a>
                     <span>
                    <i class="iconfont icon-attention"></i>
                    <b>{{item.read}}</b>
                  </span>
                     <span>
                    <i class="iconfont icon-comment"></i>
                    <b>{{item.comments}}</b>
                  </span>
                     <span>
                    <i class="iconfont icon-like"></i>
                    <b>{{item.like}}</b>
                  </span>
                     <span class="time">
                    <i class="icon-time iconfont"></i>
                    <b>{{item.time}}</b>
                  </span>
                   </div>
                 </div>
               </li>
             </ul>
           </div>
          </div>
        </div>
    </el-scrollbar>
  </div>
</template>

<script type="text/ecmascript-6">
import { getNoteList } from "../api/api";
export default {
  data() {
    return {
      noteList: []
    };
  },
  mounted() {
    this._getNoteList();
  },
  methods: {
    _getNoteList() {
      getNoteList().then(res => {
        this.noteList = res;
        console.log(res);
      });
    },
    goArticle(item) {
      this.$router.push({ name: "article", query: { id: item.articleId, noteId:item.noteId },params:{noteData:JSON.stringify(item)} });
    }
  },
  components: {}
};
</script>

<style   lang="stylus">
@import '~common/styles/variable.styl';

.list-wrapper {
  box-sizing: border-box;
  padding-top: 40px;

  .note-list {
    & > li {
      margin 16px 0
      position relative
      .line {
        position absolute
        top -16px
        left -2px
        .iconfont {
          color: $color-theme;
          font-size: 26px;
        }
      }
    }

    .content {
      .title {
        display: inline-block;
        font-size: $font-size-large;
        color: $color-theme;
        cursor: pointer;
      }

      .abstract {
        line-height: 2;
      }

      .meta {
        font-size: $font-size-small;
        .iconfont {
          font-size: 13px;
        }

        .read-btn {
          color: $color-sub-theme;
          font-size: 14px;
        }

        a, span {
          vertical-align middle
          line-height 18px
          margin-right: 5px;
          font-size: 13px;
          color: $color-text-d;
          b{
            font-weight 400
          }
        }
      }
    }
  }
}
</style>
