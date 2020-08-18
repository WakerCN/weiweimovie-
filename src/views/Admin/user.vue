<template>
  <div>
    <!-- 用户表格 begin -->
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="userHead" label="用户头像">
        <template slot-scope="scope">
          <img class="userHead" :src="scope.row.userHead">
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">
            {{ scope.row.isFreeze ? '已冻结' : '未冻结' }}</el-button>
          <el-button type="danger" size="small" @click="handleToDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 用户表格 end -->
    <!-- 分页器 begin -->
    <el-pagination class="page" background layout="prev, pager, next" :total="tableData.length" :page-size="pageSize"
      :current-page.sync="curPage">
    </el-pagination>
    <!-- 分页器 end -->
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'user',

  data () {
    return {
      tableData: [],
      pageSize: 6,
      curPage: 1
    }
  },

  computed: {
    nowTableData () {
      return this.tableData.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize) || []
    }
  },

  mounted () {
    Axios.get('/ajax2/admin/userList').then((res) => {
      const status = res.data.status
      if (status === 0) {
        this.tableData = res.data.data.userList
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  methods: {
    /** 改变账号冻结状态 */
    handleToFreeze (index, row) {
      Axios.post('/ajax2/admin/updateFreeze', {
        email: row.email,
        isFreeze: !row.isFreeze
      }).then((res) => {
        const status = res.data.status
        if (status === 0) {
          this.$alert(row.email + ' 冻结操作成功', '信息', {
            confirmButtonText: '确定',
            callback: action => {
              this.tableData[index].isFreeze = !row.isFreeze
            }
          })
        } else {
          this.$alert(row.email + ' 冻结操作失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 删除账号 */
    handleToDelete (index, row) {
      Axios.post('/ajax2/admin/deleteUser', {
        email: row.email
      }).then((res) => {
        const status = res.data.status
        if (status === 0) {
          this.$alert(row.email + ' 删除成功', '信息', {
            confirmButtonText: '确定',
            callback: action => {
              this.tableData.splice(index, 1)
            }
          })
        } else {
          this.$alert(row.email + '删除失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.page {
  margin-top: 20px;
}

.userHead {
  width: 50px;
  height: 50px;
}
</style>
