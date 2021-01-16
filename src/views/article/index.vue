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
        <el-select v-model="channelId" placeholder="请选择频道">
           <el-option
          label="全部"
          :value="null"
          >
          </el-option>
          <el-option
          :label="channel.name"
          :value="channel.id"
          v-for="(channel, index) in channels"
          :key="index"
          >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          :disabled="loading"
          @click="loadeArticles(1)">查询</el-button>
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
      v-loading="loading"
      >
      <el-table-column
        prop="img"
        label="封面"
        width="180"
        >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            class="article-img"
            fit="cover"
            lazy
            >
            <div slot="placeholder" class="image-slot">
              加载中<span class="el-icon-picture-outline">...</span>
            </div>
          </el-image>
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
          <el-tag :type="articleStatus[scope.row.status].type"
          >{{ articleStatus[scope.row.status].text }}
          </el-tag>
          <!-- <el-tag
          >{{ articleStatus[scope.row.text] }}
          </el-tag> -->
          <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-if="scope.row.status === 2">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3">审核失败</el-tag>
          <el-tag v-if="scope.row.status === 4">已删除</el-tag> -->
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
          @click="onDeleteArticle(scope.row.id)"></el-button>
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
        :current-page.sync="page"
        @current-change="onCurrentChange"
        :disabled='loading'
        >
      </el-pagination>
    </el-card>
    </div>
</template>
<script>
import {
  getArticles,
  getArticleChannels,
  deleteArticle
} from '@/api/article'
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
      status: null,
      // 优化文章状态
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true,
      page: 1
    }
  },
  created () {
    this.loadeArticles(1)
    this.loadChannels()
  },
  methods: {
    loadeArticles (page = 1) {
      // console.log(pagesize)
      getArticles({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        thisbegin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        // 关闭加载中 loading
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadeArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      console.log(articleId)
      console.log(articleId.toString())
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        deleteArticle(articleId.toString()).then(res => {
          this.loadeArticles(this.page)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
