<template>
  <el-card shadow="naver">
    <el-table border :data="skuList" style="margin: 10px 0">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="SKU名称"
        prop="skuName"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        show-overflow-tooltip
        type="index"
        align="center"
        width="150px"
      ></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row }">
          <img style="height: 50px" :src="row.skuDefaultImg" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        prop="weight"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        width="150px"
      ></el-table-column>
      <el-table-column label="操作" width="350px" fixed="right">
        <template #="{ row }">
          <el-button
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            title="确定删除？"
            width="150px"
            @confirm="deleteSku(row.id)"
          >
            <template #reference>
              <el-button type="warning" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      @current-change="getHasSku"
      @size-change="handler"
      :page-sizes="[10, 20, 30, 40]"
      layout="prev, pager, next, ->, total,sizes,jumper"
      :total="50"
    />
    <!-- 抽屉组件展示数据详情 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 4px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 4px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  style="width: 100%; height: 100%"
                  :src="item.imgUrl"
                  alt=""
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import {
  reqSkuList,
  reqSaleSku,
  reqCanselSku,
  reqSkuInfo,
  reqDeleteSku,
} from "@/api/product/sku/index";
import { ref, onMounted } from "vue";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "@/api/product/sku/type";
// 分页器当前页码
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref(0);
let skuList = ref<SkuData[]>([]);
// 控制抽屉显示与隐藏
let drawer = ref(false);
//pager 分页器的变化
const getHasSku = async (pager = 1) => {
  pageNo.value = pager;
  const res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  skuList.value = res.data.records;
  total.value = res.data.total;
};
const handler = () => {
  // 不用收集数据，v-model已经收集到了，直接发送请求就好了
  getHasSku();
};
// 下架上架
const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCanselSku(row.id as number);
    ElMessage.success("下架成功");
    getHasSku(pageNo.value);
  } else {
    await reqSaleSku(row.id as number);
    ElMessage.success("上架成功");
    getHasSku(pageNo.value);
  }
};

const skuInfo = ref<SkuData>({});
// 点击查看详情
const findSku = async (row: SkuData) => {
  drawer.value = true;
  const res: SkuInfoData = await reqSkuInfo(row.id as number);
  console.log(res, "info");
  skuInfo.value = res.data;
};
// 删除
const deleteSku = async (skuId: number) => {
  const res = await reqDeleteSku(skuId);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getHasSku();
  } else {
    ElMessage.error("系统数据无法删除");
  }
};
onMounted(() => {
  getHasSku();
});
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
