<template>
    <div>
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo nav-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        collapse-transition:fasle
        >
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title" class="index-right">首页</span>
            </el-menu-item>
            <el-menu-item index="/article">
                <i class="el-icon-document"></i>
                <span slot="title">内容管理</span>
                </el-menu-item>
            <el-menu-item index="/image">
                <i class="iconfont iconimage"></i>
                <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/publish">
                <i class="iconfont iconpublish"></i>
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="iconfont iconcomment"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
                <i class="el-icon-setting"></i>
                <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/settings">
                <i class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
    //   isCollapse: true
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu {
    height: 100%;
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
  .index-right {
      margin-right:30px
  }
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
