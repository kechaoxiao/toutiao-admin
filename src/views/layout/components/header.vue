<template>
    <div class="header-container">
        <div>
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
        <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
  name: 'Appheader',
  components: {},
  props: {}
}
</script>
<style lang="less" scoped>
.header-container {
    display: flex;
    justify-content: space-between;
}
</style>
