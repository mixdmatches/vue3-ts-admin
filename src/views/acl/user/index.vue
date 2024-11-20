<template>
  <el-card shadow="naver" style="margin-bottom: 10px">
    <el-form inline>
      <el-form-item label="用户名">
        <el-input placeholder="请你输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="naver">
    <el-button type="primary">添加用户</el-button>
    <el-button type="primary">批量删除</el-button>
    <el-table :data="userList" border style="margin: 10px 0px">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="用户名字"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="updataTime"
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="240px">
        <template>
          <el-button size="small" type="primary">分配角色</el-button>
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination layout="prev, pager, next" :total="50" /> -->
    <el-pagination
      background
      layout="prev, pager, next, -> ,total, sizes, jumper"
      :total="40"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserList } from "@/api/acl/user/index";
import type { User, UserResponseData } from "@/api/acl/user/type";
let page = ref(1);
let limit = ref(10);
let total = ref(10);
let userList = ref<User[]>([]);
const getHasUer = async () => {
  const res: UserResponseData = await getUserList(page.value, limit.value);
  console.log(res, "user");
  userList.value = res.data.records;
  total.value = res.total;
};
onMounted(() => {
  getHasUer();
});
</script>

<style scoped></style>
