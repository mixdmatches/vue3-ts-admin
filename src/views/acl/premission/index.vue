<template>
  <el-table
    :data="permissionList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column label="名称" prop="name" />
    <el-table-column label="权限值" prop="code" />
    <el-table-column label="修改时间" prop="updateTime" />
    <el-table-column label="操作">
      <template #="{ row }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.level === 4 ? true : false"
          @click="handleAdd(row)"
          >添加{{ row.level === 3 ? "功能" : "菜单" }}</el-button
        >
        <el-button
          type="primary"
          size="small"
          :disabled="row.level === 1 ? true : false"
          @click="handleEdit(row)"
          >编辑</el-button
        >
        <el-popconfirm
          @confirm="handleDelete(row.id)"
          :title="`确认删除${row.name}吗？`"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level === 1 ? true : false"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    :title="menuParams.id ? '更新菜单' : '添加菜单'"
    width="500"
  >
    <el-form :model="menuParams">
      <el-form-item label="菜单名">
        <el-input
          placeholder="请输入菜单名"
          v-model="menuParams.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input
          placeholder="请输入权限值"
          v-model="menuParams.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqMenuList, reqAddOrUpdateMenu, reqDeleteMenu } from "@/api/acl/menu";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type {
  premissionResponseData,
  premissionList,
  premission,
  MenuParams,
} from "@/api/acl/menu/type";

// 菜单列表
let permissionList = ref<premissionList>([]);

// 页面渲染获取菜单列表
onMounted(() => {
  getHasPermission();
});

// 获取菜单列表
const getHasPermission = async () => {
  const res: premissionResponseData = await reqMenuList();
  if (res.code === 200) {
    permissionList.value = res.data;
  }
};

// 携带的参数
const menuParams = ref<MenuParams>({
  name: "",
  code: "",
  pid: 0,
  level: 1,
});

// 控制对话框显示与隐藏
const dialogVisible = ref(false);
// 添加菜单按钮
const handleAdd = (row: premission) => {
  Object.assign(menuParams.value, {
    id: 0,
    name: "",
    code: "",
    pid: 0,
    level: 1,
  });
  // 收集新增菜单的level
  menuParams.value.level = row.level + 1;
  // 给谁新增子菜单
  menuParams.value.pid = row.id as number;
  dialogVisible.value = true;
};
// 编辑菜单按钮
const handleEdit = (row: premission) => {
  // 收集数据,将row的所有属性拷贝到menuParams中
  Object.assign(menuParams.value, row);
  dialogVisible.value = true;
};
// 确定按钮回调
const save = async () => {
  // 发请求
  const res = await reqAddOrUpdateMenu(menuParams.value);
  console.log(res);
  if (res.code === 200) {
    getHasPermission();
    ElMessage.success(menuParams.value.id ? "更新成功" : "添加成功");
    dialogVisible.value = false;
  }
};
// 删除菜单
const handleDelete = async (id: number) => {
  // 发请求
  const res = await reqDeleteMenu(id);
  if (res.code === 200) {
    getHasPermission();
    ElMessage.success("删除成功");
  }
};
</script>

<style scoped></style>
