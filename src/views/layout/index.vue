<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <app-aside
            class="aside-menu"
            :is-collapse='isCollapse'
            />
        </el-aside>
    <el-container>
        <el-header class="header">
            <div>
                <i
                :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
                }"
                @click="isCollapse = !isCollapse"
                ></i>
                <span>江苏传智播客科技教育有限公司</span>
            </div>
            <el-dropdown>
            <div class="avatar-wrap">
                <img class="avatar" :src="userdata.photo">
                <span>{{ userdata.name }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="removeUser">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-main class="main">
            <!-- 子路由出口 -->
            <router-view />
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
import AppAside from '@/views/layout/components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      userdata: {},
      isCollapse: false // 侧边菜单栏的展示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.userdata = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    removeUser () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  }
.aside {
    background-color: #d3dce6;
    .aside-menu {
        height: 100%;
    }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
.main {
    background-color: #e9eef3;
}
</style>
