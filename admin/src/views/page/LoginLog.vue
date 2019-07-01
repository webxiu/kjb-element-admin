<template>
  <section>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="k_id" label="id" width="80"></el-table-column>
      <el-table-column prop="k_user" label="操作帐号" width="120"></el-table-column>
      <el-table-column prop="k_type" label="类型" width="120"></el-table-column>
      <el-table-column prop="k_typeId" label="内容ID"></el-table-column>
      <el-table-column prop="k_handleType" label="操作内容"></el-table-column>
      <el-table-column prop="k_ip" label="IP地址"></el-table-column>
      <el-table-column prop="k_date" label="操作时间"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import { requestLogs } from "@/api/api";
export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      currentPage: 1,
      tableData: []
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page;
      this.getLogs();
    },
    handleSizeChange(size) {
      this.size = size;
      this.getLogs();
    },
    getLogs() {
      requestLogs({ page: this.page, size: this.size }).then(res => {
        this.tableData = res.logInfo;
        this.total = res.count;
        // console.log("获取日志:", res);
      });
    }
  }
};
</script>