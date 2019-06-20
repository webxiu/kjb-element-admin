<template>
  <section style="padding: 0 15px;">
    <!-- 表格头部 -->
    <div class="table-info clearfix">
      <span>用户表单</span>
      <div style="float: right; padding: 3px 0" type="text">
        <el-button @click.stop="on_refresh" size="small">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      style="width: 100%;height:100%;border:1px solid #ebeef5;"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 选择框 -->
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->

      <el-table-column label="用户名" prop="w_username">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_username"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span v-if="!isEdit[scope.$index]">{{scope.row.w_username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="w_phone">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_phone"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span v-if="!isEdit[scope.$index]">{{scope.row.w_phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="w_order_num">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_order_num"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span v-if="!isEdit[scope.$index]">{{scope.row.w_order_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="w_wl_status">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_wl_status"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span v-if="!isEdit[scope.$index]">{{scope.row.w_wl_status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="w_address">
        <template slot-scope="scope">
          <el-input
            type="textarea"
            :rows="4"
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_address"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span v-if="!isEdit[scope.$index]">{{scope.row.w_address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞" prop="w_praise">
        <template slot-scope="scope">
          <el-input
            type="textarea"
            :rows="4"
            v-if="isEdit[scope.$index]"
            size="small"
            v-model="scope.row.w_praise"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span
            v-if="!isEdit[scope.$index]"
            @click="handlePraise(scope.$index, scope.row)"
            style="cursor: pointer;"
          >{{scope.row.w_praise}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="w_import_date"></el-table-column>
      <!-- <el-table-column label="修改时间" prop="w_modify_date"></el-table-column> -->

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            @keyup.native="inputHandle(scope)"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="table-info clearfix">
      <!--批量删除-->
      <el-button type="danger" size="small" :disabled="this.tableData.length===0" class="fl">批量删除</el-button>

      <!-- 分页显示 -->
      <div style="float: right; padding: 3px 0" type="text">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5,10, 20, 50, 100,200]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 添加弹框 -->
    <el-dialog title="添加" :visible.sync="dialogAdd" width="40%">
      <el-form :model="addForm" label-width="80px" :rules="pubFormRules" ref="addForm">
        <el-form-item label="用户名" prop="w_username">
          <el-input v-model="addForm.w_username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="w_phone">
          <el-input v-model="addForm.w_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单号" prop="w_order_num">
          <el-input v-model="addForm.w_order_num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="w_wl_status">
          <el-input v-model="addForm.w_wl_status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="w_address">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addForm.w_address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogEdit" width="40%" :before-close="handleClose">
      <el-form :model="editForm" label-width="80px" :rules="pubFormRules" ref="editForm">
        <el-form-item label="用户名" prop="w_username">
          <el-input v-model="editForm.w_username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="w_phone">
          <el-input v-model="editForm.w_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单号" prop="w_order_num">
          <el-input v-model="editForm.w_order_num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="w_wl_status">
          <el-input v-model="editForm.w_wl_status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="w_address">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editForm.w_address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit(editForm)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog title="删除确认" :visible.sync="dialogDelete" width="30%">
      <span>请确认是否删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import {
  requestOrder,
  requestEdit,
  requestDelete,
  requestAdd,
  requestPraise
} from "@/api/api";
export default {
  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      editInput: "",
      currentPage1: 1, //分页当前页
      page: 1, //显示页数
      size: 5, //显示条数
      total: 0, //显示条数
      loading: false, //表格加载
      tableData: [], //表格数据
      search: "", // 搜索内同
      timer: null, // 搜索请求时间
      isEdit: [], // 是否编辑
      deleteId: "", // 删除ID
      navs: [
        //导航菜单
        { title: "个人信息" },
        { title: "修改密码" },
        {
          title: "我的收益",
          dropDown: [
            { childItem: "推广收益" },
            { childItem: "在线打赏" },
            { childItem: "发表文章" }
          ]
        },
        { title: "好友中心" }
      ],
      //编辑表单验证(共用)
      pubFormRules: {
        w_username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5]{2}/,
            message: "请输入中文,长度不少于2位",
            trigger: "blur"
          }
        ],
        w_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|4|5|7|8|][0-9]\d{8}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        w_order_num: [
          { required: true, message: "请输入订单号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]{3,6}\d{10,15}$/,
            message: "以字母开头至少3-6位,以数字结尾至少10-15位",
            trigger: "blur"
          }
        ],
        w_wl_status: [
          { required: true, message: "请输入状态", trigger: "blur" }
        ],
        w_address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      },
      //添加表单
      addForm: {
        w_username: "",
        w_phone: "",
        w_order_num: "",
        w_wl_status: "",
        w_address: ""
      },
      //编辑表单
      editForm: {
        w_username: "",
        w_phone: "",
        w_order_num: "",
        w_wl_status: "",
        w_address: ""
      }
    };
  },

  created() {
    this.$store.commit("setNav", this.navs);
    //请求表格数据
    this.getTableData();
  },
  methods: {
    //刷新
    on_refresh() {
      alert("刷新");
    },
    //添加弹窗
    handleAdd() {
      this.dialogAdd = true;
    },
    //添加提交
    addSubmit() {
      let _this = this;
      _this.$refs.addForm.validate(validate => {
        if (validate) {
          requestAdd(this.addForm).then(res => {
            if (res.affectedRows) {
              this.$message({ message: "添加成功!", type: "success" });
              this.dialogAdd = false;
              //更新数据
              this.getTableData();
            } else {
              this.$message({ message: "添加失败,请稍后再试!", type: "error" });
              this.dialogAdd = true;
            }
          });
        } else {
          _this.$message({ message: "您的表单填写不正确!", type: "error" });
        }
      });
    },
    // 修改编辑
    handleEdit(index, row) {
      // this.isEdit[index] = this.isEdit[index] == true ? false : true;
      // this.isEdit = [this.isEdit[index]];
      // console.log(index, row);
      this.editForm = Object.assign({}, row); //对象深拷贝
      this.dialogEdit = true;
    },
    //提交编辑表单
    editSubmit() {
      let _this = this;
      _this.$refs.editForm.validate(validate => {
        console.log(77, validate);
        if (validate) {
          requestEdit(_this.editForm).then(result => {
            // console.log(result)
            if (result.affectedRows) {
              _this.$message({
                message: result.affectedRows + "条数据已更新",
                type: "success"
              });
              this.dialogEdit = false;
              //更新数据
              this.getTableData();
            } else {
              _this.$message({ message: "操作失败", type: "error" });
            }
          });
        }
      });
    },

    // 删除
    handleDelete(index, row) {
      //删除索引
      this.deleteId = row.w_id;
      console.log(index, row);
      this.dialogDelete = true;
    },
    //删除操作
    deleteSubmit() {
      requestDelete({ deleteId: this.deleteId }).then(res => {
        if (res.affectedRows) {
          this.$message({ message: "删除成功", type: "success" });
          this.dialogDelete = false;
          //更新数据
          this.getTableData();
        }
      });
    },
    //搜索
    inputHandle(index) {
      //避免多次请求,先清除定时器再开启
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getTableData();
        console.log("搜索", this.search);
      }, 1000);
    },
    //请求数据
    getTableData() {
      this.loading = true;
      requestOrder({
        page: this.page,
        size: this.size,
        search: this.search
      }).then(res => {
        console.log("查询结果", res.userInfo);
        this.tableData = res.userInfo;
        this.total = res.count;
        this.loading = false;
      });
    },
    //分页
    handleSizeChange(size) {
      this.size = size;
      this.getTableData();

      console.log("改变页码" + size);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getTableData();
      console.log("点击下一页" + page);
    },
    //弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //点赞
    handlePraise(index, row) {
      // console.log(index,row)
      // var date = new Date("2019-6-20 16:07:59").getTime();
      // if (new Date(date).toDateString() === new Date().toDateString()) {
      //   console.log("你已经点赞过了");
      // } else {
      //   console.log("还可以以点");
      // }

      // 请求后台判断是否已经点过赞 当日点赞有效,点过需明天
      requestPraise({
        zan: row.w_praise,
        date: row.w_praise_date,
        id: row.w_id
      }).then(res => {
        if (res.serverStatus == 0) {
          //已点过赞
          this.$message({
            message: res.msg,
            type: "error"
          });
        } else if (res.serverStatus == 2) {
          //没点过赞
          this.getTableData(); //更新数据
          this.$message({
            message: "点赞成功",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.table-info {
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
}
.el-table__body .el-button + .el-button {
  margin-top: 10px;
}
.el-dialog {
  min-width: 200px !important;
}
</style>


