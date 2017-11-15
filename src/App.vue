<template>
  <div id="app">
    <x-header slot="header"
              style="width:100%;position:fixed;left:0;top:0;z-index:100;"
              :title="title"
              v-if="!isLogin">
    </x-header>

    <view-box body-padding-top="46px">
    <router-view></router-view>
    </view-box>

    <tabbar style="position: fixed" v-if="!isLogin">
      <tabbar-item :link="{path:'/index'}" :selected="$route.path === '/index'">
        <mu-icon slot="icon" value="home" />
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/add_candidate'}" :selected="$route.path === '/add_candidate'">
        <mu-icon slot="icon" value="camera_alt"/>
        <span slot="label">新增</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/reception_list'}" :selected="$route.path === '/reception_list'">
        <mu-icon slot="icon" value="cloud_download"/>
        <span slot="label">下载</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Group, Cell, XButton, Tabbar, TabbarItem, XHeader, ViewBox } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XButton,
    Tabbar,
    TabbarItem,
    XHeader,
    ViewBox
  },
  computed: {
    title () {
      if (this.$route.path === '/index') return '首页'
      if (this.$route.path === '/add_candidate') return '新增'
      if (this.$route.path === '/reception_list') return '接待列表'
    },
    isLogin () {
      if (this.$route.path === '/login') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
