<template>
  <el-card shadow="naver">
    <!-- 添加按钮 -->
    <el-button type="primary" icon="Plus" @click="addTrademark"
      >添加品牌</el-button
    >
    <!-- 表格 -->
    <el-table :data="trademarkList" style="margin: 10px 0" border>
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <!-- table-column:默认展示数据用div -->
      <!-- 如果div不满足需求，用插槽 -->
      <el-table-column prop="tmName" label="品牌名称">
        <template #="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="图片消失了ʕ  •ᴥ•ʔ……" height="35px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editTrademark(row)"
          ></el-button>
          <el-popconfirm
            icon="Delete"
            icon-color="black"
            :title="`确定删除${row.tmName}嘛?`"
            width="250px"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @current-change="getHasTrademark"
      @size-change="sizeChange"
      pager-count="9"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      background="true"
      layout="prev, pager, next, jumper,->,total, sizes, "
      :total="total"
    />
    <!-- 修改添加弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkForm.id ? '修改品牌' : '添加品牌'"
      width="500"
    >
      <el-form
        ref="formRef"
        :model="trademarkForm"
        :rules="rules"
        style="width: 80%"
      >
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <!-- action:请求的URL,上传图片路径书写/api ,代理服务器不发送post请求 -->
          <!-- before-upload:上传图片前约束文件类型 -->
          <el-upload
            v-loading="loading"
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              style="height: 178px"
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="primary" size="small" plain @click="cancel"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="confirm"
          :disabled="loading ? true : false"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
let loading = ref(false)
//------------------------------------分页数据和逻辑
//总条数
let total = ref(20)
// 当前页编号
let pageNo = ref<number>(1)
// 每页显示的条数
let limit = ref<number>(3)
//存储已有品牌的数组
let trademarkList = ref<Records>([])
//整个表格的loading效果
let allLoading = ref(false)
//获取已有品牌的接口封装为一个函数：在任何情况下获取数据，都可以调用这个函数
const getHasTrademark = async () => {
  allLoading.value = true
  const res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
    allLoading.value = false
  }
}
//组件挂载完毕---发一次请求，获取第1页，一页3个品牌数据
onMounted(() => {
  getHasTrademark()
})
//下拉菜单发生变化时触发
const sizeChange = () => {
  console.log('下拉菜单发生变化')
  getHasTrademark()
}
//--------------------------对话框数据和逻辑
//对话框是否显示
let dialogVisible = ref<boolean>(false)
//收集品牌数据
let trademarkForm = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
//获取el-form 组件实例
let formRef = ref()
//品牌自定义校验规则
const validatorTmName = (rules: any, value: any, callback: any) => {
  console.log(rules, value, callback)
  //自定义校验
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称必须大于等于2个字符'))
  }
}
// 图片上传的校验规则
const validatorLogoUrl = (rules: any, value: any, callback: any) => {
  console.log(rules, value, callback)
  //如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌LOGO'))
  }
}
// 表单校验对象
const rules = {
  tmName: [{ required: true, validator: validatorTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
}
//添加品牌按钮的回调
const addTrademark = () => {
  //细节----id得处理掉
  trademarkForm.id = undefined
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  //清楚报错信息
  //1.第一种写法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  //2.第二种写法
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogVisible.value = true
}
//编辑品牌按钮的回调
const editTrademark = async (row: TradeMark) => {
  //清楚校验规则错误的提示信息
  // 使用 nextTick 函数确保在组件更新后执行回调
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  // 收集当前点击的行数据
  //1.用扩展运算符---不行！
  // trademarkForm = { ...row }?为什么不能用扩展运算符
  //2.直接修改，可以
  // trademarkForm.id = row.id
  // trademarkForm.tmName = row.tmName
  // trademarkForm.logoUrl = row.logoUrl
  //3.用Object.assign()----ES6新增的方法，用于对象的合并
  Object.assign(trademarkForm, row)
  dialogVisible.value = true
}
//对话框底部按钮逻辑
const cancel = () => {
  dialogVisible.value = false
}
const confirm = async () => {
  //发起请求之前做一个表单校验
  await formRef.value.validate()
  const res = await reqAddOrUpdateTrademark(trademarkForm)
  console.log(res)
  if (res.code === 200) {
    ElMessage.success(trademarkForm.id ? '修改品牌成功' : '添加品牌成功')
    if (!trademarkForm.id) {
      pageNo.value = Math.ceil((total.value + 1) / limit.value)
      console.log(pageNo.value, 'pageNo')
    }
    getHasTrademark()
  } else {
    ElMessage.error(trademarkForm.id ? '修改品牌失败' : '添加品牌失败')
  }
  dialogVisible.value = false
}
//上传文件组件函数钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)
  loading.value = true
  if (
    rawFile.type == 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传文件大小不能超过4MB')
      loading.value = false
      return false
    }
  } else {
    ElMessage.error('上传文件格式务必PNG|JPG|GIF')
    loading.value = false
    return false
  }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response:即为当前这次上传图片post请求服务器返回的数据
  console.log(response, 'res')
  console.log(uploadFile, 'fil')
  trademarkForm.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
  loading.value = false
  if (response.code === 200) {
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}
//------------------------------删除逻辑
const removeTrademark = async (id: number) => {
  const res = await reqDeleteTrademark(id)
  if (res.code == 200) {
    ElMessage.success('删除品牌成功')
    getHasTrademark()
  } else {
    ElMessage.error('删除品牌失败')
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.el-card {
  border: none;
}
</style>
