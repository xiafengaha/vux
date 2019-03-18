# vux

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).<br/>
vux的loading事件，目前暂未有好的解决方法，所以引用了element的loading事件解决axios请求时候的等待<br/>
新加入防止按钮重复点击指令以及限制输入正数且保留两位小数限制指令
加入权限控制指令用法（v-has='"权限"' /v-has='item.role'）一种是知道死的权限，一种是动态的权限


# 新增移动端上传组件

  >（因vux没有上传组件，而且vux-uploader只支持图片上传，所以自己写了个可上传所有文件的组件,目前组件中只写了视频和图片，其他的可以自己加文件类型）

# 父组件使用方法

  > <my-upload ref="uploadImg" :upload-data="uploadImgData" @uploadSuccessUrl="getImgUrl"></my-upload>

# uploadImgData格式
```
  uploadImgData: {
        imgShow: false,
        showList: false, // 文件列表是否显示
        uploadUrl: '', // active
        autoUpload: false, // 是否自动上传
        limit: 1, // 上传限制的数量
        listShow: true, // 自定义图片列表是否显示
        accept: 'image/jpeg,image/gif,image/png', // 文件上传格式
        multiple: false, // 是否多选
        listType: 'text', // 列表展示格式
        type: 2 ,// 2是图片，1是视频，3是音频
        name: '上传图片'
      },



