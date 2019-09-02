<template>
  <div class="aritcle-wrapper container" style="margin-bottom:200px">
        <div v-html="articleHtml" ref="content" class="content "></div>
       <comment/>

  </div>
</template>

<script type="text/ecmascript-6">
import hljs from "highlight.js";

/*
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/xml";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", html); */

import { getArticle } from "api/api";
import Comment from "components/comment.vue";
export default {
  data() {
    return {
      articleHtml: ""
    };
  },
  mounted() {
    this._getArticle();
  },
  components:{
    Comment
  },
  methods: {
    _getArticle() {
      getArticle(this.$route.query.id).then(res => {
        this.articleHtml = res.data;
        this.$nextTick(() => {
          let blocks = this.$refs.content.querySelectorAll("pre code");
          blocks.forEach(block => {
            hljs.highlightBlock(block);
          });
        });
      });
    }
  }
};
</script>

<style   lang="stylus">
/*  */
@import '~highlight.js/styles/atom-one-dark.css';
.aritcle-wrapper {
  padding-top 56px
  .note .post {
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 40px;
    width: 620px;
  }

  .content .title {
    word-break: break-word !important;
    word-break: break-all;
    margin: 20px  0;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
  }

  .content .follow, .content .follow-cancel, .content .follow-each, .content .following, .content .user-follow-button-header {
    padding: 0 7px 0 5px;
    font-size: 12px;
  }

  .content .author .meta {
    margin-top: 5px;
    font-size: 12px;
    color: #969696;
  }

  .content .author .meta span {
    padding-right: 5px;
  }

  .content .author .edit {
    float: right;
    margin-top: 8px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #dcdcdc;
    color: #9b9b9b;
    line-height: 30px;
    border-radius: 50px;
  }

  .content .author .edit:hover {
    background-color: hsla(0, 0%, 71%, 0.1);
  }

  .content .show-content {
    color: #2f2f2f;
    word-break: break-word !important;
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }

  .content .show-content p {
    margin: 0 0 25px;
  }

  .content .show-content blockquote h1:last-child, .content .show-content blockquote h2:last-child, .content .show-content blockquote h3:last-child, .content .show-content blockquote h4:last-child, .content .show-content blockquote h5:last-child, .content .show-content blockquote h6:last-child, .content .show-content blockquote li:last-child, .content .show-content blockquote ol:last-child, .content .show-content blockquote p:last-child, .content .show-content blockquote ul:last-child {
    margin-bottom: 0;
  }

  .content .show-content .video-package .video-description p {
    margin: 0;
  }

  .content .show-content li p {
    overflow: visible;
  }

  .content .show-content a {
    color: #3194d0;
  }

  .content .show-content a:hover {
    color: #3194d0;
    text-decoration: underline;
  }

  .content .show-content a.active, .content .show-content a:active, .content .show-content a:focus {
    color: #3194d0;
  }

  .content .show-content a.disabled, .content .show-content a.disabled.active, .content .show-content a.disabled:active, .content .show-content a.disabled:focus, .content .show-content a.disabled:hover, .content .show-content a[disabled], .content .show-content a[disabled].active, .content .show-content a[disabled]:active, .content .show-content a[disabled]:focus, .content .show-content a[disabled]:hover {
    cursor: not-allowed;
  }

  .content .show-content ol, .content .show-content p, .content .show-content ul {
    word-break: break-word !important;
    word-break: break-all;
  }

  .content .show-content hr {
    margin: 0 0 20px;
    border-top: 1px solid #ddd;
  }

  .content .show-content h1, .content .show-content h2, .content .show-content h3, .content .show-content h4, .content .show-content h5, .content .show-content h6 {
    margin: 0 0 15px;
    font-weight: 700;
    color: #2f2f2f;
    line-height: 1.7;
    text-rendering: optimizelegibility;
  }

  .content .show-content h1 {
    font-size: 26px;
  }

  .content .show-content h2 {
    font-size: 24px;
  }

  .content .show-content h3 {
    font-size: 22px;
  }

  .content .show-content h4 {
    font-size: 20px;
  }

  .content .show-content h5 {
    font-size: 18px;
  }

  .content .show-content h6 {
    font-size: 16px;
  }

  .content .show-content img {
    max-width: 100%;
  }

  .content .show-content blockquote {
    padding: 20px;
    margin-bottom: 25px;
    background-color: #f7f7f7;
    border-left: 6px solid #b4b4b4;
    word-break: break-word !important;
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
  }

  .content .show-content blockquote p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }

  .content .show-content blockquote .image-package {
    width: auto;
    margin-left: 0;
  }

  .content .show-content ol, .content .show-content ul {
    padding: 0;
    margin: -5px 0 20px 20px;
  }

  .content .show-content ol li, .content .show-content ul li {
    line-height: 30px;
  }

  .content .show-content ol li ol, .content .show-content ol li ul, .content .show-content ul li ol, .content .show-content ul li ul {
    margin-top: 15px;
  }

  .content .show-content ol .image-package, .content .show-content ul .image-package {
    width: auto !important;
    margin-left: 0 !important;
  }

  .content .show-content pre {
    margin-bottom: 20px;
    font-size: 13px;
    word-wrap: normal;
    word-break: break-word !important;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    border-radius: 4px;
  }

  .content .show-content pre code {
    padding: 12px;
    white-space: pre;
  }

  .content .show-content code {
    padding: 2px 4px;
    border: none;
    font-size: 13px;
    white-space: pre-wrap;
    vertical-align: middle;
  }

  .content .show-content table {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-left: none;
    word-break: normal;
  }

  .content .show-content table tr:nth-of-type(2n) {
    background-color: hsla(0, 0%, 71%, 0.1);
  }

  .content .show-content table thead th {
    vertical-align: middle;
    text-align: inherit;
  }

  .content .show-content table td, .content .show-content table th {
    padding: 8px;
    border: 1px solid #ddd;
    line-height: 20px;
    vertical-align: middle;
  }

  .content .show-content table th {
    font-weight: 700;
  }

  .content .show-content table .image-package {
    width: auto;
    margin-left: 0;
  }

  .content .show-content .image-package .image-container {
    z-index: 100;
    position: relative;
    background-color: #eee;
    transition: background-color 0.1s linear;
    margin: 0 auto;
  }

  .content .show-content .image-package .image-container .image-container-fill {
    z-index: 50;
  }

  .content .show-content .image-package .image-container .image-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .content .show-content .image-package .image-container .image-view img.image-loading {
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0.3;
  }

  .content .show-content .image-package .image-container .image-view img {
    display: block;
    transition: all 0.15s linear;
    z-index: 100;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }

  .content .show-content .image-package {
    padding-bottom: 25px;
    width: 700px;
    margin-left: -40px;
    text-align: center;
  }

  .content .show-content .image-package img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border: 0;
    cursor: -webkit-zoom-in;
    transition: all 0.25s ease-in-out;
  }

  .content .show-content .image-package .image-caption {
    min-width: 20%;
    max-width: 80%;
    min-height: 22px;
    display: inline-block;
    padding: 10px;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
    font-size: 14px;
    color: #969696;
    line-height: 1.7;
  }

  .content .show-content .image-package .image-caption:empty {
    display: none;
  }

  .content .show-content .video-package {
    position: relative;
    margin: -20px auto 20px;
    text-align: center;
  }

  .content .show-content .video-package .video-placeholder-area {
    position: relative;
    display: inline-block;
    height: 110px;
    padding: 10px;
    padding-left: 120px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    background-color: hsla(0, 0%, 71%, 0.1);
    text-align: left;
    cursor: pointer;
  }

  .content .show-content .video-package .video-placeholder-area:after {
    content: ' ';
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    width: 110px;
    height: 110px;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: url('//cdn2.jianshu.io/assets/common/play-btn-c4bc06b9dfe063495b6b8277b14bc5c3.png'); // cdn2.jianshu.io/assets/common/play-btn-c4bc06b9dfe063495b6b8277b14bc5c3.png);
    background-position: 30px;
    background-size: 50px;
    background-repeat: no-repeat;
    transition: all 0.1s linear;
  }

  .content .show-content .video-package .video-placeholder-area:hover:after {
    background-color: transparent;
  }

  .content .show-content .video-package .video-placeholder-area .video-cover {
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    width: 110px;
    height: 110px;
    opacity: 0.8;
    transition: opacity 0.1s linear;
  }

  .content .show-content .video-package .video-description {
    min-width: 20%;
    min-height: 22px;
    display: none;
    padding: 10px;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
    font-size: 13px;
    color: #999;
    line-height: 1.7;
  }

  .content .show-content .video-package .video-description:empty {
    display: none;
  }

  .content .show-content .video-package .video-close-button, .content .show-content .video-package .video-provider-button {
    text-align: left;
    font-size: 14px;
    padding: 0;
    line-height: 14px;
    cursor: pointer;
    transition: opacity 0.1s linear;
  }

  .content .show-content .video-package .video-close-button i, .content .show-content .video-package .video-provider-button i {
    position: relative;
    top: 1px;
  }

  .content .show-content .video-package .video-provider-button {
    float: right;
  }

  .content .show-content-paid {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
