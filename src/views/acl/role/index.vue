<template>
  <el-card shadow="naver" style="margin-bottom: 10px">
    <el-form inline>
      <el-form-item label="职位搜索">
        <el-input v-model="keyWord" placeholder="请你输入职位关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="naver">
    <el-button type="primary" @click="addRole">添加职位</el-button>
    <el-table :data="roleList" border style="margin: 10px 0px">
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="roleName"
        label="职位名称"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" width="340px">
        <template #="{ row }">
          <el-button icon="User" size="small" @click="setPremisstion(row)"
            >分配权限</el-button
          >
          <el-button
            icon="Edit"
            size="small"
            type="primary"
            @click="editRole(row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            width="25px"
            @confirm="deleteRole(row)"
          >
            <template #reference>
              <el-button icon="Delete" size="small" type="danger"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination layout="prev, pager, next" :total="50" /> -->
    <el-pagination
      background
      layout="prev, pager, next, -> ,total, sizes, jumper"
      :total="total"
      :page-sizes="[3, 5, 7]"
      v-model:current-page="page"
      v-model:page-size="limit"
      @current-change="getAllRole"
      @size-change="getAllRole"
    />
    <!-- 新增或编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加职位" width="500">
      <el-form :model="role" ref="formRef" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            v-model="role.roleName"
            placeholder="请输入职位名称"
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
    <!-- 分配权限的弹窗 -->
    <el-drawer v-model="dialogVisible1" title="分配权限" width="500">
      <el-tree
        ref="tree"
        style="max-width: 600px"
        :data="menuArr"
        show-checkbox
        node-key="id"
        :default-checked-keys="seletedArr"
        :props="defaultProps"
        default-expand-all
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handler"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqGetRoles,
  reqAddOrEditRole,
  reqDeleteRole,
  reqGetPermission,
  reqAssignPermission,
} from '@/api/acl/role'
import type { RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
let page = ref(1)
let limit = ref(3)
let total = ref(0)
let roleList = ref<RoleData[]>([])
// form表单实例
let formRef = ref()
// 树形控件的实例
let tree = ref()
// 弹窗
let dialogVisible = ref(false)
let dialogVisible1 = ref(false)
// 一个职位
let role = reactive<RoleData>({
  createTime: '',
  updateTime: '',
  roleName: '',
  remark: null,
})

let keyWord = ref('')

// 验证规则
const validateRoleName = (_rules: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('请输入至少两个字符'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', Validator: validateRoleName }],
}

//获取已有的所有职位
const getAllRole = async () => {
  const res = await reqGetRoles(page.value, limit.value, keyWord.value)
  roleList.value = res.data.records
  total.value = res.data.total
}

onMounted(() => {
  getAllRole()
})

// 添加职位
const addRole = async () => {
  //清除校验错误信息规则
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
  dialogVisible.value = true
  role.roleName = ''
  Object.assign(role, {
    id: null,
    createTime: '',
    updateTime: '',
    roleName: '',
    remark: null,
  })
}

// 编辑按钮回调
const editRole = (row: RoleData) => {
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
  dialogVisible.value = true
  Object.assign(role, row)
}

//保存
const save = async () => {
  await formRef.value.validate()
  const res = await reqAddOrEditRole(role)
  if (res.code === 200) {
    ElMessage.success(role.id ? '修改成功' : '添加成功')
    getAllRole()
    dialogVisible.value = false
  }
}

// 删除按钮回调
const deleteRole = async (row: RoleData) => {
  const res = await reqDeleteRole(row.id as number)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAllRole()
  } else {
    ElMessage.error(res.message)
  }
}

// 搜索按钮回调
const search = () => {
  getAllRole()
}

// 重置按钮回调
const reset = () => {
  keyWord.value = ''
  getAllRole()
}

// 收集已选择的权限数组
let seletedArr = ref<number[]>([])

// 定义数组存储用户权限的数据
let menuArr = ref<MenuList[]>([])
// 分配权限的按钮回调
const setPremisstion = async (row: RoleData) => {
  dialogVisible1.value = true
  Object.assign(role, row)
  const res: MenuResponseData = await reqGetPermission(role.id as number)
  if (res.code === 200) {
    menuArr.value = res.data
    filterSelectArr(menuArr.value, seletedArr.value)
  }
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
}

// 抽屉确定按钮的回调
const handler = async () => {
  // 职位ID
  const roleId = role.id as number
  // 选中节点的ID
  let arr = tree.value.getCheckedKeys()
  // 半选的id
  let arr1 = tree.value.getHalfCheckedKeys()
  let premissionId = arr.concat(arr1)
  // 下发权限
  const res = await reqAssignPermission(roleId, premissionId)
  if (res.code === 200) {
    dialogVisible1.value = false
    ElMessage.success('分配权限成功')
    // 页面刷新
    window.location.reload()
  }
}

// 树形控件的数据
const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>

<style scoped></style>
