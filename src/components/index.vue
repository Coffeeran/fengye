<template>
  <mu-raised-button label="注销" class="demo-raised-button" fullWidth primary  @click="logout"/>
</template>

<script>

  export default {
    data () {
      return {
      }
    },
    methods: {
      logout () {
        this.$http.post('/api/user/logout.do').then((res) => {
          this.$router.push({name: 'login'})
        })
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
