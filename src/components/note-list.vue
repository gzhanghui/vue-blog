<template>
  <div class="list-wrapper ">
        <div class="list-container container">
          <ul class="note-list" v-if="noteList.length>0">
            <li :data-note-id="item.noteId" v-for="item in noteList" :key="item.noteId">
              <div class="line">
                <i class="icon icon-line"></i>
              </div>
              <div class="content">
                <h2 class="title" @click="goArticle(item.articleId)">{{item.title}}</h2>
                <p class="abstract">{{item.abstract}}</p>
                <div class="meta">
                  <a class="read-btn" @click="goArticle(item.articleId)" href="javascript:;">阅读全文</a>
                  <span>
                    <i class="icon icon-eye1"></i>
                    <b>{{item.read}}</b>
                  </span>
                  <span>
                    <i class="icon icon-message"></i>
                    <b>{{item.comments}}</b>
                  </span>
                  <span>
                    <i class="icon icon-like"></i>
                    <b>{{item.like}}</b>
                  </span>
                  <span class="time">
                    <i class="icon-time-circle icon"></i>
                    <b>{{item.time}}</b>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      
    
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
        this.noteList = res.data;
        console.log(res);
      });
    },
    goArticle(id) {
      this.$router.push({ name: "article", query: { id: id } });
    }
  },
  components: {}
};
</script>

<style   lang="stylus">
@import '~common/styles/variable.styl';

.list-wrapper {
  box-sizing: border-box;
  padding-top: 74px;

  .note-list {
    & > li {
      margin-bottom: 35px;
      color: $color-text-d;
      font-size: $font-size-medium;

      .line {
        .icon {
          color: $color-theme;
          font-size: 27px;
        }

        margin-bottom: 10px;
        // transform: scale(0.75);
      }
    }

    .content {
      .title {
        display: inline-block;
        font-size: $font-size-large;
        color: $color-theme;
        font-weight: 500;
        padding: 16px 0;
        cursor: pointer;
      }

      .abstract {
        line-height: 1.75;
      }

      .meta {
        padding-top: 15px;
        font-size: $font-size-small;

        .icon {
          font-size: 13px;
        }

        .read-btn {
          color: $color-sub-theme;
          font-size: $font-size-medium;
        }

        a, span {
          margin-right: 5px;
          font-size: 13px;
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
