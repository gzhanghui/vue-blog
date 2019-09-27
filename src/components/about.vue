<template>
  <div class="about-wrapper" style="padding-top: 80px">
    <div class="about-bg-wrap">
      <div class="container" >
        <div class="row" >
          <div class="col-md-4" >
            <div class="about-bg" >
              <div class="about-bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
          <div class="about-content-wrap">
            <div class="introduce">
              <h2 class="author">李白</h2>
              <p class="desc">我，李太白，一身才华，是来长安干大事的，为何被你当做一个供人娱乐的文人。” “嗨，生活不称意呀，化为一座又一座大山挡我去路”，咕噜咕噜，又是一口酒。
                他斜眼瞥了下险峻的山路，举头望了望高耸的石峰，仰头一饮，系好酒壶，扎起长衫，拔足登起了山。
                他就像那只大鹏鸟，迎风扶摇直上，九万里又如何？险峻奇峰又怎样？他，李太白，压根不放眼里，乘起风，一溜烟儿就翻过去了</p>
            </div>
            <div class="contact">
              <h4 class="title">联系我</h4>
              <el-form ref="form" class="form" :model="form" label-width="0">
                <el-form-item>
                  <el-input v-model="form.name" style="width: 300px" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="form.name" style="width: 300px" placeholder="电话/邮箱"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input type="textarea" v-model="form.desc" placeholder="留言"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">发送</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          desc: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>

<style scoped lang="stylus">
  .about-bg-wrap
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index -1
    div
      height 100%
    .about-bg
      width 100%
      max-width 300px
      position relative
      background url(../assets/ziwei.jpg) no-repeat;
      background-size cover
    .about-bg-white
      width 50px
      position absolute
      top 120px
      right 0
      z-index 2
      background rgba(255, 255, 255, 1)

  .about-content-wrap
    padding-top 60px
    background #ffffff
    .introduce
      .author
        padding-bottom 1px
        display inline-block
      .desc
        line-height 1.8
        margin 1em 0
  .contact
    padding-top 10px
    .title
      display inline-block
    .form
      margin-top 10px
</style>
