<template>
  <div style="height:100%;">
    <x-header slot="header"
              style="width:100%;position:fixed;left:0;top:0;z-index:100;"
              :title="title">
    </x-header>


    <view-box body-padding-top="46px">
      <router-view class="router-view"></router-view>
    </view-box>

    <tabbar style="position: fixed">
      <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
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
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    },
    computed: {
      title () {
        if (this.$route.path === '/') return '首页'
        if (this.$route.path === '/add_candidate') return '新增'
        if (this.$route.path === '/reception_list') return '接待列表'
      }
    }
  }
</script>

<style>
  .router-view {
    width: 100%;
    top: 46px;
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>
