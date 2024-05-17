<template>
  <Uploader
    action="/mock/api/upload"
    :class="['upload-box', textAlign]"
    :show-list="false"
    list-type="picture"
    :before-upload="commonUploadCheck"
    :upload-success="onSuccess"
  >
    <a-button type="primary" class="btn-upload">
      上传图片
    </a-button>
    <template #loading>
      <a-button type="primary" class="btn-upload">
        上传中
      </a-button>
    </template>
    <template #uploaded>
      <a-button type="primary" class="btn-upload">
        重新上传
      </a-button>
    </template>
    <!-- <template #uploaded="{ uploadedData }">
      <img v-if="uploadedData.url" :src="uploadedData.url" class="previmg" />
      <a-button v-else type="primary" class="btn-upload">
        <FileImageOutlined />
        重新上传
      </a-button>
    </template> -->
  </Uploader>
</template>

<script setup lang="ts">
import Uploader from './Uploader.vue'
import { commonUploadCheck } from '@/utils/helper'
import { PropType } from 'vue';


defineProps({
  textAlign: {
    type: String,
    default: 'left'
  },
  onSuccess: {
    type: Function as PropType<(resp: any) => void>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.upload-box {
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  &.center {
    text-align: center;
  }
}
.previmg {
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
</style>