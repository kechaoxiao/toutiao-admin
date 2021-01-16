<template>
    <div class="image-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
           <!-- 面包屑路径导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="padding-bottom: 20px;">
          <el-radio-group v-model="collect" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 素材列表 -->
        <el-row :gutter="10">
          <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index"
          >
            <el-image
              style="height: 100px"
              :src="img.url"
              fit="cover"
            ></el-image>
          </el-col>
        </el-row>
        <!-- /素材列表 -->
      </el-card>
    </div>
</template>
<script>
import { getImages } from '@/api/image'
export default {
  name: 'imageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect: false,
      images: []
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
