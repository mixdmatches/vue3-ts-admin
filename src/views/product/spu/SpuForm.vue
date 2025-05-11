<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId" style="width: 150px">
        <el-option
          :label="item.tmName"
          v-for="item in allTradeMark"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          style="width: 100%; height: 100%"
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
        style="width: 150px"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        :disabled="saleAttrIdAndValueName ? false : true"
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
        >添加属性</el-button
      >
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #default="{ row }">
            <el-tag
              @close="row.spuSaleAttrValueList.splice($index, 1)"
              style="margin: 0 5px"
              v-for="(item, $index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag ? true : false"
              style="width: 100px"
              placeholder="请你输入属性值"
              size="small"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              style="margin-left: 10px"
              type="primary"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ $index }">
            <el-button
              @click="saleAttr.splice($index, 1)"
              type="danger"
              size="small"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        @click="save"
        >保存</el-button
      >
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/types/spu'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { TradeMark } from '@/types/trademark'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])
//点击取消按钮：通知父组件切换场景为1，展示SPU的数据
const cancel = () => {
  $emit('changeScene', 0)
}
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片的地址1
let dialogImageUrl = ref<string>('')

//存储已有的SPU数据
let allTradeMark = ref<TradeMark[]>([])
//商品图片列表
let imgList = ref<SpuImg[]>([])
//已有的SPU的销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])

//存储已有的SPU对象
let spuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的Id
  spuName: '', //spu的名字
  description: '', //spu的描述
  tmId: '', //品牌ID
  spuImageList: [],
  spuSaleAttrList: [],
})

//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')

//子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，将来在模板中展示
  spuParams.value = spu
  //spu即为父组件传递过来的已有的spu对象【不完整
  //先获取全部品牌的数据
  let res: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下全部售卖商品的图片
  let res1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的spu销售属性的数据
  let res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  let res3: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储全部品牌的数据
  allTradeMark.value = res.data
  //SPU对应商品图片
  imgList.value = res1.data
  //存储已有的SPU的销售属性
  saleAttr.value = res2.data
  //存储全部的销售属性
  allSaleAttr.value = res3.data
  //SPu对应商品图片
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}

//照片墙点击预览按钮的触发钩子
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  //对话框弹出来
  dialogVisible.value = true
}

//照片墙删除时的触发钩子
const handleRemove = () => {}

//照片墙上传之前的钩子约束文件大小与类型
const handlerUpload = (file) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage.error('文件过大，请上传小于3M的文件')
      return false
    }
  } else {
    ElMessage.error('上传图片务必PNG|JPG|GIF')
  }
}

//计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  //全部销售属性：颜色、版本、尺码
  //已有的销售属性：颜色、版本
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

//添加销售属性的方法
const addSaleAttr = () => {
  /*
  baseSaleAttrId:number
  saleAttrName:string
  spuSaleAttrValueList:SpuSaleAttrValue[]
  */
  /*
  saleAttrIdAndValueName: '1:颜色'
  */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  //准备一个新的销售属性对象：将来带给服务器即可
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  //追加到数组当中
  saleAttr.value.push(newSaleAttr)
  //清空
  saleAttrIdAndValueName.value = ''
}

//添加属性值按钮
const toEdit = (row: SaleAttr) => {
  // 点击按钮：input显示
  row.flag = true
  //input收集的值
  row.saleAttrValue = ''
}

//表单元素失去焦点的事件的回调
const toLook = (row: SaleAttr) => {
  //整理收集属性ID和属性值得名字
  const { baseSaleAttrId, saleAttrValue } = row
  //整理成服务器需要的属性值形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  //非法情况判断
  if (saleAttrValue?.trim() === '') {
    ElMessage.error('请输入属性值')
    return
  }
  //判断属性值在数组中是否存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage.error('属性值已存在')
    return
  }

  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)

  //切换为查看模式
  row.flag = false
}

// 保存
const save = async () => {
  //整理数据
  //1：照片墙的数据
  spuParams.value.spuImageList = imgList.value.map((item) => {
    return {
      imgName: item.name, //图片名字
      imgUrl: item.url,
    }
  })
  //2.整理销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value

  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
    //通知父组件切换场景
    $emit('changeScene', 0)
  } else {
    ElMessage.error(spuParams.value.id ? '更新失败' : '添加失败')
  }
}
//添加一个新的SPU初始化
const initAddSpu = async (c3Id: number | string) => {
  // 清空
  Object.assign(spuParams.value, {
    category3Id: '', //收集三级分类的Id
    spuName: '', //spu的名字
    description: '', //spu的描述
    tmId: '', //品牌ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  //清空照片墙
  imgList.value = []
  //清空已有的销售属性
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  //存储三级分类Id
  spuParams.value.category3Id = c3Id as number
  //先获取全部品牌的数据
  let res: AllTradeMark = await reqAllTradeMark()
  let res1: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储全部品牌的数据
  allTradeMark.value = res.data
  //存储全部的销售属性
  allSaleAttr.value = res1.data
  //清空
}
defineExpose({ initHasSpuData, initAddSpu })
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
