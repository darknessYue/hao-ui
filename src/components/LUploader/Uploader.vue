<template>
  <div class="file-uploader" >
    <div class="uploader-area"
      v-on="events"
      :class="{'is-dragover': drag && isDragOver}"
    >
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul class="file-list" v-if="showList">
      <li v-for="(item, index) in filesList" :key="index" :class="uploadStatusClass(item.status)">
        <div class="loading" v-if="item.status === 'uploading'" style="margin-right: 10px;">...</div>
        <img v-if="item.url && listType === 'picture'" width="100px" :src="item.url" />
        <span> {{ item.name }}</span>
        <div class="file-btn-delete" @click="handleDeleteFile(item.id)" >x</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { PropType, computed, defineComponent, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'
type FileListType = 'picture' | 'text'
type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
type CheckUpload = (file: File) => boolean | Promise<File|string>
interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: UploadStatus;
  raw: File;
  resp?: any;
  url?: string
}

export default defineComponent({
  name: 'LUploader',
  props: {
    action: {
      type: String,
      required: true
    },
    showList: {
      type: Boolean,
      default: true
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>,
      default: () => true,
    },
    uploadSuccess: {
      type: Function as PropType<(resp: UploadResp[]) => void>,
      default: () => {}
    },
    drag: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String as PropType<FileListType>,
      default: 'text'
    }
  }, 
  computed: {
    uploadStatusClass() {
      return (status: UploadStatus) => {
        return status === 'uploading' ? 'uploading' : `upload-${status}`
      }
    }
  },
  setup (props) {
    // console.log(getCurrentInstance()?.proxy?.$parent)
    const fileInput = ref<null|HTMLInputElement>(null)
    const filesList = ref<UploadFile[]>([])
    const isDragOver = ref(false)
    const isUploading = computed<boolean>(() => {
      return filesList.value.some(item => item.status === 'uploading')
    })
    const lastFileData = computed(() => {
      const lastFile = last(filesList.value)
      if(lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })
    const triggerUploader = () => {
      fileInput.value?.click()
    }

    const triggerUploadSuccess = () => {
      if(props.uploadSuccess) {
        if(!filesList.value.some(item => item.status !== 'success')) {
          props.uploadSuccess(filesList.value.map(item => item.resp))
        }
      }
    }

    const postFile = (readyFile: UploadFile) => {
      const formData = new FormData()
      formData.append(readyFile.name, readyFile.raw)
      readyFile.status = 'uploading'
      axios.post(props.action + `?url=${readyFile.url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async res => {
        // setTimeout(() => {
        //   fileObj.status = 'success'
        // }, 2000)
        readyFile.status = 'success'
        readyFile.resp = res.data
      }).catch(err => {
        console.log(err)
        readyFile.status = 'error'
      }).finally(() => {
        triggerUploadSuccess()
        if(fileInput.value) {
          fileInput.value.value = ''
        }
      })
    }

    const uploadFiles = () => {
      filesList.value.filter(item => item.status === 'ready').forEach(readFile => {
        postFile(readFile)
      })
    }

    const addFileToList = (file: File) => {
      const fileObj = reactive<UploadFile>({
        id: uuidv4(),
        name: file.name,
        status: 'ready',
        size: file.size,
        raw: file
      })
      if(props.listType === 'picture') {
        try {
          fileObj.url = URL.createObjectURL(file)
        } catch (error) {
          console.log(error)
        }
        // const fileReader = new FileReader()
        // fileReader.readAsDataURL(file)
        // fileReader.addEventListener('load', () => {
        //   fileObj.url = fileReader.result as string
        // })
      }
      filesList.value.push(fileObj)
      if(props.autoUpload) {
        postFile(fileObj)
      }
    }

    const beforeUploadCheck = (files: FileList|null) => {
      if(files) {
        const uploadFile = files[0]
        if(props.beforeUpload) {
          const result = props.beforeUpload(uploadFile)
          if(result && result instanceof Promise) {
            result.then(processFile => {
              if(processFile instanceof File) {
                addFileToList(processFile)
              } else {
                throw new Error('beforeUpload return value must be File or Promise<File>')
              }
            }).catch(err => {
              console.log(err)
            })
          } else if( result === true ) {
            addFileToList(uploadFile)
          }
        } else {
          addFileToList(uploadFile)
        }
      }
    }

    const handleFileChange = async (e: Event) => {
      const targget = e.target as HTMLInputElement
      beforeUploadCheck(targget.files)
    }

    let events: {[key: string]: (e:any) => void} = {
      'click': triggerUploader
    }
    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault()
      isDragOver.value = over
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      isDragOver.value = false
      if(e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files)
      }
    }

    const handleDeleteFile = (id: string) => {
      filesList.value = filesList.value.filter(item => item.id !== id)
    }

    if(props.drag) {
      events = {
        ...events,
        'dragleave': (e: DragEvent) => handleDrag(e, false),
        'dragover': (e: DragEvent) => handleDrag(e, true),
        'drop': handleDrop
      }
    }

    return {
      events,
      filesList,
      fileInput,
      isDragOver,
      handleDrag,
      handleDrop,
      uploadFiles,
      isUploading,
      lastFileData,
      triggerUploader,
      handleFileChange,
      handleDeleteFile
    }
  }
})
</script>

<style scoped>
button {
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}
button:disabled {
  color: #ccc;
  background-color: #eee;
  border-color: #ccc;
  cursor: default
}
.file-list {
  padding: 20px;
}

.file-list li {
  padding-left: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  border-left: 2px solid transparent;
  line-height: 30px;
  display: flex;
  align-items: center;
  
}


.file-list li.upload-success {
  border-color: #03f303;
}

.file-list li.upload-ready {
  border-color: blue;
}

.file-list li.upload-error {
  border-color: red
}

.file-list li.uploading {
  border-color: orange;
}

.file-list li .file-btn-delete {
  margin-left: 10px;
  font-size: 18px;
}
</style>