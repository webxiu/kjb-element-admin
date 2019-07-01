<template>
  <div>
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" header-align="center">
      <el-table-column width="50" header-align="center">
        <template slot-scope="{row,$index}">
          <span>{{$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="300" header-align="center">
        <template slot-scope="{row,$index}">
          <input class="edit-cell" v-if="showEdit[$index]" v-model="row.name">
          <span v-if="!showEdit[$index]">{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="address" width="300" header-align="center">
        <template slot-scope="{row,$index}">
          <input class="edit-cell" v-if="showEdit[$index]" v-model="row.address">
          <span v-if="!showEdit[$index]">{{row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="date" width="300" header-align="center">
        <template slot-scope="{row,$index}">
          <input class="edit-cell" v-if="showEdit[$index]" v-model="row.date">
          <span v-if="!showEdit[$index]">{{row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" header-align="center">
        <template slot-scope="{row,$index}">
          <el-button
            type="text"
            size="small"
            @click.native="handleUpdate($index, row)"
            v-if="showBtn[$index]"
          >更新</el-button>
          <el-button
            type="text"
            size="small"
            @click.native="handleCancel($index, row)"
            v-if="showBtn[$index]"
          >取消</el-button>

          <el-button
            type="text"
            size="small"
            @click.native="handleEdit($index, row)"
            v-if="!showBtn[$index]"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click.native="handleDelete($index, row)"
            v-if="!showBtn[$index]"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showEdit: [], //显示编辑框
      showBtn: [],
      showBtnOrdinary: true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    // for (var i = 0; i < 100; i++) {
    //   this.showEdit[i] = false;
    //   this.showBtn[i] = false;
    //   this.$set(this.showEdit[i], false);
    //   this.$set(this.showBtn[i], false);
    // }
  },
  methods: {
    //点击编辑
    handleEdit(index, row) {
      console.log(77,index, row);

        this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
    },
    //点击删除
    handleDelete(index, row) {},

    //点击更新
    handleUpdate(formName) {

    },
    //取消编辑
    handleCancel(index, row) {
      //   this.getContentList();
      //   this.getContentList();
      this.showEdit[index] = false;
      this.showBtn[index] = false;
      this.$set(this.showEdit, row, false);
      this.$set(this.showBtn, row, false);
      console.log(this.showEdit[index],index, row);
    },
  }
};
</script>
<style scoped>
</style>


