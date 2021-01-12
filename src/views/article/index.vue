<template>
    <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadeArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
       <!-- /数据筛选表单 -->
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <el-table
      :data="articles"
      style="width: 100%"
      stripe
      class="list-table"
      >
      <el-table-column
        prop="img"
        label="封面"
        width="180"
        >
        <template slot-scope="scope">
          <img :src="scope.row.cover.images[0]" alt="" class="article-img">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-if="scope.row.status === 2">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3">审核失败</el-tag>
          <el-tag v-if="scope.row.status === 4">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          circle
          icon="el-icon-edit"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
      class="pagination"
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        @current-change="loadeArticles"
        >
      </el-pagination>
    </el-card>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
export default {
  name: 'articleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      totalCount: 0,
      pageSize: 10,
      status: null
    }
  },
  created () {
    this.loadeArticles()
  },
  methods: {
    loadeArticles (page = 1) {
      // console.log(pagesize)
      getArticles({
        page: page,
        per_page: this.pageSize,
        status: this.status
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    }
  }
}
</script>
<style lang="less" scoped>
.article-container {
  text-align: left;
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.pagination {
  float: right;
  margin-bottom: 22px;
}
.article-img {
    width: 100px;
    background-size: cover;
}
</style>
