<template>
  <div class="comment-wrap">
    <div class="comment-block">
      <div class="textarea">
        <el-input
          @focus="showSend = true"
          v-model="content.content"
          type="textarea"
          autosize
          class="input"
          resize="none"
          style="border-radius:0"
          placeholder="请输入内容"
        ></el-input>
        <div class="emoji">
          <el-button type="text">
            <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M7.523 13.5h8.954c-.228 2.47-2.145 4-4.477 4-2.332 0-4.25-1.53-4.477-4zM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
          </el-button>
        </div>
      </div>
      <transition name="el-zoom-in-center">
        <div class="send" v-show="showSend">
          <el-button type="primary" @click="send">发送</el-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { comments } from "api/api";
export default {
  data() {
    return {
      showSend: false,
      content: {
        content: "这是一个测试"
      }
    };
  },
  methods: {
    inputFocus() {
      // this.showSend = true
    },
    send() {
      comments(this.content).then(res => {
        console.log(res);
      });
    }
  },

  components: {}
};
</script>

<style scoped lang="stylus">
.comment-block {
  display: flex;
}

.textarea {
  position: relative;
  flex: 1;
  margin-right: 28px;

  .emoji {
    position: absolute;
    right: 10px;
    bottom: -8px;
  }
}
</style>
