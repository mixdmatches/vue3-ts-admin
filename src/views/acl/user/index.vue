<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 10px">
      <el-form inline>
        <el-form-item label="用户名">
          <el-input v-model="keyWords" placeholder="请你输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyWords ? false : true"
            @click="search"
            >搜索</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="primary"
        @click="deleteSeletcUsers"
        :disabled="!selectIds.length ? true : false"
        >批量删除</el-button
      >
      <el-table
        :data="userList"
        border
        style="margin: 10px 0px"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名字"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
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
          <template #default="{ row }">
            <el-button
              icon="User"
              size="small"
              type="primary"
              @click="setRole(row)"
              >分配角色</el-button
            >
            <el-button
              icon="Edit"
              size="small"
              type="primary"
              @click="updataUser(row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              width="25px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="primary"
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
        @current-change="getHasUer"
        @size-change="getHasUer"
      />
      <!-- 添加更新 -->
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
        </template>
        <template #default>
          <el-form ref="formRef" :model="userParams" :rules="rules">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                v-model="userParams.username"
                placeholder="请输入用户姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="name">
              <el-input
                v-model="userParams.name"
                placeholder="请输入用户名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="!userParams.id"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="userParams.password"
                placeholder="请输入用户名称"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <!-- 用户某一个已有帐号进行已有的分配 -->
      <el-drawer v-model="drawer2">
        <template #header>
          <h4>分配角色（职位）</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input v-model="userParams.name" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-form-item label="职位列表">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @click="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="userRole"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="role in allRole"
                    :key="role"
                    :label="role"
                    :value="role"
                  >
                    {{ role.roleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer2 = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getUserList,
  reqAddOrUpdataUser,
  reqAllRole,
  reqSetUserRole,
  reqDeleteUser,
  reqDeleteUserBatch,
} from '@/api/acl/user'
import type {
  User,
  UserResponseData,
  RoleData,
  AllRoleResponseData,
  SetRoleData,
} from '@/types/user'
let page = ref(1)
let limit = ref(3)
let total = ref(0)
let userList = ref<User[]>([])
const getHasUer = async () => {
  const res: UserResponseData = await getUserList(
    page.value,
    limit.value,
    keyWords.value,
  )
  userList.value = res.data.records
  total.value = res.data.total
}

onMounted(() => {
  getHasUer()
})

const formRef = ref()

const settingStore = useLayOutSettingStore()
// 表单
const userParams = reactive<User>({
  name: '',
  username: '',
  password: '',
})

// 自定义校验规则对象
const ValidatorUsername = (
  _rules: Record<string, unknown>,
  value: string,
  callBack: (error?: Error) => void,
) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字长度至少5位'))
  }
}

// 明确参数类型，避免使用 any
const ValidatorName = (
  _rules: Record<string, unknown>,
  value: string,
  callBack: (error?: Error) => void,
) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称长度至少5位'))
  }
}

const ValidatorPassword = (
  _rules: Record<string, unknown>,
  value: string,
  callBack: (error?: Error) => void,
) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('密码长度不能小于6'))
  }
}
// 表单校验规则
const rules = ref({
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: ValidatorName,
    },
  ],
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: ValidatorUsername,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: ValidatorPassword,
    },
  ],
})

let drawer = ref(false)
const addUser = () => {
  //第一次点击时还没有form组件
  // 要获取更新后的dom，需要使用nextTick
  // 清除上一次错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
  drawer.value = true
  Object.assign(userParams, {
    name: '',
    username: '',
    password: '',
    id: '',
  })
}

const updataUser = (row: User) => {
  drawer.value = true
  // 收集数据
  Object.assign(userParams, row)
  // 清除上一次错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

const save = async () => {
  await formRef.value.validate()
  const res = await reqAddOrUpdataUser(userParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage.success(userParams.id ? '修改成功' : '添加成功')
    page.value = 1
    getHasUer()
  } else {
    ElMessage.error(userParams.id ? '修改失败' : '添加失败')
  }
}

//取消按钮回调
const cancel = () => {
  drawer.value = false
}

//控制分配角色的显示与隐藏
let drawer2 = ref(false)
// 分配角色按钮回调
const setRole = async (row: User) => {
  // 存储已有用户信息
  Object.assign(userParams, row)
  const res: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (res.code === 200) {
    // 存储全部的职位
    allRole.value = res.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = res.data.assignRoles
    drawer2.value = true
  }
}

//全选复选框收集数据
let checkAll = ref(false)
// 全部的职位
let allRole = ref<RoleData[]>([])
// 当前用户已有的职位
let userRole = ref<RoleData[]>([])
let isIndeterminate = ref(true)
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: RoleData[]) => {
  // const checkedCount = value.length
  // checkAll.value = checkedCount === allRole.value.length
  // isIndeterminate.value = !(checkedCount === allRole.value.length)
  const checkedCount = value.length
  const allCount = allRole.value.length
  checkAll.value = checkedCount === allCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < allCount
}

const confirmClick = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  const res = await reqSetUserRole(data)
  if (res.code === 200) {
    ElMessage.success('分配成功')
    drawer2.value = false
    getHasUer()
  } else {
    ElMessage.error('分配失败')
  }
}

// 删除单个用户按钮回调
const deleteUser = async (id: number) => {
  const res = await reqDeleteUser(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getHasUer()
  } else {
    ElMessage.error('删除失败')
  }
}

//准备一个数组存储批量删除的id
let selectIds = ref<User[]>([])
// 批量删除按钮回调
const selectChange = (newSelection: User[]) => {
  selectIds.value = newSelection
}

//批量删除用户按钮回调
const deleteSeletcUsers = async () => {
  let idList = selectIds.value.map((item) => item.id)
  const res = await reqDeleteUserBatch(idList as number[])
  if (res.code === 200) {
    ElMessage.success('批量删除成功')
    getHasUer()
  } else {
    ElMessage.error('批量删除失败')
  }
}

//搜索关键字
let keyWords = ref('')
const search = () => {
  getHasUer()
  keyWords.value = ''
}

const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
</script>

<style scoped></style>
