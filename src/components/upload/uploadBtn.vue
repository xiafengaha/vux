<template>
  <div class="upload-box">
    <input type="file" :limit="uploadData.limit" :multiple="uploadData.multiple" id="uploadFile" @change="uploadVideo($event)">
    <div class="upload-icon">
      <img :src="imgUtils.imgPrefix + '/upload.png' + imgUtils.imgSuffix" width="26"/>
      <span>{{ uploadData.name }}</span>
    </div>
    <video v-if="uploadData.videoShow" :src="imgPrefix + uploadSuccessFilesList[0]" width="100%" controls></video>
    <img class="upload-img-btn" v-if="uploadData.imgShow" :src=" imgPrefix+ uploadSuccessFilesList[0]" alt="">
  </div>
  <!--'.mp4, .ogg, .webm':'image/jpeg,image/gif,image/png'-->
</template>
<script>
// import { submitUpload } from '@/api/common'
import './style/upload.css'
import Cookies from 'js-cookie'
export default {
  name: 'UploadBtn',
  components: {
    // draggable
  },
  props: {
    uploadData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fileList: [],
      uploadSuccessFilesList: [], // 上传成功的文件列表
      showImg: false, // 大图显示隐藏
      imgSrc: '', // 需要放大的图片路径
      imgPrefix: '', // 文件前缀
      videoDuration: null,
      audioDuration: null
    }
  },
  created() {
    // console.log(this.uploadSuccessFilesList)
    this.initImgPrefix() // 获取图片前缀
    // this.getTime()
  },
  methods: {
    uploadVideo(e) { //  用户选择的文件
      // console.log(e, 'e')
      let filePath = e.target.value, fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
      console.log(fileFormat, fileFormat)
      // alert(fileFormat)
      if (this.uploadData.type === 1) {
        if (!fileFormat.match(/.mp4|.ogg|.webm/)) {
          this.$vux.toast.text('文件格式必须为mp4/ogg/webm')
          return false
        }
      }
      if (this.uploadData.type === 2) {
        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
          this.$vux.toast.text('文件格式必须为png/jpg/jpeg')
          return false
        }
      }
      this.handleChange(e.target.files[0])
    },
    initImgPrefix() { // 获取图片前缀
      // this.imgPrefix = this.$store.state.user.imgUrl
      // console.log(this.$store, this.imgPrefix)
      this.imgPrefix = JSON.parse(Cookies.get('userInfo')).OSS_CDN_DOMAIN

    },
    viewImg() {
      this.showImg = false
    },
    clickImg(src) {
      // console.log(e,'e')
      const that = this
      this.showImg = true
      that.imgSrc = src
    },
    handleChange(file) {
      // console.log(file, 'file')
      const isLt50M = file.size / 1024 / 1024 < 50
      const isLt5M = file.size / 1024 / 1024 < 5
      if (this.uploadData === 2) { // 2是图片 1是视频，3是音频
        if (!isLt5M) {
          this.$vux.toast.text('上传图片大小不能超过 5M')
        } else {
          this.submitUploadFiles(file)
        }
      } else {
        if (!isLt50M) {
          this.$vux.toast.text('上传音视频大小不能超过 50M')
        } else {
          this.submitUploadFiles(file)
        }
      }
      // fileList.forEach()
    },
    submitUploadFiles(f) { // 文件上传
      // console.log(f, 'ffff')
      const formData = new FormData()
      formData.append('files[]', f)
      formData.append('type', this.uploadData.type)
      //-------------------------------------------这里是上传的api-------------------------------
    //   submitUpload(formData).then(res => {
    //     this.$vux.toast.text('上传成功')
    
    //     this.uploadSuccessFilesList = JSON.parse(JSON.stringify([res.data[0].url]))
    //     this.$emit('uploadSuccessUrl', res.data, this.uploadSuccessFilesList)
    //   })
    },
    handleRemove(file, fileList) {
      // 文件移除
    },
    changeExceed(files, fileList) {
      // 文件多了的处理函数
      // console.log('123123')
    },
    clickImgDelete(index) { // 删除图片
      this.uploadSuccessFilesList.splice(index, 1)
      this.$emit('delImg', this.uploadSuccessFilesList, index)
    },
    getTime(type) { // 获取时长
      let duration // 时长
      if (type === 1) { // 视频
        duration = document.getElementById('videoPlayer').duration
      } else if (type === 2) { // 音频
        duration = document.getElementById('audioPlayer').duration
      }

      // let videoDuration = document.getElementById('videoPlayer').duration
      // let hour = parseInt(videoDuration / 3600) // 时
      let minute = parseInt(duration / 60) // 分
      let second = Math.ceil(duration % 60)
      if (second < 10) {
        second = '0' + second
      } else if (second === 60) {
        second = '00'
        minute += 1
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      let str = minute + ':' + second
      return str
    },
    changeImg(index) {

      this.$emit('clickImg', index)
    },
    draggableUpdate(data, index) {
      // console.log(data, 'dragg', index)
      this.$emit('draggableUpdate', data)
    },
    draggableStart(data) {
      this.$emit('draggableStart', data)
    }
  }
}
</script>
<style scoped>

</style>
